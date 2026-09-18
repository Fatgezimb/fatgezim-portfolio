import { publicPath } from "@/app/lib/public-path";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type SafeLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "rel" | "target"
> & {
  children: ReactNode;
  newTab?: boolean;
};

export function SafeLink({ children, newTab = false, ...props }: SafeLinkProps) {
  return (
    <a
      {...props}
      href={props.href ? publicPath(props.href) : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      target={newTab ? "_blank" : undefined}
    >
      {children}
      {newTab ? <span className="visually-hidden"> (opens in a new tab)</span> : null}
    </a>
  );
}
