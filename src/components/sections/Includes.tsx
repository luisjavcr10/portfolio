import type { ReactNode } from "react";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { ContactTrigger } from "@/components/contact/ContactPanel";
import { buttonClass } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./Includes.module.css";

/** One icon per item, in the same order as the dictionary. */
const icons: ReactNode[] = [
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18" />
    <path d="M7 6.5h.01M10 6.5h.01" />
  </>,
  <>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
    <path d="M9 15l2 2 4-4" />
  </>,
  <>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </>,
  <>
    <path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4z" />
    <path d="M10 21h4" />
  </>,
  <>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </>,
];

export function Includes({ t }: { t: Dictionary["includes"] }) {
  return (
    <section id="incluye" className="section" aria-labelledby="incluye-title">
      <div className={`container ${styles.wrapper}`} data-reveal>
        <SectionHeading id="incluye-title" eyebrow={t.eyebrow} title={t.title} />

        <article className={styles.bundle}>
          <div className={styles.fret} aria-hidden />
          <div className={styles.glow} aria-hidden />
          <ul className={styles.grid}>
            {t.items.map((item, i) => (
              <li key={item.title} className={`${styles.item} ${i < 2 ? styles.wide : ""}`}>
                <span className={styles.icon} aria-hidden>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    {icons[i]}
                  </svg>
                </span>
                <div className={styles.itemText}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemBody}>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.footer}>
            <p className={styles.summary}>
              <span className={styles.diamond} aria-hidden />
              {t.summary}
            </p>
            <ContactTrigger className={buttonClass("primary", "lg", styles.cta)}>
              {t.cta} <span aria-hidden>→</span>
            </ContactTrigger>
          </div>
        </article>

        <p className={styles.note}>{t.note}</p>
      </div>
    </section>
  );
}
