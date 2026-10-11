import type { Dictionary } from "@/i18n/dictionaries/es";
import { site } from "@/data/site";
import { ContactTrigger } from "@/components/contact/ContactPanel";
import { buttonClass } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import styles from "./Contact.module.css";

export function Contact({ t }: { t: Dictionary["contact"] }) {
  return (
    <section id="contacto" className={`section ${styles.section}`}>
      <div className="container" data-reveal>
        <div className={styles.card}>
          <div className={styles.fret} aria-hidden />
          <div className={styles.glow} aria-hidden />
          <div className={styles.intro}>
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h2 className={styles.title}>{t.title}</h2>
            <p className={styles.lead}>{t.lead}</p>
          </div>
          <div className={styles.actions}>
            <ContactTrigger className={buttonClass("primary")}>
              {t.cta} <span aria-hidden>→</span>
            </ContactTrigger>
            <div className={styles.links}>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={site.linkedin.url} target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
