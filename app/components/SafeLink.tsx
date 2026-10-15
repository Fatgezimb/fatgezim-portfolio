import { sitePath } from "@/app/content/paths";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type SafeLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "rel" | "target"
> & {
  children: ReactNode;
  newTab?: boolean;
};

export function SafeLink({ children, href, newTab = false, ...props }: SafeLinkProps) {
  return (
    <a
      {...props}
      href={href ? sitePath(href) : href}
      rel={newTab ? "noopener noreferrer" : undefined}
      target={newTab ? "_blank" : undefined}
    >
      {children}
      {newTab ? <span className="visually-hidden"> (opens in a new tab)</span> : null}
    </a>
  );
}
