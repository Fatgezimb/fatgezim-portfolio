#!/usr/bin/env python3
"""Generate an editable DOCX and searchable PDF from the site's resumeDocument.

Run with the Python runtime returned by load_workspace_dependencies. Uses the
same bundled Node runtime to export the shared TypeScript source without adding
packages. This script does not enable or publish website downloads.
"""
from __future__ import annotations

import argparse
import html
import json
import os
from pathlib import Path
import subprocess

from docx import Document
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_BREAK
from docx.opc.constants import RELATIONSHIP_TYPE as RT
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import reportlab
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
RUNTIME = Path(os.environ.get('CODEX_PRIMARY_DEPENDENCIES', str(Path.home() / '.cache/codex-runtimes/codex-primary-runtime/dependencies')))
NODE = RUNTIME / 'node/bin/node'
STEM = 'Fatgezim_Zim_Bela_Technology_Resume'
IRIS = '5836BB'
INK = '252137'
MUTED = '625D70'


def clean(value):
    return str(value).replace('\u2013', '-').replace('\u2014', '-').replace('\u2011', '-')


def contact_label(item):
    href = item['href']
    if href.startswith('mailto:'):
        return item['label']
    if 'linkedin.com' in href:
        return 'LinkedIn'
    if 'github.com' in href:
        return 'GitHub'
    return 'Portfolio'


def build_blocks(data):
    """A shared semantic layout consumed by both renderers."""
    blocks = [('title', data['identity']['name']), ('subtitle', data['identity']['headline']),
              ('contact', data['contact']), ('summary', data['identity']['summary']),
              ('section', 'Technical capabilities')]
    for group in data['skills']:
        if group['id'] in ['software-product', 'data-engineering']:
            blocks.append(('skill', (group['title'], ', '.join(group['skills']))))
    # Names, technologies, and credit are taken from the shared project records.
    stack_terms = []
    for project in data['projects']:
        for term in project['stack'].split(', '):
            if term in ['Express', 'Firebase Auth', 'Firestore', 'Zod', 'PDFKit', 'docx', 'Vitest', 'Stan', 'PyTorch', 'Pynapple', 'NeMoS', 'Plotly'] and term not in stack_terms:
                stack_terms.append(term)
    blocks.append(('skill', ('Project technologies', ', '.join(stack_terms))))
    blocks.append(('section', 'Experience'))
    for role in data['experience']:
        blocks.append(('role', role))
    blocks.extend([('page', None), ('continuation', data['identity']['name']),
                   ('section', 'Selected engineering projects')])
    for project in data['projects']:
        blocks.append(('project', project))
    blocks.append(('section', 'Education and credentials'))
    for edu in data['education']:
        blocks.append(('education', edu))
    # M.Ed. appears with its full degree above; certification and state licenses follow.
    blocks.append(('body', ' | '.join(c for c in data['credentials'] if c != 'M.Ed.')))
    if data['research']:
        blocks.append(('section', 'Research'))
        for research in data['research']:
            blocks.append(('research', research))
    return blocks


def add_hyperlink(paragraph, label, url):
    rel_id = paragraph.part.relate_to(url, RT.HYPERLINK, is_external=True)
    link = OxmlElement('w:hyperlink')
    link.set(qn('r:id'), rel_id)
    run = OxmlElement('w:r')
    props = OxmlElement('w:rPr')
    color = OxmlElement('w:color'); color.set(qn('w:val'), IRIS); props.append(color)
    size = OxmlElement('w:sz'); size.set(qn('w:val'), '20'); props.append(size)
    run.append(props)
    text = OxmlElement('w:t'); text.text = clean(label); run.append(text)
    link.append(run); paragraph._p.append(link)


def generate_docx(blocks, destination):
    doc = Document()
    section = doc.sections[0]
    section.page_width = Inches(8.5); section.page_height = Inches(11)
    section.top_margin = Inches(.49); section.bottom_margin = Inches(.49)
    section.left_margin = Inches(.6); section.right_margin = Inches(.6)
    normal = doc.styles['Normal']
    normal.font.name = 'Arial'; normal.font.size = Pt(10)
    normal.font.color.rgb = RGBColor.from_string(INK)
    normal.paragraph_format.line_spacing = 1.08
    normal.paragraph_format.space_after = Pt(3)
    for name in ['Title', 'Subtitle', 'Heading 1', 'Heading 2']:
        doc.styles[name].font.name = 'Arial'
    title = doc.styles['Title']; title.font.size = Pt(26); title.font.bold = True
    title.font.color.rgb = RGBColor(0, 0, 0)
    title.paragraph_format.space_after = Pt(3)
    # python-docx's default template carries a blue Title border; clear it.
    for border in list(title.element.xpath('./w:pPr/w:pBdr')):
        border.getparent().remove(border)
    sub = doc.styles['Subtitle']; sub.font.size = Pt(11); sub.font.bold = True
    sub.font.italic = False
    sub.font.color.rgb = RGBColor(0, 0, 0); sub.paragraph_format.space_after = Pt(6)
    for name, size in [('Heading 1', 11), ('Heading 2', 10.5)]:
        style = doc.styles[name]; style.font.size = Pt(size); style.font.bold = True
        style.font.color.rgb = RGBColor(0, 0, 0)
        style.paragraph_format.space_before = Pt(8 if name == 'Heading 1' else 4)
        style.paragraph_format.space_after = Pt(3)
        style.paragraph_format.keep_with_next = True
    doc.core_properties.title = 'Fatgezim Zim Bela Technology Resume'
    doc.core_properties.subject = 'Software engineering data systems and technology leadership'
    doc.core_properties.author = 'Fatgezim Bela'
    doc.core_properties.keywords = 'Software engineering, data science, technology leadership'
    footer = section.footer.paragraphs[0]
    footer.paragraph_format.space_before = Pt(0)
    footer.paragraph_format.space_after = Pt(0)
    footer_run = footer.add_run('Fatgezim Zim Bela  |  Technology Resume')
    footer_run.font.name = 'Arial'; footer_run.font.size = Pt(9)
    footer_run.font.color.rgb = RGBColor.from_string(MUTED)

    def paragraph(text='', style=None, after=None, bold_lead=None):
        p = doc.add_paragraph(style=style)
        if bold_lead:
            p.add_run(clean(bold_lead)).bold = True
        p.add_run(clean(text))
        if after is not None: p.paragraph_format.space_after = Pt(after)
        return p

    for kind, value in blocks:
        if kind in ['title', 'subtitle']:
            paragraph(value, 'Title' if kind == 'title' else 'Subtitle')
        elif kind == 'contact':
            p = doc.add_paragraph()
            p.paragraph_format.space_after = Pt(7)
            for i, item in enumerate(value):
                if i: p.add_run('   |   ')
                add_hyperlink(p, contact_label(item), item['href'])
        elif kind == 'summary': paragraph(value, after=5)
        elif kind == 'section': paragraph(value, 'Heading 1')
        elif kind == 'skill': paragraph(value[1], after=3, bold_lead=value[0] + '  ')
        elif kind == 'role':
            paragraph(value['title'] + (f" | {value['organization']}" if value.get('organization') else ''), 'Heading 2')
            if value.get('dates'):
                p = paragraph(value['dates'], after=2); p.runs[0].italic = True
            paragraph(value['summary'], after=2)
            for bullet in value['highlights']:
                p = paragraph('• ' + bullet, after=1)
                p.paragraph_format.left_indent = Inches(.1)
                p.paragraph_format.first_line_indent = Inches(-.1)
        elif kind == 'page':
            p = doc.add_paragraph(); p.paragraph_format.space_after = Pt(0)
            p.add_run().add_break(WD_BREAK.PAGE)
        elif kind == 'continuation':
            p = paragraph(value, after=2); p.runs[0].bold = True
            p.runs[0].font.color.rgb = RGBColor(0, 0, 0)
        elif kind == 'project':
            p = paragraph(value['name'], 'Heading 2')
            if value['links']:
                p.add_run('   ')
                for i, item in enumerate(value['links']):
                    if i: p.add_run(' | ')
                    add_hyperlink(p, item['label'], item['href'])
            paragraph(value['role'] + ' | ' + value['status'], after=1)
            paragraph(value['summary'], after=1)
            p = paragraph('Stack  ' + value['stack'], after=3)
            for r in p.runs: r.font.color.rgb = RGBColor.from_string(MUTED)
        elif kind == 'education':
            paragraph(f"{value['credential']} | {value['institution']} | {value['date']}", after=2)
        elif kind == 'research':
            paragraph(value['title'] + ' | ' + value['institution'], after=1)
            paragraph('Methods  ' + ', '.join(value['methods']), after=2)
        elif kind == 'body': paragraph(value, after=3)
    doc.save(destination)


def generate_pdf(blocks, destination):
    font_dir = Path('/System/Library/Fonts/Supplemental')
    regular, bold = font_dir/'Arial.ttf', font_dir/'Arial Bold.ttf'
    if not regular.exists() or not bold.exists():
        font_dir = Path(reportlab.__file__).parent/'fonts'
        regular, bold = font_dir/'Vera.ttf', font_dir/'VeraBd.ttf'
    pdfmetrics.registerFont(TTFont('ResumeSans', str(regular)))
    pdfmetrics.registerFont(TTFont('ResumeSans-Bold', str(bold)))
    pdfmetrics.registerFontFamily('ResumeSans', normal='ResumeSans', bold='ResumeSans-Bold', italic='ResumeSans', boldItalic='ResumeSans-Bold')
    styles = {
        'title': ParagraphStyle('title', fontName='Helvetica-Bold', fontSize=26, leading=30, spaceAfter=4, textColor=colors.HexColor('#'+INK)),
        'subtitle': ParagraphStyle('subtitle', fontName='Helvetica-Bold', fontSize=11, leading=14, spaceAfter=6, textColor=colors.HexColor('#'+IRIS)),
        'body': ParagraphStyle('body', fontName='Helvetica', fontSize=10, leading=11.6, spaceAfter=3, textColor=colors.HexColor('#'+INK)),
        'section': ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=11, leading=13, spaceBefore=9, spaceAfter=4, textColor=colors.HexColor('#'+IRIS), keepWithNext=True),
        'heading': ParagraphStyle('heading', fontName='Helvetica-Bold', fontSize=10.5, leading=12, spaceBefore=4, spaceAfter=3, textColor=colors.HexColor('#'+INK), keepWithNext=True),
        'meta': ParagraphStyle('meta', fontName='Helvetica', fontSize=10, leading=11.3, spaceAfter=2, textColor=colors.HexColor('#'+MUTED)),
        'bullet': ParagraphStyle('bullet', fontName='Helvetica', fontSize=10, leading=11.4, spaceAfter=1, leftIndent=8, firstLineIndent=-8),
    }
    for style in styles.values():
        style.fontName = 'ResumeSans-Bold' if style.fontName.endswith('Bold') else 'ResumeSans'
    esc = lambda s: html.escape(clean(s))
    def para(s, style='body'): return Paragraph(s, styles[style])
    def link(label, href): return f'<a color="#{IRIS}" href="{esc(href)}">{esc(label)}</a>'
    flow = []
    for kind, value in blocks:
        if kind in ['title', 'subtitle', 'section']: flow.append(para(esc(value), kind))
        elif kind == 'contact':
            flow.extend([para(' &nbsp; | &nbsp; '.join(link(contact_label(item), item['href']) for item in value)), Spacer(1,4)])
        elif kind == 'summary': flow.extend([para(esc(value)), Spacer(1,2)])
        elif kind == 'skill': flow.append(para('<b>'+esc(value[0])+'</b> &nbsp; '+esc(value[1])))
        elif kind == 'role':
            group=[para(esc(value['title'] + (f" | {value['organization']}" if value.get('organization') else '')), 'heading')]
            if value.get('dates'): group.append(para(esc(value['dates']), 'meta'))
            group.append(para(esc(value['summary'])))
            group.extend(para('• '+esc(text), 'bullet') for text in value['highlights'])
            flow.append(KeepTogether(group))
        elif kind == 'page': flow.append(PageBreak())
        elif kind == 'continuation': flow.append(para('<b>'+esc(value)+'</b>'))
        elif kind == 'project':
            name = esc(value['name'])
            if value['links']: name += ' &nbsp; ' + ' | '.join(link(x['label'], x['href']) for x in value['links'])
            flow.append(KeepTogether([para(name,'heading'), para(esc(value['role']+' | '+value['status']), 'meta'),
                                      para(esc(value['summary'])), para('Stack &nbsp; '+esc(value['stack']), 'meta')]))
        elif kind == 'education': flow.append(para(esc(f"{value['credential']} | {value['institution']} | {value['date']}")))
        elif kind == 'body': flow.append(para(esc(value)))
        elif kind == 'research':
            flow.append(KeepTogether([para(esc(value['title']+' | '+value['institution'])),
                                      para('Methods &nbsp; '+esc(', '.join(value['methods'])), 'meta')]))
    doc=SimpleDocTemplate(str(destination), pagesize=letter, leftMargin=43.2, rightMargin=43.2,
                          topMargin=34, bottomMargin=31, title='Fatgezim Zim Bela Technology Resume',
                          author='Fatgezim Bela', pageCompression=1)
    def page_number(canvas, document):
        canvas.saveState(); canvas.setFont('ResumeSans',9); canvas.setFillColor(colors.HexColor('#'+MUTED))
        canvas.drawString(43.2,19,'Fatgezim Zim Bela  |  Technology Resume')
        canvas.drawRightString(568.8,19,f'{document.page}'); canvas.restoreState()
    doc.build(flow, onFirstPage=page_number, onLaterPages=page_number)


def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--output-dir', type=Path, default=ROOT/'work/master/resume-review')
    parser.add_argument('--work-dir', type=Path, default=ROOT/'work/master/resume-qa')
    args=parser.parse_args()
    if args.output_dir.resolve() in {(ROOT/'resume').resolve(), (ROOT/'public/resume').resolve()}:
        parser.error('Generate review artifacts separately; publication requires a reviewed file copy.')
    args.output_dir.mkdir(parents=True,exist_ok=True); args.work_dir.mkdir(parents=True,exist_ok=True)
    data_path=args.work_dir/'resume-data.json'
    subprocess.run([str(NODE), str(ROOT/'scripts/export-resume-data.mjs'), str(data_path)],check=True)
    data=json.loads(data_path.read_text()); blocks=build_blocks(data)
    docx_path=args.output_dir/(STEM+'.docx'); pdf_path=args.output_dir/(STEM+'.pdf')
    generate_docx(blocks,docx_path); generate_pdf(blocks,pdf_path)
    reader=PdfReader(pdf_path)
    validation={'pdf_pages':len(reader.pages),'pdf_characters':sum(len(p.extract_text() or '') for p in reader.pages),
                'pdf_links':[str(a.get_object().get('/A',{}).get('/URI')) for p in reader.pages for a in p.get('/Annots',[]) if a.get_object().get('/A',{}).get('/URI')],
                'data_source':'app/content/resume-document.ts','body_font_points':10}
    (args.work_dir/'artifact-validation.json').write_text(json.dumps(validation,indent=2)+'\n')
    print(json.dumps(validation,indent=2))


if __name__=='__main__': main()
