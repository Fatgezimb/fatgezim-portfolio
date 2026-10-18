"use client";

import { useEffect, useRef } from "react";
import { sitePath } from "@/app/content/paths";
import { publication } from "@/app/content/publication";
import styles from "./EditorialHome.module.css";

export function EditorialNav({
  home = false,
  work = false,
  engineering = false,
}: {
  home?: boolean;
  work?: boolean;
  engineering?: boolean;
}) {
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      const current = menu.current;
      if (current?.open && event.target instanceof Node && !current.contains(event.target)) {
        current.open = false;
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);
  const anchor = (id: string) => (home ? `#${id}` : sitePath(`/#${id}`));
  return (
    <header className={styles.header}>
      <a
        className={styles.wordmark}
        href={anchor("top")}
        aria-label="Fatgezim Zim Bela, home"
      >
        <strong>ZIM</strong>
        <span>Fatgezim Bela</span>
      </a>
      <nav className={styles.desktopNav} aria-label="Main navigation">
        <a href={sitePath("/work/")} aria-current={work ? "page" : undefined}>
          Work
        </a>
        <a
          href={sitePath("/engineering/")}
          aria-current={engineering ? "page" : undefined}
        >
          Engineering
        </a>
        <a href={anchor("research")}>Research</a>
        <a href={anchor("experience")}>Experience</a>
        <a href={anchor("contact")}>Contact</a>
      </nav>
      <a
        className={styles.headerResume}
        href={sitePath(publication.pdf)}
        download
      >
        Résumé <span aria-hidden="true">↓</span>
      </a>
      <details
        ref={menu}
        className={styles.mobileMenu}
        onKeyDown={(event) => {
          if (event.key === "Escape" && menu.current?.open) {
            menu.current.open = false;
            menu.current.querySelector("summary")?.focus();
          }
        }}
      >
        <summary>Menu <span aria-hidden="true">☰</span></summary>
      <nav aria-label="Mobile navigation" onClick={(event) => {
          if ((event.target as HTMLElement).closest("a") && menu.current) {
            menu.current.open = false;
          }
        }}>
        <a href={sitePath("/work/")} aria-current={work ? "page" : undefined}>
          Work
        </a>
        <a
          href={sitePath("/engineering/")}
          aria-current={engineering ? "page" : undefined}
        >
          Engineering
        </a>
        <a href={anchor("research")}>Research</a>
        <a href={anchor("experience")}>Experience</a>
        <a href={anchor("contact")}>Contact</a>
      </nav>
      </details>
    </header>
  );
}
