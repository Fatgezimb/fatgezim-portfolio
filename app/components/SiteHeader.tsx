import { navigationItems, siteContent } from "@/app/content/site";

function NavigationLinks() {
  return (
    <ul className="nav-list">
      {navigationItems.map((item) => (
        <li key={item.href}>
          <a href={item.href}>{item.label}</a>
        </li>
      ))}
    </ul>
  );
}

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

        <nav className="desktop-nav" aria-label="Primary navigation">
          <NavigationLinks />
        </nav>

        <details className="mobile-nav">
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation">
            <NavigationLinks />
          </nav>
        </details>
      </div>
    </header>
  );
}
