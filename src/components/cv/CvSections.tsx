import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries/es";
import type { CvDictionary } from "@/i18n/dictionaries/cv/es";
import { marquee } from "@/data/cv";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { CopyEmail } from "./CopyEmail";
import styles from "./CvSections.module.css";

export function Figures({ items }: { items: CvDictionary["figures"] }) {
  return (
    <section>
      <dl className={`container ${styles.figuresGrid}`}>
        {items.map((item, index) => (
          <div key={item.text} className={styles.figure}>
            <span className={styles.figureIndex} aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
            <dt className={styles.figureValue}>{item.value}</dt>
            <dd className={styles.figureText}>{item.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** Decorative strip of technologies; the list is rendered twice so the loop has no seam. */
export function Marquee() {
  const run = marquee.map((item) => (
    <span key={item} className={styles.marqueeItem}>
      {item}
      <span className={styles.marqueeDiamond} />
    </span>
  ));
  return (
    <div className={styles.marquee} aria-hidden>
      <div className={styles.marqueeTrack}>
        <div className={styles.marqueeRun}>{run}</div>
        <div className={styles.marqueeRun}>{run}</div>
      </div>
    </div>
  );
}

type CvProjectsProps = {
  t: CvDictionary["projects"];
  /** Descriptions and link labels shared with the business site. */
  shared: Dictionary["projects"];
};

export function CvProjects({ t, shared }: CvProjectsProps) {
  return (
    <section id="proyectos" className={`section ${styles.projects}`}>
      <div className={`container ${styles.stack}`} data-reveal>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />
        <div className={styles.bento}>
          {projects.map((project) => (
            <article key={project.id} className={`${styles.tile} ${styles.shot} ${styles[project.size]}`}>
              <div className={styles.media}>
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes={project.size === "wide" ? "(max-width: 819px) 100vw, 780px" : "(max-width: 819px) 100vw, 390px"}
                  className={styles.image}
                />
              </div>
              <div className={styles.shotBody}>
                <div className={styles.titleRow}>
                  <h3 className={styles.name}>{project.name}</h3>
                  <span className={styles.kind}>{t.roles[project.id]}</span>
                </div>
                <p className={styles.text}>{shared.items[project.id]}</p>
                {project.link && (
                  <a href={project.link.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    {shared.links[project.link.kind]} <span aria-hidden>↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Approach({ t }: { t: CvDictionary["approach"] }) {
  return (
    <section id="enfoque" className="section">
      <div className={`container ${styles.stack}`} data-reveal>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />
        <ol className={styles.principles}>
          {t.items.map((item, index) => (
            <li key={item.title} className={styles.principle}>
              <span className={styles.principleIndex} aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.principleTitle}>{item.title}</h3>
              <p className={styles.text}>{item.text}</p>
            </li>
          ))}
        </ol>
        <ul className={styles.facts}>
          {t.facts.map((fact) => (
            <li key={fact.label} className={styles.fact}>
              <span className={styles.factLabel}>{fact.label}</span>
              <span className={styles.factTitle}>{fact.title}</span>
              <span className={styles.factText}>{fact.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Dark closing section, mirroring the hero. */
export function CvContact({ t }: { t: CvDictionary["contact"] }) {
  return (
    <section id="contacto" data-theme="dark" className={styles.contact}>
      <div className={styles.contactPattern} aria-hidden />
      <div className={`container ${styles.contactInner}`} data-reveal>
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h2 className={styles.contactTitle}>{t.title}</h2>
        <div className={styles.contactActions}>
          <CopyEmail email={site.email} labels={{ copy: t.copy, copied: t.copied, aria: t.copyLabel }} />
          <ButtonLink href={site.linkedin.url} variant="secondary" size="lg" external>
            LinkedIn <span aria-hidden>↗</span>
          </ButtonLink>
          <ButtonLink href={site.github.url} variant="secondary" size="lg" external>
            GitHub <span aria-hidden>↗</span>
          </ButtonLink>
          <ButtonLink href={encodeURI(site.cvPath)} size="lg" external>
            {t.cv}
          </ButtonLink>
        </div>
        <p className={styles.contactNote}>{t.note}</p>
      </div>
    </section>
  );
}
