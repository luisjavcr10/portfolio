import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { Eyebrow } from "@/components/ui/SectionHeading";
import styles from "./About.module.css";

const tones = ["current", "freelance", "education"] as const;

export function About({ t }: { t: Dictionary["about"] }) {
  return (
    <section id="sobre-mi" className="section">
      <div className={`container ${styles.grid}`} data-reveal>
        <div className={styles.photoCard}>
          <div className={styles.photo}>
            <Image
              src="/images/profile/profile.jpg"
              alt={t.photoAlt}
              fill
              sizes="(max-width: 819px) 100vw, 400px"
              className={styles.photoImage}
            />
          </div>
        </div>

        <div className={styles.copy}>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.text}>{t.text}</p>
          <ul className={styles.timeline}>
            {t.timeline.map((entry, i) => (
              <li key={entry.title} className={styles.row} data-tone={tones[i] ?? "freelance"}>
                <span className={styles.label}>
                  <span className={styles.node} aria-hidden />
                  {entry.label}
                </span>
                <span className={styles.rowTitle}>{entry.title}</span>
                <span className={styles.rowText}>{entry.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
