import type { ReactNode } from "react";
import { SiteFooter } from "../SiteFooter";
import { SiteHeader } from "../SiteHeader";

type ResearchPageShellProps = {
  children: ReactNode;
  className?: string;
};

export function ResearchPageShell({ children, className }: ResearchPageShellProps) {
  return (
    <div id="top">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />
      <main className={className} id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
