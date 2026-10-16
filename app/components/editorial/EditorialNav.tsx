import { sitePath } from "@/app/content/paths";
import { publication } from "@/app/content/publication";
import styles from "./EditorialHome.module.css";

export function EditorialNav({
  home = false,
  work = false,
}: {
  home?: boolean;
  work?: boolean;
}) {
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
      <nav aria-label="Main navigation">
        <a href={sitePath("/work/")} aria-current={work ? "page" : undefined}>
          Work
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
    </header>
  );
}
