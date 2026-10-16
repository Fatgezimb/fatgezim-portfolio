import type { Metadata } from "next";
import { publication } from "@/app/content/publication";
import { sitePath } from "@/app/content/paths";
import { EditorialNav } from "@/app/components/editorial/EditorialNav";
import { WorkGallery } from "@/app/components/editorial/WorkGallery";
import styles from "@/app/components/editorial/WorkIndex.module.css";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Products, automation, analytics, research, and experiments by Fatgezim Zim Bela, with interactive samples and original evidence.",
  alternates: { canonical: `${publication.url}work/` },
  openGraph: {
    title: "Work | Fatgezim Zim Bela",
    description: "Explore products, research, automation and experiments.",
    url: `${publication.url}work/`,
    images: [`${publication.url}og.png`],
  },
};

export default function WorkPage() {
  return (
    <div id="top" className={styles.page}>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <EditorialNav work />
      <main id="main-content" tabIndex={-1}>
        <header className={styles.intro}>
          <p>Work / The full collection</p>
          <h1>Ideas put to work.</h1>
          <div>
            <span>Products. Systems. Research.</span>
            <p>
              Start with engineering systems and reproducible data projects.
              Explore the applications, read the engineering notes, or continue
              into behavioral-health products and original research.
            </p>
          </div>
        </header>
        <WorkGallery catalog />
      </main>
      <footer className={styles.footer}>
        <a href={sitePath("/")}>← Back to the portfolio</a>
        <a href={sitePath("/#contact")}>Let’s talk →</a>
      </footer>
    </div>
  );
}
