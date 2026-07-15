"use client";

import { useSyncExternalStore } from "react";
import styles from "./CommandCenterNavigation.module.css";

type Theme = "light" | "dark";

const STORAGE_KEY = "zim-portfolio-theme";
const THEME_EVENT = "zim-portfolio-theme-change";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;

  const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  themeColor?.setAttribute("content", theme === "light" ? "#f4f8f6" : "#03070d");
  window.dispatchEvent(new Event(THEME_EVENT));
}

function getThemeSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribeToTheme(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    applyTheme(event.newValue === "dark" ? "dark" : "light");
  };

  window.addEventListener(THEME_EVENT, onStoreChange);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(THEME_EVENT, onStoreChange);
    window.removeEventListener("storage", handleStorage);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, () => "light");

  const nextTheme: Theme = theme === "light" ? "dark" : "light";

  return (
    <button
      aria-label={`Switch to ${nextTheme} theme`}
      className={styles.themeButton}
      onClick={() => {
        applyTheme(nextTheme);
        try {
          window.localStorage.setItem(STORAGE_KEY, nextTheme);
        } catch {
          // The theme still switches when browser storage is blocked.
        }
      }}
      title={`Switch to ${nextTheme} theme`}
      type="button"
    >
      <span aria-hidden="true" className={styles.themeIcon}>
        {theme === "light" ? "☀" : "◐"}
      </span>
      <span className={styles.themeLabel}>{theme === "light" ? "Light" : "Dark"}</span>
    </button>
  );
}
