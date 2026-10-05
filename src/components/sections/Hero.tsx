import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import styles from "./Hero.module.css";

export function Hero({ t }: { t: Dictionary["hero"] }) {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.pattern} aria-hidden />
      <div className={styles.glow} aria-hidden />

      <div className={`container ${styles.grid}`} data-reveal>
        <div className={styles.portrait}>
          <div className={styles.photo}>
            <Image
              src="/images/profile/inhco.jpeg"
              alt={t.photoAlt}
              fill
              preload
              sizes="(max-width: 819px) 90vw, 440px"
              className={styles.photoImage}
            />
          </div>
          <div className={styles.badge}>
            <span className={styles.dot} aria-hidden />
            {t.available}
          </div>
        </div>

        <div className={styles.copy}>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h1 className={styles.title}>{t.title}</h1>
          <p className={styles.lead}>{t.lead}</p>
          <ul className={styles.credentials}>
            <li>{t.role}</li>
            <li>UNT</li>
            <li>{t.location}</li>
          </ul>
          <div className={styles.actions}>
            <ButtonLink href="#contact">
              {t.primaryCta} <span aria-hidden>→</span>
            </ButtonLink>
            <ButtonLink href={encodeURI(site.cvPath)} variant="secondary" external>
              {t.cvCta} <span className={styles.fileType}>PDF</span>
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
