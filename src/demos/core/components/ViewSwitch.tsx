"use client";

import { useRef, type KeyboardEvent } from "react";
import styles from "./ViewSwitch.module.css";

export type ViewOption<V extends string> = { id: V; label: string };

type ViewSwitchProps<V extends string> = {
  label: string;
  options: [ViewOption<V>, ViewOption<V>];
  active: V;
  onChange: (view: V) => void;
  resetLabel: string;
  onReset: () => void;
  hint?: { text: string; dismissLabel: string; onDismiss: () => void } | null;
  /** Leaves room for a bottom navigation bar on small screens. */
  raised?: boolean;
};

/** Floating two-way switch fixed at the bottom center of the demo. */
export function ViewSwitch<V extends string>({
  label,
  options,
  active,
  onChange,
  resetLabel,
  onReset,
  hint,
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
      {hint && (
        <div className={styles.hint} role="status">
          <span>{hint.text}</span>
          <button type="button" onClick={hint.onDismiss} aria-label={hint.dismissLabel} className={styles.hintClose}>
            ×
          </button>
        </div>
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
        <button type="button" className={styles.reset} onClick={onReset} title={resetLabel} aria-label={resetLabel}>
          <span aria-hidden>↺</span>
          <span className={styles.resetText} aria-hidden>
            {resetLabel}
          </span>
        </button>
      </div>
    </div>
  );
}
