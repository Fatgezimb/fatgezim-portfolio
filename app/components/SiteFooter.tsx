import { siteContent } from "@/app/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer section-shell">
      <div>
        <p className="site-footer__signal">System / End of transmission</p>
        <p>{siteContent.footer.copyright}</p>
      </div>
      <p>{siteContent.footer.privacyNote}</p>
      <a href="#top">Return to signal origin ↑</a>
    </footer>
  );
}
