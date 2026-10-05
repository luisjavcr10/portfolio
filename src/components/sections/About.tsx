import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { Eyebrow } from "@/components/ui/SectionHeading";
import styles from "./About.module.css";

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
              sizes="(max-width: 819px) 100vw, 420px"
              className={styles.photoImage}
            />
          </div>
        </div>

        <div className={styles.card}>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.text}>{t.text}</p>
          <div className={styles.signature}>
            <span className={styles.diamond} aria-hidden />
            <span>{t.madeIn}</span>
          </div>
          <div className={styles.fret} aria-hidden />
        </div>
      </div>
    </section>
  );
}
