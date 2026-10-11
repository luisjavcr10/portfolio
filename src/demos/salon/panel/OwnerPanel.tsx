"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { addDays, capitalize, dayLabels, formatTime, relativeDay, shortDate } from "@/demos/core/dates";
import { fill, firstName, formatPhone, money, priceLabel, whatsappLink } from "@/demos/core/format";
import { afternoonGaps, lapsedClients, percentChange, topServices, weekRevenue, weeklySeries } from "@/demos/core/metrics";
import { appointmentsOn, getService, getStaff, hoursFor } from "@/demos/core/schedule";
import { useDemoStore } from "@/demos/core/store";
import type { Appointment, CategoryTone, DemoData, TenantConfig } from "@/demos/core/types";
import { Agenda } from "@/demos/core/components/Agenda";
import { Kpi, KpiGrid } from "@/demos/core/components/Kpi";
import { useToast } from "@/demos/core/components/Toast";
import ui from "@/demos/core/ui.module.css";
import type { SalonSiteCopy } from "../config";
import styles from "./OwnerPanel.module.css";

type Tab = "hoy" | "agenda" | "clientes" | "ventas";

type OwnerPanelProps = {
  config: TenantConfig<SalonSiteCopy>;
  /** Appointment just booked from the site: show the sync state, then highlight it. */
  arrivalId: string | null;
  onTryBooking: () => void;
};

const SYNC_MS = 950;
const GLOW_MS = 3400;

/** Owner photo, or her initial when the config has none. */
function OwnerAvatar({ owner, decorative = false }: { owner: TenantConfig["owner"]; decorative?: boolean }) {
  const label = `${owner.name}, ${owner.role}`;
  if (owner.photo?.src)
    return (
      <Image
        src={owner.photo.src}
        alt={decorative ? "" : label}
        width={40}
        height={40}
        className={styles.avatar}
        style={owner.photo.position ? { objectPosition: owner.photo.position } : undefined}
      />
    );
  return decorative ? (
    <span className={styles.avatar} aria-hidden>
      {owner.name.charAt(0)}
    </span>
  ) : (
    <span className={styles.avatar} role="img" aria-label={label}>
      {owner.name.charAt(0)}
    </span>
  );
}

/** Business owner's system ("Para ti"). */
export function OwnerPanel({ config, arrivalId, onTryBooking }: OwnerPanelProps) {
  const { data, today } = useDemoStore();
  const copy = config.site.panel;
  const [tab, setTab] = useState<Tab>("hoy");
  const [syncing, setSyncing] = useState(Boolean(arrivalId));
  const [glow, setGlow] = useState(false);

  // Simulated sync, then reveal and highlight the new booking.
  useEffect(() => {
    if (!arrivalId) return;
    const timers = [
      setTimeout(() => {
        setSyncing(false);
        setGlow(true);
      }, SYNC_MS),
      setTimeout(() => setGlow(false), SYNC_MS + GLOW_MS),
    ];
    return () => timers.forEach(clearTimeout);
  }, [arrivalId]);

  const tabs: { id: Tab; label: string; enabled: boolean }[] = [
    { id: "hoy", label: copy.tabs.hoy, enabled: true },
    { id: "agenda", label: copy.tabs.agenda, enabled: true },
    { id: "clientes", label: copy.tabs.clientes, enabled: config.modules.clientes },
    { id: "ventas", label: copy.tabs.ventas, enabled: config.modules.ventas },
  ];
  const visibleTabs = tabs.filter((t) => t.enabled);
  const latest = data?.appointments.find((a) => a.id === data.lastBookingId) ?? null;
  const pendingBadge = latest?.status === "booked";

  function selectTab(id: Tab) {
    setTab(id);
    window.scrollTo({ top: 0 });
  }

  const ready = data && !syncing;
  const titles: Record<Tab, string> = {
    hoy: config.owner.greeting,
    agenda: copy.tabs.agenda,
    clientes: copy.tabs.clientes,
    ventas: copy.tabs.ventas,
  };

  return (
    <div className={styles.panel}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.brandName}>{config.name}</span>
          <span className={styles.brandSub}>{copy.subtitle}</span>
        </div>
        <nav aria-label={copy.navLabel} className={styles.sideNav}>
          {visibleTabs.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-current={tab === t.id ? "page" : undefined}
              className={styles.sideLink}
              onClick={() => selectTab(t.id)}
            >
              <span>{t.label}</span>
              {t.id === "hoy" && pendingBadge && (
                <span className={styles.badge} aria-label="1 reserva nueva">
                  1
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className={styles.profile}>
          <OwnerAvatar owner={config.owner} decorative />
          <span className={styles.profileText}>
            <strong>{config.owner.name}</strong>
            <span>{config.owner.role}</span>
          </span>
        </div>
      </aside>

      <header className={styles.mobileHeader}>
        <span className={styles.brandName}>{config.name}</span>
        <OwnerAvatar owner={config.owner} />
      </header>

      <main className={styles.main} id="panel">
        <div className={styles.content}>
          <div className={styles.pageHead}>
            <div className={styles.pageTitle}>
              {/* The date comes from the browser's store so server and client never disagree. */}
              <span>{today ? capitalize(dayLabels(today, today).long) : "\u00a0"}</span>
              <h1>{titles[tab]}</h1>
            </div>
            {tab === "hoy" && ready && <TodaySummary config={config} data={data} today={today} />}
          </div>

          {!ready ? (
            <div className={styles.loading} aria-busy="true" aria-label={copy.loading}>
              <div className={ui.skeleton} style={{ height: 150 }} />
              <div className={styles.loadingGrid}>
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className={ui.skeleton} style={{ height: 120, animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
              <div className={ui.skeleton} style={{ height: 360 }} />
              <span className={styles.loadingText}>{copy.loading}</span>
            </div>
          ) : (
            <div className={styles.stack}>
              {tab === "hoy" && config.modules.reservas &&
                (latest ? (
                  <NewBookingCard config={config} appointment={latest} today={today} glow={glow} focusOnMount={arrivalId === latest.id} />
                ) : (
                  <div className={styles.empty}>
                    <div>
                      <strong>{copy.empty.title}</strong>
                      <span>{copy.empty.text}</span>
                    </div>
                    <button type="button" className={`${ui.btn} ${ui.outlinePrimary} ${styles.btn48}`} onClick={onTryBooking}>
                      {copy.empty.cta}
                    </button>
                  </div>
                ))}

              {(tab === "hoy" || tab === "ventas") && <Kpis config={config} data={data} today={today} />}

              {(tab === "hoy" || tab === "agenda") && (
                <AgendaSection
                  config={config}
                  data={data}
                  today={today}
                  highlightId={arrivalId}
                  initialDay={arrivalId ? (data.appointments.find((a) => a.id === arrivalId)?.date ?? today) : today}
                />
              )}

              {(tab === "hoy" || tab === "ventas" || tab === "clientes") && (
                <div className={styles.split}>
                  {config.modules.ventas && (tab === "hoy" || tab === "ventas") && (
                    <SalesSection config={config} data={data} today={today} />
                  )}
                  {config.modules.clientes && (tab === "hoy" || tab === "clientes") && (
                    <LapsedSection config={config} data={data} today={today} />
                  )}
                </div>
              )}

              {config.modules.recordatorios && (tab === "hoy" || tab === "agenda") && (
                <RemindersSection config={config} data={data} today={today} />
              )}
            </div>
          )}
        </div>
      </main>

      <nav aria-label={copy.navLabel} className={styles.bottomNav}>
        {visibleTabs.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-current={tab === t.id ? "page" : undefined}
            className={styles.bottomLink}
            onClick={() => selectTab(t.id)}
          >
            <span className={styles.dot} aria-hidden />
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

type SectionProps = { config: TenantConfig<SalonSiteCopy>; data: DemoData; today: string };

function TodaySummary({ config, data, today }: SectionProps) {
  const hours = hoursFor(config, today);
  return (
    <span className={styles.summary}>
      {fill(config.site.panel.todaySummary, {
        appointments: String(appointmentsOn(data.appointments, today).length),
        staff: String(config.staff.length),
        close: hours ? formatTime(hours.close) : "—",
      })}
    </span>
  );
}

function NewBookingCard({
  config,
  appointment,
  today,
  glow,
  focusOnMount,
}: {
  config: TenantConfig<SalonSiteCopy>;
  appointment: Appointment;
  today: string;
  glow: boolean;
  focusOnMount: boolean;
}) {
  const { confirm } = useDemoStore();
  const toast = useToast();
  const copy = config.site.panel.newBooking;
  const ref = useRef<HTMLElement>(null);
  const service = getService(config, appointment.serviceId);
  const staff = getStaff(config, appointment.staffId);
  const day = dayLabels(appointment.date, today);
  const pending = appointment.status === "booked";

  useEffect(() => {
    if (!focusOnMount || !ref.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ref.current.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    ref.current.focus({ preventScroll: true });
  }, [focusOnMount]);

  const message = fill(copy.message, {
    name: firstName(appointment.clientName),
    service: service?.name ?? "",
    day: day.long,
    time: formatTime(appointment.start),
  });

  return (
    <article
      ref={ref}
      tabIndex={-1}
      aria-labelledby="new-booking-name"
      className={`${styles.newCard} ${focusOnMount ? styles.arrive : ""} ${glow ? styles.glow : ""}`}
    >
      <div className={styles.newTop}>
        <span className={styles.newBadge}>
          <span className={styles.pulse} aria-hidden />
          {copy.badge}
        </span>
        <span className={styles.code}>{appointment.code}</span>
      </div>
      <div className={styles.newBody}>
        <div className={styles.newWho}>
          <h2 id="new-booking-name">{appointment.clientName}</h2>
          <span>
            {service?.name} · {service ? priceLabel(config.currency, service) : ""}
          </span>
        </div>
        <dl className={styles.newFacts}>
          <div>
            <dt>{copy.labels.day}</dt>
            <dd>{relativeDay(appointment.date, today)}</dd>
          </div>
          <div>
            <dt>{copy.labels.time}</dt>
            <dd>{formatTime(appointment.start)}</dd>
          </div>
          <div>
            <dt>{copy.labels.staff}</dt>
            <dd>{staff?.name}</dd>
          </div>
          <div>
            <dt>{copy.labels.phone}</dt>
            <dd>
              +{config.booking.phone.countryCode} {formatPhone(appointment.phone)}
            </dd>
          </div>
        </dl>
      </div>
      <div className={styles.newActions}>
        {pending ? (
          <button
            type="button"
            className={`${ui.btn} ${ui.primary} ${styles.btn48}`}
            onClick={() => {
              confirm(appointment.id);
              toast(copy.confirmedToast);
            }}
          >
            {copy.confirm}
          </button>
        ) : (
          <span className={styles.confirmed}>{copy.confirmed}</span>
        )}
        <a
          href={whatsappLink(message, `${config.booking.phone.countryCode}${appointment.phone}`)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${ui.btn} ${ui.outline} ${styles.btn48}`}
        >
          {copy.whatsapp}
        </a>
      </div>
    </article>
  );
}

function Kpis({ config, data, today }: SectionProps) {
  const copy = config.site.panel.kpis;
  const current = weekRevenue(config, data, today);
  const change = percentChange(current, weekRevenue(config, data, today, 1));
  const lapsed = lapsedClients(data, today).filter((c) => !c.contacted).length;

  return (
    <KpiGrid>
      <Kpi
        label={copy.appointments}
        value={String(appointmentsOn(data.appointments, today).length)}
        note={fill(copy.gaps, { count: String(afternoonGaps(config, data, today)) })}
      />
      {config.modules.ventas && (
        <Kpi
          label={copy.revenue}
          value={money(config.currency, current)}
          note={fill(change >= 0 ? copy.revenueUp : copy.revenueDown, { pct: String(Math.abs(change)) })}
          tone={change >= 0 ? "positive" : "attention"}
        />
      )}
      {config.modules.recordatorios && (
        <Kpi
          label={copy.noShows}
          value={`${data.stats.noShowRate}%`}
          note={fill(copy.noShowsNote, { before: String(data.stats.noShowRateBefore) })}
          tone="positive"
        />
      )}
      {config.modules.clientes && (
        <Kpi label={copy.lapsed} value={String(lapsed)} note={copy.lapsedNote} tone="attention" />
      )}
    </KpiGrid>
  );
}

function AgendaSection({
  config,
  data,
  today,
  highlightId,
  initialDay,
}: SectionProps & { highlightId: string | null; initialDay: string }) {
  const copy = config.site.panel.agenda;
  const [day, setDay] = useState(initialDay);
  const lastDay = addDays(today, config.booking.daysAhead - 1);
  const labels = dayLabels(day, today);
  const tones = new Map(config.categories.map((c) => [c.id, c.tone]));

  return (
    <Agenda
      title={day === today ? copy.today : fill(copy.other, { day: labels.long })}
      actions={
        <div className={styles.dayNav}>
          <button
            type="button"
            onClick={() => setDay(addDays(day, -1))}
            disabled={day <= today}
            aria-label={copy.prev}
          >
            ‹
          </button>
          <span aria-live="polite">{relativeDay(day, today)}</span>
          <button
            type="button"
            onClick={() => setDay(addDays(day, 1))}
            disabled={day >= lastDay}
            aria-label={copy.next}
          >
            ›
          </button>
        </div>
      }
      legend={config.categories.map((c) => ({ label: c.name, tone: c.tone }))}
      columns={config.staff.map((m) => ({ id: m.id, name: m.name, role: m.role }))}
      blocks={appointmentsOn(data.appointments, day).map((a) => {
        const service = getService(config, a.serviceId);
        return {
          id: a.id,
          columnId: a.staffId,
          start: a.start,
          duration: a.duration,
          title: `${formatTime(a.start)} · ${a.clientName}`,
          subtitle: service?.name ?? "",
          tone: (service && tones.get(service.categoryId)) || ("muted" as CategoryTone),
          highlight: a.id === highlightId,
        };
      })}
      hours={hoursFor(config, day)}
      closedText={copy.closed}
    />
  );
}

function SalesSection({ config, data, today }: SectionProps) {
  const copy = config.site.panel.sales;
  const series = weeklySeries(config, data, today);
  const max = Math.max(...series.map((w) => w.total), 1) * 1.05;
  const top = topServices(config, data, today);
  const topCount = top[0]?.count ?? 1;
  const short = (value: number) => `${(value / 1000).toFixed(1).replace(".", ",")}k`;

  return (
    <section className={ui.card} aria-labelledby="sales-title">
      <div className={styles.sectionHead}>
        <h2 id="sales-title" className={styles.h2}>
          {copy.title}
        </h2>
        <span className={styles.muted}>{copy.unit}</span>
      </div>

      <div className={styles.chart} aria-hidden>
        {series.map((week) => {
          const label = `Semana del ${shortDate(week.start)}: ${money(config.currency, week.total)}`;
          return (
            <div key={week.start} className={`${styles.bar} ${week.current ? styles.barCurrent : ""}`}>
              <span className={styles.barValue}>{short(week.total)}</span>
              <span className={styles.barFill} style={{ height: `${(week.total / max) * 140}px` }} />
              <span className={styles.barLabel}>{shortDate(week.start)}</span>
              <span className={styles.tooltip}>{label}</span>
            </div>
          );
        })}
      </div>
      <table className={ui.visuallyHidden}>
        <caption>{copy.title}</caption>
        <thead>
          <tr>
            <th scope="col">Semana</th>
            <th scope="col">Ingresos</th>
          </tr>
        </thead>
        <tbody>
          {series.map((week) => (
            <tr key={week.start}>
              <th scope="row">{shortDate(week.start)}</th>
              <td>{money(config.currency, week.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.ranking}>
        <h3>{copy.top}</h3>
        <ol>
          {top.map((item, i) => (
            <li key={item.service.id}>
              <span className={styles.rankPos}>{i + 1}</span>
              <div className={styles.rankBody}>
                <span>{item.service.name}</span>
                <div className={styles.rankTrack}>
                  <div
                    className={`${styles.rankFill} ${i === 0 ? styles.rankFirst : ""}`}
                    style={{ width: `${(item.count / topCount) * 100}%` }}
                  />
                </div>
              </div>
              <span className={styles.rankMeta}>
                {item.count} {copy.appointments} · <strong>{money(config.currency, item.revenue)}</strong>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function LapsedSection({ config, data, today }: SectionProps) {
  const { contact } = useDemoStore();
  const toast = useToast();
  const copy = config.site.panel.lapsed;
  const all = lapsedClients(data, today);
  const featured = all.filter((c) => c.featured);
  const pendingOthers = all.filter((c) => !c.featured && !c.contacted).length;
  const allDone = featured.every((c) => c.contacted);

  return (
    <section className={ui.card} aria-labelledby="lapsed-title">
      <div className={styles.lapsedHead}>
        <h2 id="lapsed-title" className={styles.h2}>
          {copy.title}
        </h2>
        <span className={styles.muted}>{copy.text}</span>
      </div>
      {allDone ? (
        <div className={styles.allDone}>
          <span aria-hidden>✓</span>
          <strong>{copy.doneTitle}</strong>
          <p>{copy.doneText}</p>
        </div>
      ) : (
        <ul className={styles.lapsedList}>
          {featured.map((client) => {
            const service = getService(config, client.lastServiceId);
            const staff = getStaff(config, client.lastStaffId);
            const message = fill(copy.message, {
              name: firstName(client.name),
              owner: firstName(config.owner.name),
              business: config.name,
              days: String(client.daysAway),
              service: service?.name.toLowerCase() ?? "",
              staff: staff?.name ?? "",
            });
            return (
              <li key={client.id}>
                <span className={styles.initial} aria-hidden>
                  {client.name.charAt(0)}
                </span>
                <div className={styles.lapsedText}>
                  <strong>{client.name}</strong>
                  <span>
                    Hace {client.daysAway} días · {service?.name} con {staff?.name}
                  </span>
                </div>
                {client.contacted ? (
                  <span className={`${ui.status} ${ui.statusOk}`}>{copy.sent}</span>
                ) : (
                  // Sample clients have fictional numbers: WhatsApp opens with the text and no recipient.
                  <a
                    href={whatsappLink(message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${ui.btn} ${ui.primary} ${styles.sendBtn}`}
                    aria-label={`${copy.send} a ${client.name}`}
                    onClick={() => {
                      contact(client.id);
                      toast(fill(copy.toast, { name: firstName(client.name) }));
                    }}
                  >
                    {copy.send}
                  </a>
                )}
              </li>
            );
          })}
          {pendingOthers > 0 && (
            <li className={styles.more}>{fill(copy.more, { count: String(pendingOthers) })}</li>
          )}
        </ul>
      )}
    </section>
  );
}

function RemindersSection({ config, data, today }: SectionProps) {
  const copy = config.site.panel.reminders;
  const tomorrow = addDays(today, 1);
  const sent = data.appointments
    .filter((a) => a.date === tomorrow && a.source === "sample" && a.reminder)
    .sort((a, b) => a.start - b.start);
  const online = data.appointments.filter((a) => a.source === "online" && a.reminder === "scheduled");
  const rows = [...sent, ...online];
  const count = (status: string) => sent.filter((a) => a.reminder === status).length;
  const statusClass = {
    confirmed: ui.statusOk,
    cancelled: ui.statusWarn,
    "no-reply": ui.statusIdle,
    scheduled: ui.statusScheduled,
  } as const;

  return (
    <section className={ui.card} aria-labelledby="reminders-title">
      <div className={styles.sectionHead}>
        <h2 id="reminders-title" className={styles.h2}>
          {copy.title}
        </h2>
        <span className={styles.muted}>
          {fill(copy.summary, {
            total: String(sent.length),
            ok: String(count("confirmed")),
            cancelled: String(count("cancelled")),
            noReply: String(count("no-reply")),
          })}
        </span>
      </div>
      <ul className={styles.reminders}>
        {rows.map((a) => {
          const service = getService(config, a.serviceId);
          const status = a.reminder ?? "scheduled";
          return (
            <li key={a.id}>
              <span className={styles.time}>{formatTime(a.start)}</span>
              <div className={styles.lapsedText}>
                <strong>{a.clientName}</strong>
                <span>
                  {service?.name}
                  {a.source === "online" ? ` ${copy.newSuffix} · ${relativeDay(a.date, today)}` : ` · ${copy.tomorrow}`}
                </span>
              </div>
              <span className={`${ui.status} ${statusClass[status]}`}>{copy.status[status]}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
