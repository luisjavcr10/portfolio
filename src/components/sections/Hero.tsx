import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { ContactTrigger } from "@/components/contact/ContactPanel";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import styles from "./Hero.module.css";

/**
 * Wide screens: full-bleed photo with the copy over its dark left side.
 * Phones: the photo on top, fading into the page, and the copy below.
 * The hero is always dark (the photo is a night shot): data-theme="dark" scopes
 * the dark tokens to this section, whatever theme the page uses.
 */
export function Hero({ t }: { t: Dictionary["hero"] }) {
  return (
    <section id="inicio" data-theme="dark" className={styles.hero}>
      <div className={styles.media}>
        <Image
          src="/images/profile/hero.webp"
          alt={t.photoAlt}
          fill
          preload
          sizes="100vw"
          className={styles.photo}
        />
        <div className={styles.shade} aria-hidden />
        <div className={styles.pattern} aria-hidden />
        <div className={`${styles.badge} ${styles.badgeMobile}`}>
          <span className={styles.dot} aria-hidden />
          {t.available}
        </div>
      </div>

      <div className={`container ${styles.content}`} data-reveal>
        <div className={styles.copy}>
          <div className={`${styles.badge} ${styles.badgeDesktop}`}>
            <span className={styles.dot} aria-hidden />
            {t.available}
          </div>
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
