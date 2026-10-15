import { siteContent } from "@/app/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer section-shell">
      <p>{siteContent.footer.copyright}</p>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}
