import type { Dictionary } from "@/i18n/dictionaries/es";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./Experience.module.css";

export function Experience({ t }: { t: Dictionary["experience"] }) {
  return (
    <section id="experiencia" className="section">
      <div className={`container ${styles.grid}`} data-reveal>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />

        <ol className={styles.timeline}>
          <li className={`${styles.item} ${styles.featured}`}>
            <span className={styles.marker} aria-hidden />
            <div className={styles.card}>
              <div className={styles.fret} aria-hidden />
              <div className={styles.cardTop}>
                <Eyebrow>{t.current}</Eyebrow>
                <span className={styles.location}>{t.location}</span>
              </div>
              <h3 className={styles.company}>Scotiabank</h3>
              <div className={styles.role}>{t.bank.role}</div>
              <p className={styles.text}>{t.bank.text}</p>
            </div>
          </li>

          <li className={styles.item}>
            <span className={styles.marker} aria-hidden />
            <div className={styles.card}>
              <Eyebrow muted>{t.freelance.label}</Eyebrow>
              <h3 className={styles.title}>{t.freelance.role}</h3>
              <p className={styles.text}>{t.freelance.text}</p>
            </div>
          </li>

          <li className={`${styles.item} ${styles.education}`}>
            <span className={styles.marker} aria-hidden />
            <div className={styles.card}>
              <Eyebrow muted>{t.education.label}</Eyebrow>
              <h3 className={styles.title}>{t.education.school}</h3>
              <p className={styles.text}>{t.education.degree}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
