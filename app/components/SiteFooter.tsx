import { siteContent } from "@/app/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer section-shell">
      <p>{siteContent.footer.copyright}</p>
      <p>{siteContent.footer.privacyNote}</p>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}
