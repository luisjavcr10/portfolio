"use client";

import Image, { getImageProps } from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { addDays, weekday } from "@/demos/core/dates";
import { whatsappLink } from "@/demos/core/format";
import { coachName, sessionsOn, shortTime, useGymStore } from "../data";
import { CountUp, prefersReducedMotion, useReveal, useScrollScene } from "../motion";
import type { GymConfig } from "../types";
import styles from "./GymSite.module.css";

export type BookRequest = { classId?: string; date?: string; time?: string };

type Props = { config: GymConfig; onBook: (request: BookRequest) => void };

const WEEK = [1, 2, 3, 4, 5, 6, 0];
const WEEK_LABELS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const WEEK_LONG = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const SHORT_DAYS = ["D", "L", "Ma", "Mi", "J", "V", "S"];

function weekdaysText(days: number[]): string {
  if (days.length === 5 && [1, 2, 3, 4, 5].every((d) => days.includes(d))) return "L–V";
  return days.map((d) => SHORT_DAYS[d]).join("·");
}

/** Public FitMoche site ("Para tus clientes"). */
export function GymSite({ config, onBook }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const [plates, setPlates] = useState(0);
  const site = config.site;

  useReveal(root, "site");
  useScrollScene(root, useCallback((n: number) => setPlates(n), []), true);

  const book = (request: BookRequest = {}) => onBook(request);

  return (
    <div ref={root} className={styles.site}>
      <Header config={config} onBook={() => book()} />
      <Hero config={config} onBook={() => book()} />

      <Tape dir={1} rotate={-1.6} className={styles.tapeHero} />

      <section aria-label="Lo que nos mueve" className={styles.marquees}>
        <div className={styles.mqYellow}>
          <div data-mq-track="" className={styles.mqTrack}>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} aria-hidden={i > 0}>
                {site.marquee[0]}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.mqOutline} aria-hidden>
          <div data-mq-track="" className={styles.mqTrack}>
            {[0, 1, 2, 3].map((i) => (
              <span key={i}>{site.marquee[1]}</span>
            ))}
          </div>
        </div>
      </section>

      <Numbers config={config} />
      <Ecg path="M0 60 H380 L400 60 L414 38 L428 60 L446 60 L460 92 L478 4 L498 116 L514 60 L548 60 L566 44 L586 60 H780 L794 52 L806 60 H1200" label={site.numbers.bpm} />
      <Plans config={config} plates={plates} onBook={() => book()} />
      <Tape dir={-1} rotate={1.8} />
      <Classes config={config} onBook={book} />
      <Schedule config={config} onBook={book} />
      <Ecg path="M0 60 H260 L276 50 L290 60 H640 L660 60 L674 96 L692 6 L712 114 L728 60 L760 60 L778 42 L798 60 H1200" />
      <Coaches config={config} />
      <Results config={config} />
      <Testimonials config={config} />
      <Location config={config} />
      <Tape dir={1} rotate={-1.4} className={styles.tapeCta} />

      <section className={styles.cta} data-on-yellow="">
        <div className={styles.ctaPlate} aria-hidden>
          <Image src={site.cta.plate.src!} alt="" fill sizes="(max-width: 700px) 70vw, 640px" />
        </div>
        <h2 data-rise="" className={styles.ctaTitle}>
          {site.cta.title}
        </h2>
        <div className={styles.ctaRow}>
          <button type="button" data-magnet="" className={`${styles.btn} ${styles.btnBlack} ${styles.btnXl}`} onClick={() => book()}>
            {site.cta.button} <span aria-hidden>→</span>
          </button>
          <p>{site.cta.text}</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>
          <span className={styles.footerLogo}>
            FIT<span>MOCHE</span>
          </span>{" "}
          · {site.footer.tagline}
        </span>
        <span>{site.footer.note}</span>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Logo({ size = 26 }: { size?: number }) {
  return (
    <>
      <span aria-hidden className={styles.logoMark} style={{ width: size + 4, height: size + 4 }} />
      <span className={styles.logoText} style={{ fontSize: size }}>
        FIT<span>MOCHE</span>
      </span>
    </>
  );
}

function Header({ config, onBook }: { config: GymConfig; onBook: () => void }) {
  return (
    <header className={styles.header}>
      <a href="#top" aria-label={`${config.name}, inicio`} className={styles.brand}>
        <Logo />
      </a>
      <nav aria-label="Secciones" className={styles.nav}>
        {config.site.nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <button type="button" data-magnet="" className={`${styles.btn} ${styles.btnYellow} ${styles.btnSm}`} onClick={onBook}>
        {config.site.headerCta}
      </button>
    </header>
  );
}

function Hero({ config, onBook }: { config: GymConfig; onBook: () => void }) {
  const hero = config.site.hero;
  const common = { alt: "", sizes: "100vw", quality: 75 };
  const {
    props: { srcSet: mobileSet },
  } = getImageProps({ ...common, src: hero.image.mobile, width: 900, height: 1613 });
  const {
    props: { srcSet: desktopSet, ...desktop },
  } = getImageProps({ ...common, src: hero.image.desktop, width: 1920, height: 1071, fetchPriority: "high", loading: "eager" });

  const top = [...hero.titleTop.toUpperCase()];
  const bottom = [...hero.titleBottom.toUpperCase()];

  return (
    <section id="top" className={styles.hero}>
      <picture className={styles.heroImage}>
        <source media="(max-width: 700px)" srcSet={mobileSet} />
        <source media="(min-width: 701px)" srcSet={desktopSet} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps (decorative) */}
        <img {...desktop} />
      </picture>
      <div aria-hidden className={styles.heroShade} />
      <div aria-hidden className={styles.heroGlow} />
      <div aria-hidden className={styles.heroDots} />

      <div className={styles.heroContent}>
        <div className={`${styles.heroIn} ${styles.heroMeta}`} style={{ "--i": 0 } as CSSProperties}>
          <span className={styles.promo}>
            <span aria-hidden className={styles.promoStripes} />
            {hero.promo}
          </span>
          <span className={styles.mono}>{hero.address.toUpperCase()}</span>
        </div>
        <h1 aria-label={`${hero.titleTop} ${hero.titleBottom}`} className={styles.heroTitle}>
          <span aria-hidden className={styles.heroLine}>
            {top.map((ch, i) => (
              <span key={i} className={styles.letter} style={{ "--l": i } as CSSProperties}>
                {ch}
              </span>
            ))}
          </span>
          <span aria-hidden className={`${styles.heroLine} ${styles.yellow}`}>
            {bottom.map((ch, i) => (
              <span key={i} className={styles.letter} style={{ "--l": top.length + i } as CSSProperties}>
                {ch}
              </span>
            ))}
          </span>
        </h1>
        <div className={`${styles.heroIn} ${styles.heroRow}`} style={{ "--i": 1 } as CSSProperties}>
          <p className={styles.heroLead}>{hero.lead}</p>
          <div className={styles.heroCtas}>
            <button type="button" data-magnet="" className={`${styles.btn} ${styles.btnYellow} ${styles.btnLg} ${styles.glow}`} onClick={onBook}>
              {hero.primary} <span aria-hidden>→</span>
            </button>
            <a data-magnet="" href="#planes" className={`${styles.btn} ${styles.btnOutline} ${styles.btnLg}`}>
              {hero.secondary}
            </a>
          </div>
        </div>
        <ul className={`${styles.heroIn} ${styles.trust}`} style={{ "--i": 2 } as CSSProperties}>
          {hero.trust.map((item, i) => (
            <li key={item}>{i === 0 ? <TrustRating text={item} /> : item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TrustRating({ text }: { text: string }) {
  const [rating, rest] = text.split(" en ");
  return (
    <>
      <span className={styles.yellow}>{rating}</span> en {rest}
    </>
  );
}

function Tape({ dir, rotate, className = "" }: { dir: 1 | -1; rotate: number; className?: string }) {
  return (
    <div aria-hidden className={`${styles.tape} ${className}`} style={{ transform: `rotate(${rotate}deg)` }}>
      <div data-tape="" data-dir={dir} className={dir === 1 ? styles.tapeStripesA : styles.tapeStripesB} />
    </div>
  );
}

function Ecg({ path, label }: { path: string; label?: string }) {
  return (
    <div aria-hidden className={styles.ecg}>
      <svg viewBox="0 0 1200 120">
        <path data-ecg="" d={path} />
      </svg>
      {label && <span className={styles.bpm}>{label}</span>}
    </div>
  );
}

function SectionHead({ kicker, title, text, className = "" }: { kicker: string; title: string; text?: string; className?: string }) {
  return (
    <div data-rise="" className={`${styles.head} ${className}`}>
      <span className={styles.kicker}>{kicker}</span>
      <h2 className={styles.h2}>{title}</h2>
      {text && <p className={styles.headText}>{text}</p>}
    </div>
  );
}

function Numbers({ config }: { config: GymConfig }) {
  const n = config.site.numbers;
  return (
    <section id="numeros" className={styles.section}>
      <div aria-hidden className={styles.ghostNumber}>
        17
      </div>
      <div aria-hidden className={styles.dumbbell}>
        <Image src={config.site.decor.dumbbell.src!} alt="" fill sizes="320px" />
      </div>
      <SectionHead kicker={n.kicker} title={n.title} text={n.text} />
      <div className={styles.stats}>
        {n.stats.map((stat) => (
          <div key={stat.label} data-rise="" className={styles.stat}>
            <CountUp value={stat.value} prefix={stat.prefix} className={styles.statValue} />
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Plans({ config, plates, onBook }: { config: GymConfig; plates: number; onBook: () => void }) {
  const copy = config.site.plans;
  const plateShapes = [styles.plateA, styles.plateB, styles.plateC, styles.plateD];
  const bar = useRef<HTMLDivElement>(null);
  const previous = useRef(0);

  // Each new plate lands with a short hit on the bar and a bump on its card.
  useEffect(() => {
    const added = plates > previous.current;
    const index = plates - 1;
    previous.current = plates;
    if (!added || prefersReducedMotion()) return;
    const timer = setTimeout(() => {
      bar.current?.animate(
        [
          { transform: "none" },
          { transform: "translate(-3px,2px) rotate(-.7deg)" },
          { transform: "translate(3px,-1px) rotate(.5deg)" },
          { transform: "translate(-1px,1px)" },
          { transform: "none" },
        ],
        { duration: 220, easing: "linear" },
      );
      const card = bar.current?.closest("section")?.querySelectorAll<HTMLElement>("[data-plan-card]")[index];
      card?.animate([{ transform: "none" }, { transform: "translateY(-8px)" }, { transform: "none" }], {
        duration: 320,
        easing: "cubic-bezier(.34,1.56,.64,1)",
      });
    }, 360);
    return () => clearTimeout(timer);
  }, [plates]);

  return (
    <section id="planes" className={styles.section}>
      <div aria-hidden className={styles.ghostNumber} data-left="">
        02
      </div>
      <SectionHead kicker={copy.kicker} title={copy.title} text={copy.text} />
      <div className={styles.barWrap}>
        <div ref={bar} className={styles.bar}>
          <div className={styles.barShaft} />
          <div className={styles.barKnurl} />
          <div className={`${styles.barSleeve} ${styles.left}`} />
          <div className={`${styles.barSleeve} ${styles.right}`} />
          <div className={`${styles.barCollar} ${styles.left}`} />
          <div className={`${styles.barCollar} ${styles.right}`} />
          {(["left", "right"] as const).map((side) => (
            <div key={side} className={`${styles.plates} ${styles[side]}`}>
              {plateShapes.map((shape, i) => (
                <div key={i} className={`${styles.plate} ${shape}`} data-on={i < plates ? "" : undefined} style={{ "--d": `${i * 140}ms` } as CSSProperties} />
              ))}
            </div>
          ))}
        </div>
        <div className={styles.loadCount}>
          <span>{copy.loadLabel.toUpperCase()}</span>
          <span className={styles.yellow} aria-live="polite">
            {plates} / {config.plans.length} {copy.platesLabel.toUpperCase()}
          </span>
        </div>
      </div>
      <div className={styles.plans}>
        {config.plans.map((plan, i) => (
          <article
            key={plan.id}
            data-plan-card=""
            data-on-yellow={plan.featured ? "" : undefined}
            data-loaded={i < plates ? "" : undefined}
            className={`${styles.plan} ${plan.featured ? styles.planFeatured : ""}`}
          >
            <div className={styles.planFill} aria-hidden>
              <span />
            </div>
            <div className={styles.planTop}>
              <span className={styles.planName}>{plan.name}</span>
              {plan.badge ? (
                <span className={plan.featured ? styles.badgeBlack : styles.badgeOutline}>{plan.badge}</span>
              ) : (
                <span aria-hidden className={styles.planChip} />
              )}
            </div>
            <div className={styles.price}>
              <span className={styles.currency}>{config.currency.symbol}</span>
              <span className={styles.amount}>{plan.price}</span>
              <span className={styles.period}>{plan.period}</span>
            </div>
            <p className={styles.planBlurb}>{plan.blurb}</p>
            <ul className={styles.features}>
              {plan.features.map((f) => (
                <li key={f.text} data-off={f.included ? undefined : ""}>
                  <span aria-hidden />
                  {f.included ? f.text : <s>{f.text}</s>}
                </li>
              ))}
            </ul>
            <button
              type="button"
              data-magnet=""
              className={`${styles.btn} ${plan.featured ? `${styles.btnBlack} ${styles.btnLg}` : styles.btnOutline}`}
              onClick={onBook}
            >
              {plan.cta}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function Classes({ config, onBook }: { config: GymConfig; onBook: (r: BookRequest) => void }) {
  const copy = config.site.classes;
  const scheduleText = (id: string) =>
    config.schedule
      .filter((s) => s.classId === id)
      .map((s) => `${weekdaysText(s.weekdays)} ${shortTime(s.time)}`)
      .join(" · ");

  return (
    <section id="clases" data-pin="" className={styles.pin}>
      <div className={styles.pinSticky}>
        <div className={styles.pinHead}>
          <span className={styles.kicker}>{copy.kicker}</span>
          <h2 className={styles.h2Sm}>{copy.title}</h2>
        </div>
        <div data-pin-track="" className={styles.pinTrack}>
          {config.classes.map((c, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <article key={c.id} data-reveal="" className={styles.classCard}>
                <div data-ph="" className={styles.classPhoto}>
                  <Image src={c.photo.src!} alt="" fill sizes="(max-width: 700px) 80vw, 420px" />
                </div>
                <div aria-hidden className={styles.classShade} />
                <div data-wipe="" aria-hidden className={styles.classWipe}>
                  {num}
                </div>
                <span className={styles.classMeta}>
                  {num} · {c.duration} min
                </span>
                <h3 className={styles.className}>{c.name}</h3>
                <p className={styles.classDesc}>{c.description}</p>
                <div className={styles.classCoach}>
                  <strong>Coach {coachName(config, c.coachId)}</strong>
                  <span>{scheduleText(c.id)}</span>
                </div>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnYellow} ${styles.btnSm}`}
                  onClick={() => onBook({ classId: c.id })}
                  aria-label={`${copy.cta}: ${c.name}`}
                >
                  {copy.cta}
                </button>
              </article>
            );
          })}
          <article data-on-yellow="" className={styles.classClosing}>
            <span className={styles.mono}>{copy.closingKicker.toUpperCase()}</span>
            <h3>{copy.closingTitle}</h3>
            <button type="button" className={`${styles.btn} ${styles.btnBlack}`} onClick={() => onBook({})}>
              {copy.closingCta}
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}

function Schedule({ config, onBook }: { config: GymConfig; onBook: (r: BookRequest) => void }) {
  const { data } = useGymStore();
  const copy = config.site.schedule;
  const [filter, setFilter] = useState<string>("all");
  const today = data?.seededOn ?? "";
  const todayDow = today ? weekday(today) : -1;
  const filters = [{ id: "all", name: copy.all }, ...config.classes.map((c) => ({ id: c.id, name: c.name }))];

  return (
    <section id="horario" className={styles.section}>
      <SectionHead kicker={copy.kicker} title={copy.title} text={copy.text} />
      <div role="group" aria-label={copy.filterLabel} className={styles.filters}>
        {filters.map((f) => (
          <button key={f.id} type="button" aria-pressed={filter === f.id} className={styles.chip} onClick={() => setFilter(f.id)}>
            {f.name}
          </button>
        ))}
      </div>
      <div className={styles.weekScroll}>
        <div className={styles.week}>
          {WEEK.map((dow) => {
            // Each column is the next occurrence of that weekday (today included).
            const date = today ? addDays(today, (dow - todayDow + 7) % 7) : "";
            const sessions = data && date ? sessionsOn(config, data, date, filter === "all" ? undefined : filter) : [];
            const isToday = dow === todayDow;
            return (
              <div key={dow} className={styles.day}>
                <div className={styles.dayHead} data-today={isToday ? "" : undefined}>
                  <span>{WEEK_LABELS[dow]}</span>
                  {isToday && <span className={styles.todayPill}>{copy.today.toUpperCase()}</span>}
                </div>
                {!data && <span className={styles.slotSkeleton} aria-hidden />}
                {sessions.map((s) => {
                  const c = config.classes.find((x) => x.id === s.classId)!;
                  const full = s.free === 0;
                  const few = !full && s.free <= 5;
                  const seats = full ? "Lleno" : s.free === 1 ? "Queda 1 cupo" : few ? `Quedan ${s.free} cupos` : `${s.free} cupos libres`;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      disabled={full}
                      className={styles.slot}
                      data-few={few ? "" : undefined}
                      aria-label={`${c.name} ${WEEK_LONG[dow]} ${shortTime(s.time)}, ${coachName(config, c.coachId)}, ${seats}`}
                      onClick={() => onBook({ classId: s.classId, date: s.date, time: s.time })}
                    >
                      <span className={styles.slotTime}>{shortTime(s.time)}</span>
                      <span className={styles.slotName}>{c.name}</span>
                      <span className={styles.slotCoach}>{coachName(config, c.coachId)}</span>
                      <span className={styles.slotSeats}>{seats}</span>
                    </button>
                  );
                })}
                {data && !sessions.length && <span className={styles.noClasses}>{copy.empty}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Coaches({ config }: { config: GymConfig }) {
  const copy = config.site.coaches;
  return (
    <section id="coaches" className={styles.section}>
      <SectionHead kicker={copy.kicker} title={copy.title} />
      <div className={styles.coaches}>
        {config.coaches.map((coach) => (
          <article key={coach.id} data-rise="" className={styles.coach}>
            <div className={styles.coachPhoto} tabIndex={0} aria-label={`Coach ${coach.name}, ${coach.specialty}`}>
              <Image src={coach.photo.src!} alt={coach.photo.alt} fill sizes="(max-width: 640px) 90vw, 320px" />
              <span aria-hidden className={styles.coachTint} />
            </div>
            <div className={styles.coachHead}>
              <h3>{coach.name}</h3>
              <span>{coach.specialty}</span>
            </div>
            <p>{coach.bio}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Results({ config }: { config: GymConfig }) {
  const copy = config.site.results;
  const [index, setIndex] = useState(0);
  const [split, setSplit] = useState(50);
  const result = config.results[index];
  if (!result) return null;

  return (
    <section id="resultados" className={`${styles.section} ${styles.carbon}`}>
      <div className={styles.split}>
        <div data-rise="" className={styles.resultsText}>
          <span className={styles.kicker}>{copy.kicker}</span>
          <h2 className={styles.h2}>{copy.title}</h2>
          {config.results.length > 1 && (
            <div role="group" aria-label="Elegir socio" className={styles.filters}>
              {config.results.map((r, i) => (
                <button
                  key={r.id}
                  type="button"
                  aria-pressed={i === index}
                  className={styles.chip}
                  onClick={() => {
                    setIndex(i);
                    setSplit(50);
                  }}
                >
                  {r.name.split(",")[0]}
                </button>
              ))}
            </div>
          )}
          <div className={styles.resultStat}>
            <span>{result.stat}</span>
            <strong>
              {result.name} · {result.time}
            </strong>
            <small>
              {result.plan} · {result.how}
            </small>
          </div>
        </div>
        <div className={styles.compare}>
          <div className={styles.compareLayer}>
            <Image src={result.after.src!} alt={result.after.alt} fill sizes="(max-width: 900px) 90vw, 600px" />
            <span className={`${styles.compareTag} ${styles.after}`}>{copy.after.toUpperCase()}</span>
          </div>
          <div className={styles.compareLayer} style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
            <Image src={result.before.src!} alt={result.before.alt} fill sizes="(max-width: 900px) 90vw, 600px" />
            <span className={`${styles.compareTag} ${styles.before}`}>{copy.before.toUpperCase()}</span>
          </div>
          <div aria-hidden className={styles.compareHandle} style={{ left: `${split}%` }}>
            <span />
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={split}
            onChange={(e) => setSplit(Number(e.target.value))}
            aria-label={copy.compareLabel}
            aria-valuetext={`${split}% ${copy.before.toLowerCase()}`}
            className={styles.compareRange}
          />
        </div>
      </div>
    </section>
  );
}

function Testimonials({ config }: { config: GymConfig }) {
  const copy = config.site.testimonials;
  const initials = (name: string) =>
    name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  return (
    <section id="testimonios" className={styles.section}>
      <div data-rise="" className={styles.testiHead}>
        <div className={styles.head}>
          <span className={styles.kicker}>{copy.kicker}</span>
          <h2 className={styles.h2}>{copy.title}</h2>
        </div>
        <div className={styles.rating}>
          <span className={styles.ratingScore}>{config.rating.score}</span>
          <span>
            <span className={styles.stars} aria-label={`${config.rating.score} de 5 estrellas`}>
              ★★★★★
            </span>
            <span>
              {config.rating.reviews} {copy.reviewsLabel}
            </span>
          </span>
        </div>
      </div>
      <div className={styles.testimonials}>
        {config.testimonials.map((t, i) => (
          <figure key={t.name} data-rise="" className={styles.testimonial} data-on-yellow={i === 1 ? "" : undefined}>
            <span className={styles.testiResult}>{t.result}</span>
            <blockquote>“{t.quote}”</blockquote>
            <figcaption>
              <span aria-hidden className={styles.avatar}>
                {initials(t.name)}
              </span>
              <span>
                <strong>{t.name}</strong>
                <small>{t.meta}</small>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Location({ config }: { config: GymConfig }) {
  const copy = config.site.location;
  const { contact } = config;
  const hours = (open: string, close: string) => `${shortTime(open)} – ${shortTime(close)}`;
  return (
    <section id="ubicacion" className={`${styles.section} ${styles.carbon}`}>
      <div className={styles.split}>
        <div className={styles.locationPhoto}>
          <Image src={copy.image.src!} alt={copy.image.alt} fill sizes="(max-width: 900px) 90vw, 700px" />
          <div className={styles.locationBadge}>
            <span aria-hidden className={styles.pulse} />
            <span>{copy.badge.toUpperCase()}</span>
          </div>
        </div>
        <div data-rise="" className={styles.locationText}>
          <span className={styles.kicker}>{copy.kicker}</span>
          <h2 className={styles.h2Md}>{copy.title}</h2>
          <dl className={styles.hours}>
            {config.hours.map((h) => (
              <div key={h.label}>
                <dt>{h.label}</dt>
                <dd>{hours(h.open, h.close)}</dd>
              </div>
            ))}
          </dl>
          <div className={styles.contactRow}>
            <a
              data-magnet=""
              href={whatsappLink(contact.whatsapp.message, contact.whatsapp.number)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnYellow}`}
            >
              WhatsApp {contact.whatsapp.display}
            </a>
            <a data-magnet="" href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnOutline}`}>
              Cómo llegar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
