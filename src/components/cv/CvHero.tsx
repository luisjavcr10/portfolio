import Image from "next/image";
import type { CvDictionary } from "@/i18n/dictionaries/cv/es";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { DownloadIcon } from "./icons";
import { LimaClock } from "./LimaClock";
import styles from "./CvHero.module.css";

/**
 * Always dark, like the business site's hero (the photo is a night shot). On top of it: a "now" card
 * over the lower right of the photo and an editor-style status bar along the bottom.
 */
export function CvHero({ t }: { t: CvDictionary["hero"] }) {
  return (
    <section id="inicio" data-theme="dark" className={styles.hero}>
      <div className={styles.media}>
        <Image src="/images/profile/hero.webp" alt={t.photoAlt} fill preload sizes="100vw" className={styles.photo} />
        <div className={styles.shade} aria-hidden />
        <div className={styles.pattern} aria-hidden />
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.copy} data-reveal>
          <p className={styles.prompt}>
            <span className={styles.promptSign} aria-hidden>
              &gt;
            </span>{" "}
            {t.prompt}
            <span className={styles.cursor} aria-hidden />
          </p>
          <h1 className={styles.title}>
            {t.titleStart}
            <span className={styles.accent}>{t.titleAccent}</span>
            {t.titleEnd}
          </h1>
          <p className={styles.lead}>{t.lead}</p>
          <div className={styles.actions}>
            <ButtonLink href={encodeURI(site.cvPath)} external>
              <DownloadIcon /> {t.primaryCta}
            </ButtonLink>
            <ButtonLink href="#trayectoria" variant="secondary">
              {t.secondaryCta}{" "}
              <span className={styles.arrowDown} aria-hidden>
                ↓
              </span>
            </ButtonLink>
          </div>
        </div>

        <aside className={styles.now} aria-label={t.now.label}>
          <div className={styles.nowLabel}>
            <span className={styles.pulse} aria-hidden />
            {t.now.label}
          </div>
          <p className={styles.nowTitle}>{t.now.title}</p>
          <p className={styles.nowText}>{t.now.text}</p>
          <p className={styles.nowStack}>{t.now.stack}</p>
        </aside>
      </div>

      <div className={styles.status}>
        <div className={`container ${styles.statusInner}`}>
          <span className={styles.statusOpen}>
            <span className={styles.dot} aria-hidden />
            {t.status.open}
          </span>
          {t.status.items.map((item) => (
            <span key={item}>{item}</span>
          ))}
          <span className={styles.statusPlace}>
            {t.status.place}
            <LimaClock />
          </span>
        </div>
      </div>
    </section>
  );
}
