import { formatTime, parseTime } from "@/demos/core/dates";
import { durationLabel, priceLabel, whatsappLink } from "@/demos/core/format";
import type { BookingRequest } from "@/demos/core/components/BookingFlow";
import { Photo } from "@/demos/core/components/Photo";
import { Rich } from "@/demos/core/components/Rich";
import ui from "@/demos/core/ui.module.css";
import type { TenantConfig } from "@/demos/core/types";
import type { SalonSiteCopy } from "../config";
import styles from "./SalonSite.module.css";

type SalonSiteProps = {
  config: TenantConfig<SalonSiteCopy>;
  /** Opens the booking flow; undefined when the booking module is off. */
  onBook?: (request: BookingRequest) => void;
};

/** Public website of the salon ("Para tus clientes"). */
export function SalonSite({ config, onBook }: SalonSiteProps) {
  const { site, contact } = config;
  const book = (request: BookingRequest = { serviceId: null, staffId: null }) => onBook?.(request);

  return (
    <div className={styles.site}>
      <header className={styles.header}>
        <div className={styles.headerBar}>
          <a href="#top" className={styles.brand}>
            <span className={styles.brandName}>{config.name}</span>
            <span className={styles.brandTagline}>{config.tagline}</span>
          </a>
          <nav className={styles.nav} aria-label="Secciones">
            {site.nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          {onBook && (
            <button type="button" className={`${ui.btn} ${ui.primary}`} onClick={() => book()}>
              {site.bookCta}
            </button>
          )}
        </div>
      </header>

      <main>
        {/* Hero */}
        <section id="top" className={`${styles.section} ${styles.hero}`}>
          <div className={styles.heroCopy}>
            <span className={ui.eyebrow}>{site.hero.eyebrow}</span>
            <h1 className={`${ui.display} ${styles.heroTitle}`}>
              <Rich text={site.hero.title} />
            </h1>
            <p className={styles.heroLead}>{site.hero.lead}</p>
            <div className={styles.actions}>
              {onBook && (
                <button type="button" className={`${ui.btn} ${ui.lg} ${ui.primary}`} onClick={() => book()}>
                  {site.hero.primaryCta}
                </button>
              )}
              <a href="#servicios" className={`${ui.btn} ${ui.lg} ${ui.outline}`}>
                {site.hero.secondaryCta}
              </a>
            </div>
          </div>
          <div className={styles.heroMedia}>
            <Photo
              photo={site.hero.mainPhoto}
              ratio="4 / 5"
              radius="999px 999px 36px 36px"
              sizes="(max-width: 900px) 90vw, 560px"
              labelAlign="end"
              priority
              className={styles.heroPhoto}
            />
            <Photo
              photo={site.hero.detailPhoto}
              ratio="1"
              radius="50%"
              sizes="220px"
              tone="accent"
              labelAlign="center"
              className={styles.heroDetail}
            />
          </div>
        </section>

        {/* Trust */}
        <section className={styles.section} aria-label="Confianza">
          <ul className={styles.trust}>
            {site.trust.map((item) => (
              <li key={item.label}>
                <span className={styles.trustValue}>
                  {item.value}
                  {item.star && (
                    <span className={styles.star} aria-label="estrellas">
                      {" "}★
                    </span>
                  )}
                </span>
                <span className={styles.trustLabel}>{item.label}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Services */}
        <section id="servicios" className={`${styles.section} ${styles.block}`} aria-labelledby="servicios-title">
          <div className={styles.sectionHead}>
            <div className={styles.headingGroup}>
              <span className={ui.eyebrow}>{site.services.eyebrow}</span>
              <h2 id="servicios-title" className={`${ui.display} ${styles.h2}`}>
                <Rich text={site.services.title} />
              </h2>
            </div>
            <p className={styles.sideNote}>{site.services.note}</p>
          </div>
          <div className={styles.services}>
            {config.categories.map((category) => (
              <article key={category.id} className={styles.serviceCard}>
                <Photo
                  photo={category.photo}
                  ratio="5 / 4"
                  radius="999px 999px 22px 22px"
                  sizes="(max-width: 640px) 90vw, 300px"
                />
                <div className={styles.serviceHead}>
                  <div className={styles.serviceTitleRow}>
                    <h3>{category.name}</h3>
                    <span>{category.kicker}</span>
                  </div>
                  <p>{category.blurb}</p>
                </div>
                <ul className={styles.serviceList}>
                  {config.services
                    .filter((s) => s.categoryId === category.id)
                    .map((s) => (
                      <li key={s.id}>
                        <div>
                          <strong>{s.name}</strong>
                          <span>
                            {priceLabel(config.currency, s)} · {durationLabel(s.duration)}
                          </span>
                        </div>
                        {onBook && (
                          <button
                            type="button"
                            className={`${ui.btn} ${ui.outlinePrimary} ${styles.smallBtn}`}
                            onClick={() => book({ serviceId: s.id, staffId: null })}
                            aria-label={`${site.services.bookLabel} ${s.name}`}
                          >
                            {site.services.bookLabel}
                          </button>
                        )}
                      </li>
                    ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Team */}
        <section id="equipo" className={`${styles.section} ${styles.block}`} aria-labelledby="equipo-title">
          <div className={styles.headingGroup}>
            <span className={ui.eyebrow}>{site.team.eyebrow}</span>
            <h2 id="equipo-title" className={`${ui.display} ${styles.h2}`}>
              <Rich text={site.team.title} />
            </h2>
          </div>
          <div className={styles.team}>
            {config.staff.map((member) => (
              <article key={member.id} className={styles.member}>
                <Photo
                  photo={member.photo}
                  ratio="3 / 4"
                  radius="999px 999px 28px 28px"
                  sizes="(max-width: 640px) 90vw, 280px"
                  labelAlign="center"
                />
                <div className={styles.memberText}>
                  <h3>{member.name}</h3>
                  <span className={styles.memberRole}>{member.role}</span>
                  <span>{member.bio}</span>
                </div>
                {onBook && (
                  <button
                    type="button"
                    className={`${ui.btn} ${ui.outline} ${styles.memberBtn}`}
                    onClick={() => book({ serviceId: null, staffId: member.id })}
                  >
                    {site.team.ctaPrefix} {member.name}
                  </button>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Work */}
        <section id="trabajos" className={`${styles.section} ${styles.block}`} aria-labelledby="trabajos-title">
          <div className={`${styles.sectionHead} ${styles.tight}`}>
            <div className={styles.headingGroup}>
              <span className={ui.eyebrow}>{site.work.eyebrow}</span>
              <h2 id="trabajos-title" className={`${ui.display} ${styles.h2}`}>
                <Rich text={site.work.title} />
              </h2>
            </div>
            <a href={contact.instagram.url} target="_blank" rel="noopener noreferrer" className={styles.instagram}>
              {contact.instagram.handle} →
            </a>
          </div>
          <div className={styles.gallery}>
            <div className={styles.beforeAfter}>
              <Photo
                photo={site.work.before}
                ratio="4 / 5"
                radius="28px 6px 6px 28px"
                sizes="(max-width: 900px) 45vw, 560px"
                className={styles.compare}
              />
              <Photo
                photo={site.work.after}
                ratio="4 / 5"
                radius="6px 28px 28px 6px"
                sizes="(max-width: 900px) 45vw, 560px"
                tone="accent"
                labelAlign="end"
                className={styles.compare}
              />
            </div>
            {site.work.gallery.map((photo) => (
              <Photo key={photo.hint} photo={photo} ratio="1" radius="22px" sizes="(max-width: 640px) 45vw, 280px" />
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className={`${styles.section} ${styles.block}`} aria-labelledby="opiniones-title">
          <div className={`${styles.headingGroup} ${styles.headSpace}`}>
            <span className={ui.eyebrow}>{site.testimonials.eyebrow}</span>
            <h2 id="opiniones-title" className={`${ui.display} ${styles.h2}`}>
              <Rich text={site.testimonials.title} />
            </h2>
          </div>
          <div className={styles.quotes}>
            {site.testimonials.items.map((item, i) => (
              <figure key={item.author} className={`${styles.quote} ${styles[`quote${i % 3}`]}`}>
                <blockquote>“{item.quote}”</blockquote>
                <figcaption>
                  <strong>{item.author}</strong> · {item.service}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className={`${styles.section} ${styles.block}`} aria-labelledby="pasos-title">
          <div className={`${styles.headingGroup} ${styles.headSpace}`}>
            <span className={ui.eyebrow}>{site.steps.eyebrow}</span>
            <h2 id="pasos-title" className={`${ui.display} ${styles.h2}`}>
              <Rich text={site.steps.title} />
            </h2>
          </div>
          <ol className={styles.steps}>
            {site.steps.items.map((item, i) => (
              <li key={item.title}>
                <span className={styles.stepNumber}>{String(i + 1).padStart(2, "0")}</span>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </li>
            ))}
          </ol>
          {onBook && (
            <button type="button" className={`${ui.btn} ${ui.lg} ${ui.accent} ${styles.stepsCta}`} onClick={() => book()}>
              {site.steps.cta}
            </button>
          )}
        </section>

        {/* Location */}
        <section id="ubicacion" className={`${styles.section} ${styles.block}`} aria-labelledby="ubicacion-title">
          <div className={styles.location}>
            <div className={styles.locationText}>
              <span className={ui.eyebrow}>{site.location.eyebrow}</span>
              <h2 id="ubicacion-title" className={`${ui.display} ${styles.locationTitle}`}>
                {contact.address}, Urb. {contact.area}
              </h2>
              <dl className={styles.hours}>
                {config.hours.map((hours) => (
                  <div key={hours.label}>
                    <dt>{hours.label}</dt>
                    <dd>
                      {formatTime(parseTime(hours.open))} – {formatTime(parseTime(hours.close))}
                    </dd>
                  </div>
                ))}
                <div>
                  <dt>WhatsApp</dt>
                  <dd>{contact.whatsapp.display}</dd>
                </div>
                <div>
                  <dt>Instagram</dt>
                  <dd>{contact.instagram.handle}</dd>
                </div>
              </dl>
              <div className={styles.actions}>
                <a
                  href={whatsappLink(contact.whatsapp.message, contact.whatsapp.number)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${ui.btn} ${ui.md} ${ui.primary}`}
                >
                  {site.location.whatsappCta}
                </a>
                <a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${ui.btn} ${ui.md} ${ui.outline}`}
                >
                  {site.location.mapsCta}
                </a>
              </div>
            </div>
            <div className={styles.map}>
              <Photo
                photo={site.location.map}
                radius="28px"
                sizes="(max-width: 900px) 90vw, 560px"
                tone="base"
                className={styles.mapPhoto}
              />
              <span className={styles.pin} aria-hidden />
            </div>
          </div>
        </section>
      </main>

      <footer className={`${styles.section} ${styles.footer}`}>
        <div className={styles.footerBrand}>
          <span className={styles.footerName}>{config.name}</span>
          <span>
            {config.tagline.split(" · ")[0]} · {contact.address}, {contact.city} · {contact.whatsapp.display}
          </span>
        </div>
        <span className={styles.footerNote}>{site.footer.note}</span>
      </footer>
    </div>
  );
}
