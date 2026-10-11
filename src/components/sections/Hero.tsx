import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { ContactTrigger } from "@/components/contact/ContactPanel";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import styles from "./Hero.module.css";

export function Hero({ t }: { t: Dictionary["hero"] }) {
  return (
    <section id="inicio" className={styles.hero}>
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
          <div className={styles.actions}>
            <ContactTrigger className={buttonClass("primary")}>
              {t.primaryCta} <span aria-hidden>→</span>
            </ContactTrigger>
            <ButtonLink href="#soluciones" variant="secondary">
              {t.secondaryCta} <span className={styles.arrowDown} aria-hidden>↓</span>
            </ButtonLink>
          </div>
          <p className={styles.credentials}>
            <span className={styles.diamond} aria-hidden />
            {t.credentials}
          </p>
        </div>
      </div>
    </section>
  );
}
