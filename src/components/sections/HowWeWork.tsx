import type { Dictionary } from "@/i18n/dictionaries/es";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./HowWeWork.module.css";

/** Four steps: a row on wide screens, a vertical line on phones. */
export function HowWeWork({ t }: { t: Dictionary["how"] }) {
  return (
    <section id="como" className={`section ${styles.section}`} aria-labelledby="como-title">
      <div className={`container ${styles.wrapper}`} data-reveal>
        <SectionHeading id="como-title" eyebrow={t.eyebrow} title={t.title} />
        <ol className={styles.steps}>
          {t.steps.map((step, i) => (
            <li key={step.title} className={styles.step} data-last={i === t.steps.length - 1 ? "" : undefined}>
              <div className={styles.marker} aria-hidden>
                <span className={styles.number}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.node} />
                <span className={styles.line} />
              </div>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.text}>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
