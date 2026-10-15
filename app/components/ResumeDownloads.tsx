import { sitePath } from "@/app/content/paths";
import { publication } from "@/app/content/publication";

export function ResumeDownloads() {
  if (!publication.resumeDownloadsApproved) return null;
  return (
    <span className="resume-downloads" aria-label="Download résumé">
      <a className="button button--secondary" download href={sitePath(publication.pdf)}>Download PDF</a>
      <a className="text-link" download href={sitePath(publication.docx)}>Editable DOCX</a>
    </span>
  );
}
