import { siteContent } from "@/app/content/site";
import { CommandCenterNavigation } from "./navigation";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="wordmark" href="#top" aria-label="Zim Bela, back to top">
          <span className="wordmark__mark" aria-hidden="true">
            ZB
          </span>
          <span>
            <strong>{siteContent.hero.shortName}</strong>
            <small>Verified portfolio</small>
          </span>
        </a>

        <CommandCenterNavigation />
      </div>
    </header>
  );
}
