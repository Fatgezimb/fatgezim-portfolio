#!/usr/bin/env python3
"""Audit rendered routes, anchors, navigation, media, downloads and sharing metadata.
Run against a production preview; browser evidence is recorded separately.
"""
import argparse, csv, json, re, time
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError
from urllib.parse import urljoin, urlsplit

ROUTES = ['/', '/resume', '/research', '/research/george-mason-neuronal-reconstruction']
PUBLIC = 'https://fatgezimb.github.io/fatgezim-portfolio/'

class Targets(HTMLParser):
    def __init__(self):
        super().__init__(); self.items=[]; self.ids=set(); self.current=None
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if a.get('id'): self.ids.add(a['id'])
        if tag=='a' and a.get('href'):
            self.current={'kind':'navigation','label':a.get('aria-label',''),'original_url':a['href']}; self.items.append(self.current)
        for attr in ['src','poster','data-src','data-poster']:
            if a.get(attr): self.items.append({'kind':'asset','label':a.get('alt',f'{tag} {attr}'),'original_url':a[attr]})
        if tag=='form' and a.get('action'): self.items.append({'kind':'contact','label':'Contact form','original_url':a['action']})
        if tag=='link' and a.get('href') and a.get('rel') in ['canonical','icon','shortcut icon']:
            self.items.append({'kind':'metadata','label':a['rel'],'original_url':a['href']})
        if tag=='meta' and a.get('property') in ['og:url','og:image']:
            self.items.append({'kind':'metadata','label':a['property'],'original_url':a.get('content','')})
    def handle_data(self,data):
        if self.current: self.current['label']+=data.strip()+' '
    def handle_endtag(self,tag):
        if tag=='a': self.current=None


def request(url):
    last={}
    for attempt in range(2):
        try:
            with urlopen(Request(url,headers={'User-Agent':'Mozilla/5.0 PortfolioLinkAudit/1.0'}),timeout=18) as r:
                body=r.read(1500000); kind=r.headers.get('content-type','')
                title=re.search(b'<title[^>]*>(.*?)</title>',body,re.S|re.I)
                return {'status':r.status,'final_url':r.url,'redirects':'yes' if r.url!=url else 'no','content_type':kind,'title':title.group(1).decode(errors='replace') if title else ''}
        except HTTPError as e:
            last={'status':e.code,'final_url':e.url,'redirects':'yes' if e.url!=url else 'no','content_type':e.headers.get('content-type',''),'title':''}
            if e.code not in [429,500,502,503,504]: return last
        except Exception as e: last={'status':'request error','final_url':url,'redirects':'unknown','content_type':'','title':type(e).__name__}
        time.sleep(.3)
    return last

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--base',default='http://localhost:4173');parser.add_argument('--output',default='work/reconciliation/link-inventory.json');args=parser.parse_args()
    documents={}; records=[]
    base_prefix=urlsplit(args.base).path.rstrip('/')
    for route in ROUTES:
        with urlopen(args.base+route) as r: html=r.read().decode()
        doc=Targets();doc.feed(html);documents[route]=doc
        seen=set()
        for item in doc.items:
            target=item['original_url']
            key=(item['kind'],item['label'].strip(),target)
            if key in seen or target.startswith(('data:','blob:')): continue
            seen.add(key); records.append({'source_page':route,**item,'label':item['label'].strip()})
    records.extend([{'source_page':'/','kind':'metadata','label':label,'original_url':base_prefix+route} for route,label in [('/robots.txt','Crawler policy'),('/sitemap.xml','XML sitemap')]])
    urls=set()
    for item in records:
        u=item['original_url'];p=urlsplit(u)
        if p.scheme=='mailto': continue
        if u.startswith(PUBLIC): u=args.base+'/'+u[len(PUBLIC):]
        resolved=urljoin(args.base+item['source_page'],u)
        if p.fragment and not p.netloc: continue
        urls.add(resolved.split('#')[0])
    with ThreadPoolExecutor(max_workers=8) as executor: checked=dict(zip(sorted(urls),executor.map(request,sorted(urls))))
    for item in records:
        u=item['original_url'];p=urlsplit(u)
        if p.scheme=='mailto': result={'status':'mailto','final_url':u,'redirects':'no','content_type':'email handoff','title':''}; behavior='Native email composer; browser submission not sent'
        elif p.fragment and not p.netloc:
            path=p.path or item['source_page']
            if base_prefix and path.startswith(base_prefix): path=path[len(base_prefix):]
            path=path.rstrip('/') or '/'
            found=path in documents and p.fragment in documents[path].ids
            result={'status':200 if found else 'missing anchor','final_url':urljoin(PUBLIC,u.lstrip('/')),'redirects':'no','content_type':'same-page target','title':''};behavior='Target exists' if found else 'Missing target'
        else:
            local=u
            if u.startswith(PUBLIC): local=args.base+'/'+u[len(PUBLIC):]
            resolved=urljoin(args.base+item['source_page'],local).split('#')[0];result=checked[resolved].copy()
            behavior='HTTP checked; browser sampling recorded in QA report'
            if 'linkedin.com' in u: behavior='Browser redirects to LinkedIn authwall; profile content unverified'
            if result['status']==200 and '/login' in result['final_url']: behavior='Account gate'
            result['final_url']=result['final_url'].replace(args.base+'/',PUBLIC)
        item.update(result,route_behavior=behavior)
        public_target=u
        if base_prefix and public_target.startswith(base_prefix+'/'): public_target=public_target[len(base_prefix):]
        item['intended_destination']=urljoin(PUBLIC+item['source_page'].lstrip('/'),public_target) if not public_target.startswith('/') else PUBLIC+public_target[1:]
        item['accessibility']='Descriptive text/label present' if item['label'] else 'Decorative asset or unlabeled target; see browser audit'
    out=Path(args.output);out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps({'base':args.base,'timestamp':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),'records':records},indent=2))
    print(json.dumps({'records':len(records),'unique_requests':len(urls),'failures':[{'source':x['source_page'],'url':x['original_url'],'status':x['status']} for x in records if x['status'] not in [200,'mailto']]}))

if __name__=='__main__':main()
