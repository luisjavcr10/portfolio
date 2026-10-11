"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { BookingRequest } from "@/demos/core/components/BookingFlow";
import { Photo } from "@/demos/core/components/Photo";
import { Rich } from "@/demos/core/components/Rich";
import { addDays, capitalize, daysBetween, dayLabels, shortDate, weekdayDate } from "@/demos/core/dates";
import { fill, money } from "@/demos/core/format";
import { CountUp, prefersReducedMotion } from "@/demos/core/motion";
import { useDemoStore } from "@/demos/core/store";
import type { VetConfig } from "../config";
import { Icon } from "../icons";
import { nextEvent, patientById } from "../selectors";
import type { Patient, VetData } from "../types";
import styles from "./VetSite.module.css";

type VetSiteProps = {
  config: VetConfig;
  onBook: (request: BookingRequest) => void;
};

const ANY: BookingRequest = { serviceId: null, staffId: null };

/** Public site of the clinic: services, digital health card, team and booking. */
export function VetSite({ config, onBook }: VetSiteProps) {
  const { data, today } = useDemoStore<VetData>();
  const site = config.site;
  const featured = data ? patientById(data, site.carnet.patientId) : undefined;

  return (
    <div className={styles.site}>
      <Header config={config} onBook={() => onBook(ANY)} />
      <main>
        <Hero config={config} onBook={() => onBook(ANY)} patient={featured} today={today} />
        <Services config={config} onBook={(serviceId) => onBook({ serviceId, staffId: null })} />
        <Carnet config={config} onBook={() => onBook(ANY)} patient={featured} today={today} />
        <Team config={config} />
        <Numbers config={config} />
        <Testimonials config={config} />
        <Faq config={config} />
        <Location config={config} onBook={() => onBook(ANY)} />
      </main>
      <footer className={styles.footer}>
        <span>
          <strong>{config.name}</strong> · {site.footer.tagline}
        </span>
        <span>{site.footer.note}</span>
      </footer>
    </div>
  );
}

function Logo({ config }: { config: VetConfig }) {
  return (
    <>
      <span className={styles.logoMark} aria-hidden>
        <Icon name="paw" size={24} />
      </span>
      <span className={styles.logoText}>
        <span className={styles.logoName}>{config.name}</span>
        <span className={styles.logoSub}>{config.site.brandSub}</span>
      </span>
    </>
  );
}

/** Emergency line: a phone link when the clinic has a number, otherwise the location section. */
function emergencyHref(config: VetConfig) {
  const tel = config.site.emergency.tel;
  return tel ? `tel:${tel}` : "#ubicacion";
}

function Header({ config, onBook }: { config: VetConfig; onBook: () => void }) {
  const site = config.site;
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a href="#inicio" className={styles.logo}>
          <Logo config={config} />
        </a>
        <nav aria-label="Secciones" className={styles.nav}>
          {site.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className={styles.headerActions}>
          <a href={emergencyHref(config)} className={styles.call} aria-label={site.emergency.label}>
            <Icon name="phone" size={20} />
            <span className={styles.callNumber}>{site.emergency.display}</span>
          </a>
          <button type="button" className={`${styles.btn} ${styles.btnCoral} ${styles.btnSm}`} onClick={onBook}>
            {site.bookCta}
          </button>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */

const HERO_PAWS = Array.from({ length: 9 }, (_, i) => ({
  left: `${100 - i * 11.5}%`,
  top: `${i % 2 ? 26 : 2}px`,
  delay: `${(0.15 + i * 0.13).toFixed(2)}s`,
}));

function Hero({
  config,
  onBook,
  patient,
  today,
}: {
  config: VetConfig;
  onBook: () => void;
  patient?: Patient;
  today: string;
}) {
  const hero = config.site.hero;
  const next = patient ? nextEvent(patient, today) : undefined;

  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <a href={emergencyHref(config)} className={styles.badge} data-anim="rise">
            <span className={styles.pulse} aria-hidden />
            {hero.badge}
          </a>
          <h1 className={styles.heroTitle} data-anim="rise" style={{ animationDelay: ".08s" }}>
            <Rich text={hero.title} />
          </h1>
          <p className={styles.heroLead} data-anim="rise" style={{ animationDelay: ".16s" }}>
            {hero.lead}
          </p>
          <div className={styles.heroCtas}>
            <div className={styles.paws} aria-hidden>
              {HERO_PAWS.map((paw) => (
                <span key={paw.left} style={{ left: paw.left, top: paw.top }}>
                  <span style={{ animationDelay: paw.delay }}>
                    <Icon name="paw" size={26} />
                  </span>
                </span>
              ))}
            </div>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnCoral} ${styles.btnLg}`}
              data-anim="rise"
              style={{ animationDelay: "1.5s" }}
              onClick={onBook}
            >
              {hero.primaryCta}
              <Icon name="arrowRight" />
            </button>
            <a
              href="#servicios"
              className={`${styles.btn} ${styles.btnOutline} ${styles.btnLg}`}
              data-anim="rise"
              style={{ animationDelay: "1.6s" }}
            >
              {hero.secondaryCta}
            </a>
          </div>
          <div className={styles.heroMeta} data-anim="rise" style={{ animationDelay: "1.7s" }}>
            <span>
              <Icon name="star" size={20} className={styles.leafIcon} />
              <strong>{hero.rating.value}</strong> {hero.rating.text}
            </span>
            <span>
              <Icon name="clock" size={20} className={styles.leafIcon} />
              {hero.hours}
            </span>
          </div>
        </div>

        <div className={styles.heroMedia} data-anim="fade">
          <Photo
            photo={hero.photo}
            ratio="4 / 5"
            radius="var(--kv-r-xl)"
            sizes="(max-width: 700px) 100vw, 50vw"
            tone="muted"
            priority
            className={styles.heroPhoto}
          />
          <span className={styles.heroTag}>{hero.tag}</span>
          {patient && next && (
            <div className={styles.heroCard} data-anim="rise" style={{ animationDelay: "1.9s" }}>
              <span className={styles.heroCardIcon} aria-hidden>
                <Icon name="chat" />
              </span>
              <span className={styles.heroCardText}>
                <strong>{fill(hero.reminderTitle, { pet: patient.name, vaccine: next.label.toLowerCase() })}</strong>
                <span>{fill(hero.reminderText, { date: weekdayDate(addDays(next.date, -3)) })}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Services({ config, onBook }: { config: VetConfig; onBook: (serviceId: string) => void }) {
  const copy = config.site.services;
  return (
    <section id="servicios" className={styles.section}>
      <div className={styles.sectionHead}>
        <div>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h2 className={styles.h2}>{copy.title}</h2>
        </div>
        <p className={styles.sectionNote}>{copy.note}</p>
      </div>
      <div className={styles.serviceGrid}>
        {config.services.map((service) => {
          const item = copy.items[service.id];
          const price = `${service.from ? `${copy.from} ` : ""}${money(config.currency, service.price)}`;
          return (
            <button
              key={service.id}
              type="button"
              className={styles.serviceCard}
              onClick={() => onBook(service.id)}
            >
              <span className={styles.srOnly}>{fill(copy.bookLabel, { service: service.name, price })}</span>
              <span className={styles.serviceMedia}>
                {item.photo && (
                  <Photo
                    photo={item.photo}
                    sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 300px"
                    className={styles.servicePhoto}
                  />
                )}
                <span className={styles.serviceIcon} aria-hidden>
                  <Icon name={item.icon} size={26} />
                </span>
              </span>
              <span className={styles.serviceName}>
                <strong>{service.name}</strong>
                <span>{item.sub}</span>
              </span>
              <span className={styles.serviceDesc}>{item.desc}</span>
              <span className={styles.serviceFoot}>
                <span className={styles.price}>
                  {service.from && <span>{copy.from}</span>}
                  <strong>{money(config.currency, service.price)}</strong>
                </span>
                <span className={styles.duration}>
                  <Icon name="clock" size={16} />
                  {durationText(service.id, service.duration)}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/** Durations as the clinic says them ("Medio día", "3 × 30 min"). */
function durationText(serviceId: string, minutes: number) {
  if (serviceId === "esterilizacion") return "Medio día";
  if (serviceId === "cachorro") return "3 × 30 min";
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

/* ------------------------------------------------------------------ */

/**
 * Scroll progress (0–1) of an element through the viewport; jumps to 1 with reduced motion.
 * `ready` re-attaches once the element exists (it renders after the store loads).
 */
function useScrollProgress(ref: React.RefObject<HTMLElement | null>, ready: boolean) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || !ready) return;
    const reduced = prefersReducedMotion();
    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p = Math.max(0, Math.min(1, (vh * 0.85 - rect.top) / (rect.height * 0.85)));
      if (reduced) p = p > 0 ? 1 : 0;
      setProgress((current) => (Math.abs(current - p) > 0.008 || p === 1 || p === 0 ? p : current));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, ready]);
  return progress;
}

function Carnet({
  config,
  onBook,
  patient,
  today,
}: {
  config: VetConfig;
  onBook: () => void;
  patient?: Patient;
  today: string;
}) {
  const copy = config.site.carnet;
  const timelineRef = useRef<HTMLOListElement>(null);
  const progress = useScrollProgress(timelineRef, Boolean(patient));
  const next = patient ? nextEvent(patient, today) : undefined;
  // The card shows the history up to (and including) the next vaccine.
  const items = patient
    ? patient.events.filter((e) => e.done || e === next).sort((a, b) => a.date.localeCompare(b.date)).slice(-5)
    : [];

  return (
    <section id="carnet" className={styles.band}>
      <div className={`${styles.bandInner} ${styles.carnet}`}>
        <div>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h2 className={`${styles.h2} ${styles.h2Big}`}>{copy.title}</h2>
          <p className={styles.carnetText}>{copy.text}</p>
          <ul className={styles.checks}>
            {copy.bullets.map((bullet) => (
              <li key={bullet}>
                <span aria-hidden>
                  <Icon name="check" size={20} />
                </span>
                {bullet}
              </li>
            ))}
          </ul>
          <button type="button" className={`${styles.btn} ${styles.btnLeaf}`} onClick={onBook}>
            {copy.cta}
          </button>
        </div>

        <div className={styles.card} aria-busy={!patient}>
          {patient && next ? (
            <>
              <div className={styles.cardHead}>
                {patient.photo && (
                  <span className={styles.cardAvatar}>
                    <Photo
                      photo={{ src: patient.photo, alt: patient.name, hint: patient.name }}
                      ratio="1 / 1"
                      radius="50%"
                      sizes="68px"
                    />
                  </span>
                )}
                <span className={styles.cardName}>
                  <strong>
                    {patient.name}
                    <Icon name="paw" size={18} className={styles.leafIcon} />
                  </strong>
                  <span>
                    {patient.breed} · {patient.age} · {patient.weights?.at(-1)} kg
                  </span>
                </span>
                <span className={styles.cardNumber}>
                  {copy.cardLabel}
                  <br />
                  {patient.record}
                </span>
              </div>
              <div className={styles.cardNext}>
                <div>
                  <span className={styles.cardNextLabel}>{copy.nextLabel}</span>
                  <strong>{next.label}</strong>
                  <span>{capitalize(dayLabels(next.date, today).long)}</span>
                </div>
                <span className={styles.cardDays}>
                  {fill(copy.inDays, { days: String(daysBetween(today, next.date)) })}
                </span>
              </div>
              <p className={styles.cardReminder}>
                <Icon name="bell" />
                <span>
                  <Rich
                    text={fill(copy.reminder, {
                      owner: patient.owner.name.split(" ")[0],
                      date: dayLabels(addDays(next.date, -3), today).long,
                    })}
                  />
                </span>
              </p>
              <ol
                ref={timelineRef}
                className={styles.timeline}
                style={{ "--progress": progress.toFixed(3) } as CSSProperties}
              >
                {items.map((item, i) => {
                  const shown = progress >= (i + 0.4) / items.length;
                  const upcoming = item === next;
                  return (
                    <li key={item.id} data-shown={shown} data-next={upcoming}>
                      <span className={styles.dot} aria-hidden>
                        <Icon name={upcoming ? "clock" : "check"} size={16} />
                      </span>
                      <span className={styles.timelineText}>
                        <strong>{item.label}</strong>
                        <span>{upcoming ? copy.nextLabel : item.kind === "vacuna" ? "Vacuna" : "Desparasitación"}</span>
                      </span>
                      <span className={styles.timelineDate}>{shortDate(item.date)}</span>
                    </li>
                  );
                })}
              </ol>
            </>
          ) : (
            <div className={styles.cardSkeleton} />
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Team({ config }: { config: VetConfig }) {
  const copy = config.site.team;
  return (
    <section id="equipo" className={styles.section}>
      <p className={styles.eyebrow}>{copy.eyebrow}</p>
      <h2 className={`${styles.h2} ${styles.h2Spaced}`}>{copy.title}</h2>
      <div className={styles.teamGrid}>
        {config.staff.map((member) => (
          <article key={member.id} className={styles.teamCard}>
            <Photo photo={member.photo} ratio="1 / 1" radius="18px" sizes="(max-width: 600px) 100vw, 380px" />
            <div className={styles.teamText}>
              <h3>{member.name}</h3>
              <span className={styles.chip}>{member.role}</span>
              <p>{member.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Numbers({ config }: { config: VetConfig }) {
  const copy = config.site.numbers;
  return (
    <section aria-label={copy.label} className={styles.band}>
      <div className={`${styles.bandInner} ${styles.numbers}`}>
        {copy.items.map((item) => (
          <div key={item.label} className={styles.number}>
            <span className={styles.numberValue}>
              <CountUp value={item.value} prefix={item.prefix} decimals={item.decimals} />
              {item.star && <Icon name="star" size={40} />}
            </span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials({ config }: { config: VetConfig }) {
  const copy = config.site.testimonials;
  return (
    <section className={styles.section}>
      <p className={styles.eyebrow}>{copy.eyebrow}</p>
      <h2 className={`${styles.h2} ${styles.h2Spaced}`}>{copy.title}</h2>
      <div className={styles.quotes}>
        {copy.items.map((item) => (
          <figure key={item.who} className={styles.quote}>
            <span className={styles.stars} role="img" aria-label={copy.starsLabel}>
              {Array.from({ length: 5 }, (_, i) => (
                <Icon key={i} name="star" size={20} />
              ))}
            </span>
            <blockquote>“{item.quote}”</blockquote>
            <figcaption>
              <span className={styles.quotePhoto}>
                <Photo photo={item.photo} ratio="1 / 1" radius="18px" sizes="64px" />
              </span>
              <span>
                <strong>{item.who}</strong>
                <span>{item.detail}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Faq({ config }: { config: VetConfig }) {
  const copy = config.site.faq;
  return (
    <section id="preguntas" className={`${styles.section} ${styles.faqSection}`}>
      <h2 className={`${styles.h2} ${styles.h2Spaced}`}>{copy.title}</h2>
      <div className={styles.faq}>
        {copy.items.map((item, i) => (
          <details key={item.q} name="faq" open={i === 0}>
            <summary>
              {item.q}
              <span className={styles.faqIcon} aria-hidden>
                <Icon name="plus" />
              </span>
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Location({ config, onBook }: { config: VetConfig; onBook: () => void }) {
  const copy = config.site.location;
  const band = config.site.ctaBand;
  const { contact } = config;
  return (
    <section id="ubicacion" className={`${styles.section} ${styles.location}`}>
      <div className={styles.locationGrid}>
        <Photo photo={copy.photo} radius="var(--kv-r-lg)" sizes="(max-width: 760px) 100vw, 600px" className={styles.locationPhoto} />
        <div className={styles.visit}>
          <h2 className={styles.h2}>{copy.title}</h2>
          <div className={styles.visitRow}>
            <Icon name="pin" size={24} className={styles.leafIcon} />
            <div>
              <strong>
                {contact.address}, {contact.area}
              </strong>
              <span>{contact.city}</span>
            </div>
          </div>
          <div className={styles.visitRow}>
            <Icon name="clock" size={24} className={styles.leafIcon} />
            <dl className={styles.hours}>
              {copy.hours.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={styles.visitRow}>
            <Icon name="cross" size={24} className={styles.leafIcon} />
            <div>
              <strong>
                {copy.emergency}{" "}
                {config.site.emergency.tel ? (
                  <a href={`tel:${config.site.emergency.tel}`}>{config.site.emergency.display}</a>
                ) : (
                  config.site.emergency.display
                )}
              </strong>
              <span>
                {copy.instagram} <a href={contact.instagram.url}>{contact.instagram.handle}</a>
              </span>
            </div>
          </div>
          <a href={contact.mapsUrl} className={`${styles.btn} ${styles.btnOutline}`} target="_blank" rel="noopener noreferrer">
            <Icon name="directions" size={20} />
            {copy.mapsCta}
          </a>
        </div>
      </div>
      <div className={styles.ctaBand}>
        <div>
          <h2 className={styles.h2}>{band.title}</h2>
          <p>{band.text}</p>
        </div>
        <button type="button" className={`${styles.btn} ${styles.btnCoral} ${styles.btnLg}`} onClick={onBook}>
          {band.button}
        </button>
      </div>
    </section>
  );
}
