"use client";

import { useEffect, useRef, useState } from "react";
import { sitePath } from "@/app/content/paths";
import { publication } from "@/app/content/publication";
import styles from "./EditorialHome.module.css";

export function EditorialNav({
  home = false,
  work = false,
  engineering = false,
  research = false,
  resume = false,
}: {
  home?: boolean;
  work?: boolean;
  engineering?: boolean;
  research?: boolean;
  resume?: boolean;
}) {
  const [section, setSection] = useState("");
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const updateSection = () => setSection(window.location.hash.slice(1));
    updateSection();
    window.addEventListener("hashchange", updateSection);
    const closeOutside = (event: PointerEvent) => {
      const current = menu.current;
      if (current?.open && event.target instanceof Node && !current.contains(event.target)) {
        current.open = false;
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      window.removeEventListener("hashchange", updateSection);
    };
  }, []);
  const anchor = (id: string) => (home ? `#${id}` : sitePath(`/#${id}`));
  return (
    <header className={styles.header}>
      <a
        className={styles.wordmark}
        href={anchor("top")}
        aria-label="Fatgezim Zim Bela, home"
        aria-current={home && !["research", "experience", "contact"].includes(section) ? "page" : undefined}
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
        <a href={home ? anchor("research") : sitePath("/research/")} aria-current={research ? "page" : home && section === "research" ? "location" : undefined}>Research</a>
        <a href={anchor("experience")} aria-current={home && section === "experience" ? "location" : undefined}>Experience</a>
        <a href={anchor("contact")} aria-current={home && section === "contact" ? "location" : undefined}>Contact</a>
      </nav>
      <a
        className={`${styles.headerResume} ${resume ? styles.currentResume : ""}`}
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
        <summary>
          <span className={styles.menuClosed}>Menu</span><span className={styles.menuOpen}>Close</span>
          <span className={styles.menuClosed} aria-hidden="true">☰</span><span className={styles.menuOpen} aria-hidden="true">×</span>
        </summary>
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
        <a href={home ? anchor("research") : sitePath("/research/")} aria-current={research ? "page" : home && section === "research" ? "location" : undefined}>Research</a>
        <a href={anchor("experience")} aria-current={home && section === "experience" ? "location" : undefined}>Experience</a>
        <a href={anchor("contact")} aria-current={home && section === "contact" ? "location" : undefined}>Contact</a>
      </nav>
      </details>
    </header>
  );
}
