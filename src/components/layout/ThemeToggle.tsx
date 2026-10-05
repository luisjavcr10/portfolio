"use client";

import styles from "./Header.module.css";

export function ThemeToggle({ label }: { label: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit.
    }
  }

  return (
    <button type="button" onClick={toggle} aria-label={label} title={label} className={styles.themeToggle}>
      <span className={styles.themeIcon} aria-hidden />
    </button>
  );
}
