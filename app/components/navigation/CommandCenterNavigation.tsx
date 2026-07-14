"use client";

import { navigationItems } from "@/app/content/site";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./CommandCenterNavigation.module.css";

type CommandAction = {
  href: string;
  label: string;
  hint: string;
};

const commandActions: readonly CommandAction[] = [
  ...navigationItems.map((item) => ({
    href: item.href,
    label: item.label,
    hint: "Section",
  })),
  { href: "/resume", label: "Print résumé", hint: "Document" },
];

function NavigationLinks({
  activeHref,
  onNavigate,
}: {
  activeHref: string;
  onNavigate?: () => void;
}) {
  return (
    <ul className={styles.navList}>
      {navigationItems.map((item) => (
        <li key={item.href}>
          <a
            aria-current={activeHref === item.href ? "location" : undefined}
            className={styles.navLink}
            href={item.href}
            onClick={onNavigate}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function CommandCenterNavigation() {
  const [activeHref, setActiveHref] = useState("#top");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const commandButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const updatePageState = () => {
      frame = 0;
      const page = document.documentElement;
      const availableScroll = Math.max(1, page.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / availableScroll));
      progressRef.current?.style.setProperty("--page-progress", `${progress * 100}%`);

      const activationLine = window.innerHeight * 0.38;
      let current = "#top";
      for (const item of navigationItems) {
        const section = document.querySelector<HTMLElement>(item.href);
        if (section && section.getBoundingClientRect().top <= activationLine) {
          current = item.href;
        }
      }
      setActiveHref(current);
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updatePageState);
    };

    updatePageState();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (dialogOpen && !dialog.open) {
      dialog.showModal();
      window.requestAnimationFrame(() => {
        dialog.querySelector<HTMLInputElement>("input")?.focus();
      });
    } else if (!dialogOpen && dialog.open) {
      dialog.close();
    }
  }, [dialogOpen]);

  useEffect(() => {
    const openCommandCenter = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialogRef.current?.open) {
          setDialogOpen(false);
          setQuery("");
          window.requestAnimationFrame(() => commandButtonRef.current?.focus());
        } else {
          setDialogOpen(true);
        }
      }
    };

    window.addEventListener("keydown", openCommandCenter);
    return () => window.removeEventListener("keydown", openCommandCenter);
  }, []);

  const filteredActions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return commandActions;
    return commandActions.filter((action) =>
      `${action.label} ${action.hint}`.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  const closeDialog = () => {
    setDialogOpen(false);
    setQuery("");
    window.requestAnimationFrame(() => commandButtonRef.current?.focus());
  };

  return (
    <>
      <div className={styles.controls}>
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <NavigationLinks activeHref={activeHref} />
        </nav>

        <button
          aria-label="Open command center"
          aria-expanded={dialogOpen}
          aria-haspopup="dialog"
          className={styles.commandButton}
          onClick={() => setDialogOpen(true)}
          ref={commandButtonRef}
          type="button"
        >
          <span>Command</span>
          <kbd>⌘ K</kbd>
        </button>

        <details className={styles.mobileNav} ref={mobileMenuRef}>
          <summary className={styles.mobileSummary}>Menu</summary>
          <nav className={styles.mobilePanel} aria-label="Mobile navigation">
            <NavigationLinks
              activeHref={activeHref}
              onNavigate={() => {
                if (mobileMenuRef.current) mobileMenuRef.current.open = false;
              }}
            />
          </nav>
        </details>
      </div>

      <div className={styles.progressTrack} aria-hidden="true" ref={progressRef}>
        <div className={styles.progressValue} />
      </div>

      <dialog
        aria-labelledby="command-center-title"
        className={styles.dialog}
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClose={() => {
          setDialogOpen(false);
          setQuery("");
        }}
        ref={dialogRef}
      >
        <header className={styles.dialogHeader}>
          <div>
            <p>Navigation system</p>
            <strong id="command-center-title">Command center</strong>
          </div>
          <button
            aria-label="Close command center"
            className={styles.closeButton}
            onClick={closeDialog}
            type="button"
          >
            ×
          </button>
        </header>
        <input
          aria-label="Filter destinations"
          className={styles.search}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Jump to a section or document…"
          type="search"
          value={query}
        />
        {filteredActions.length ? (
          <ol className={styles.commandList}>
            {filteredActions.map((action, index) => (
              <li key={action.href}>
                <a className={styles.commandLink} href={action.href} onClick={closeDialog}>
                  <span className={styles.commandIndex} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{action.label}</span>
                  <span className={styles.commandHint}>{action.hint}</span>
                </a>
              </li>
            ))}
          </ol>
        ) : (
          <p className={styles.empty}>No matching destination.</p>
        )}
      </dialog>
    </>
  );
}
