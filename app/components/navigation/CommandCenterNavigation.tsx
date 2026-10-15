"use client";

import { sitePath } from "@/app/content/paths";
import { publication } from "@/app/content/publication";

import { navigationItems } from "@/app/content/site";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { SafeLink } from "../SafeLink";
import styles from "./CommandCenterNavigation.module.css";
import { ThemeToggle } from "./ThemeToggle";

type CommandAction = {
  href: string;
  label: string;
  hint: string;
  newTab?: boolean;
};

function restoreNavigationFocus(
  ...candidates: (HTMLElement | null | undefined)[]
) {
  for (const target of candidates) {
    if (
      !target?.isConnected ||
      !target.getClientRects().length ||
      target === document.body
    )
      continue;
    target.focus();
    if (document.activeElement === target) return;
  }
}

function NavigationLinks({
  activeId,
  newTab,
  onNavigate,
  compact = false,
}: {
  activeId: string;
  newTab: boolean;
  onNavigate?: () => void;
  compact?: boolean;
}) {
  return (
    <ul className={styles.navList}>
      {navigationItems
        .filter(
          (item) =>
            !compact ||
            ["workspace", "projects", "about", "contact"].includes(item.id),
        )
        .map((item) => (
          <li key={item.href}>
            <SafeLink
              aria-current={
                !newTab && activeId === item.id ? "location" : undefined
              }
              className={styles.navLink}
              href={sitePath(item.href)}
              newTab={newTab}
              onClick={onNavigate}
            >
              {item.label}
            </SafeLink>
          </li>
        ))}
    </ul>
  );
}

export function CommandCenterNavigation() {
  const pathname = usePathname();
  const navigationLeavesPage = pathname !== "/";
  const [activeId, setActiveId] = useState("top");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const commandButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const updatePageState = () => {
      frame = 0;
      const page = document.documentElement;
      const availableScroll = Math.max(
        1,
        page.scrollHeight - window.innerHeight,
      );
      const progress = Math.min(
        1,
        Math.max(0, window.scrollY / availableScroll),
      );
      progressRef.current?.style.setProperty(
        "--page-progress",
        `${progress * 100}%`,
      );

      const activationLine = window.innerHeight * 0.38;
      let current = "top";
      for (const item of navigationItems) {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= activationLine) {
          current = item.id;
        }
      }
      setActiveId(current);
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
          window.requestAnimationFrame(() => {
            restoreNavigationFocus(
              returnFocusRef.current,
              commandButtonRef.current,
              mobileMenuRef.current?.querySelector("summary"),
            );
          });
        } else {
          returnFocusRef.current =
            document.activeElement instanceof HTMLElement
              ? document.activeElement
              : null;
          setDialogOpen(true);
        }
      }
    };

    window.addEventListener("keydown", openCommandCenter);
    return () => window.removeEventListener("keydown", openCommandCenter);
  }, []);

  const filteredActions = useMemo(() => {
    const commandActions: readonly CommandAction[] = [
      ...navigationItems.map((item) => ({
        href: item.href,
        label: item.label,
        hint: "Section",
        newTab: navigationLeavesPage,
      })),
      ...(pathname === "/research"
        ? []
        : [
            {
              href: "/research",
              label: "Research",
              hint: "Page",
              newTab: true,
            },
          ]),
      { href: "/resume", label: "Résumé", hint: "Document", newTab: true },
    ];
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return commandActions;
    return commandActions.filter((action) =>
      `${action.label} ${action.hint}`.toLowerCase().includes(normalizedQuery),
    );
  }, [navigationLeavesPage, pathname, query]);

  const closeDialog = () => {
    setDialogOpen(false);
    setQuery("");
    window.requestAnimationFrame(() => {
      restoreNavigationFocus(
        returnFocusRef.current,
        commandButtonRef.current,
        mobileMenuRef.current?.querySelector("summary"),
      );
    });
  };

  return (
    <>
      <div className={styles.controls}>
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <NavigationLinks
            activeId={activeId}
            newTab={navigationLeavesPage}
            compact
          />
        </nav>

        <SafeLink
          className={styles.mobileWorkShortcut}
          href="/#projects"
          newTab={navigationLeavesPage}
        >
          Work
        </SafeLink>
        <a
          className={styles.resumeShortcut}
          href={sitePath(publication.pdf)}
          download
          aria-label="Download résumé PDF"
        >
          Résumé <span aria-hidden="true">↓</span>
        </a>
        <ThemeToggle />

        <button
          aria-label="Open navigation search"
          aria-expanded={dialogOpen}
          aria-haspopup="dialog"
          className={styles.commandButton}
          onClick={(event) => {
            returnFocusRef.current = event.currentTarget;
            setDialogOpen(true);
          }}
          ref={commandButtonRef}
          type="button"
        >
          <span>Search</span>
          <kbd>⌘ K</kbd>
        </button>

        <details className={styles.mobileNav} ref={mobileMenuRef}>
          <summary className={styles.mobileSummary}>Menu</summary>
          <nav className={styles.mobilePanel} aria-label="Mobile navigation">
            <NavigationLinks
              activeId={activeId}
              newTab={navigationLeavesPage}
              onNavigate={() => {
                if (mobileMenuRef.current) mobileMenuRef.current.open = false;
              }}
            />
          </nav>
        </details>
      </div>

      <div
        className={styles.progressTrack}
        aria-hidden="true"
        ref={progressRef}
      >
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
            <p>Quick navigation</p>
            <strong id="command-center-title">Go to</strong>
          </div>
          <button
            aria-label="Close navigation search"
            className={styles.closeButton}
            onClick={closeDialog}
            type="button"
          >
            ×
          </button>
        </header>
        <input
          aria-label="Search destinations"
          className={styles.search}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search sections or pages…"
          type="search"
          value={query}
        />
        {filteredActions.length ? (
          <ol className={styles.commandList}>
            {filteredActions.map((action, index) => (
              <li key={action.href}>
                <SafeLink
                  className={styles.commandLink}
                  href={sitePath(action.href)}
                  newTab={action.newTab}
                  onClick={closeDialog}
                >
                  <span className={styles.commandIndex} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{action.label}</span>
                  <span className={styles.commandHint}>{action.hint}</span>
                </SafeLink>
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
