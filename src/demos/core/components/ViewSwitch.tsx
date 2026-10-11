"use client";

import { useRef, type KeyboardEvent } from "react";
import styles from "./ViewSwitch.module.css";

export type ViewOption<V extends string> = { id: V; label: string };

/** Where the demo notice links: the portfolio's legal page, section about the demos. */
export const DEMO_NOTICE_HREF = "/es/legal#demos";

type ViewSwitchProps<V extends string> = {
  label: string;
  options: [ViewOption<V>, ViewOption<V>];
  active: V;
  onChange: (view: V) => void;
  /** Always-visible label that says the business is made up. */
  notice?: { text: string; href: string };
  /** Leaves room for a bottom navigation bar on small screens. */
  raised?: boolean;
};

/** Floating two-way switch fixed at the bottom center of the demo. */
export function ViewSwitch<V extends string>({
  label,
  options,
  active,
  onChange,
  notice,
  raised = false,
}: ViewSwitchProps<V>) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = options.findIndex((option) => option.id === active);

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const next = activeIndex === 0 ? 1 : 0;
    onChange(options[next].id);
    buttons.current[next]?.focus();
  }

  return (
    <div className={`${styles.wrap} ${raised ? styles.raised : ""}`}>
      {notice && (
        <a href={notice.href} className={styles.notice}>
          <span className={styles.noticeDot} aria-hidden />
          {notice.text}
        </a>
      )}
      <div className={styles.row}>
        <div className={styles.tabs} role="tablist" aria-label={label} onKeyDown={handleKeyDown}>
          <span
            className={styles.indicator}
            style={{ transform: activeIndex === 1 ? "translateX(100%)" : "translateX(0)" }}
            aria-hidden
          />
          {options.map((option, i) => (
            <button
              key={option.id}
              ref={(el) => {
                buttons.current[i] = el;
              }}
              type="button"
              role="tab"
              aria-selected={option.id === active}
              tabIndex={option.id === active ? 0 : -1}
              className={styles.tab}
              onClick={() => onChange(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
