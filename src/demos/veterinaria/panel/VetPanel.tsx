"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Agenda, type AgendaBlock } from "@/demos/core/components/Agenda";
import { Kpi, KpiGrid } from "@/demos/core/components/Kpi";
import { useToast } from "@/demos/core/components/Toast";
import { addDays, capitalize, dayLabels, daysBetween, formatTime } from "@/demos/core/dates";
import { fill, firstName, formatPhone, money, whatsappLink } from "@/demos/core/format";
import { appointmentsOn, getService, hoursFor } from "@/demos/core/schedule";
import { useDemoStore } from "@/demos/core/store";
import type { Appointment } from "@/demos/core/types";
import ui from "@/demos/core/ui.module.css";
import type { VetConfig } from "../config";
import { prefersReducedMotion } from "@/demos/core/motion";
import { Icon, type IconName } from "../icons";
import { attendedIds, dueReminders, monthRevenue, patientById, todaysAppointments } from "../selectors";
import type { GroomingTicket, VetData } from "../types";
import { CashTab } from "./CashTab";
import { PatientsTab } from "./PatientsTab";
import { RemindersTab } from "./RemindersTab";
import styles from "./VetPanel.module.css";

export type Tab = "hoy" | "agenda" | "pacientes" | "recordatorios" | "caja";

const TAB_ICONS: Record<Tab, IconName> = {
  hoy: "today",
  agenda: "calendar",
  pacientes: "paw",
  recordatorios: "bell",
  caja: "wallet",
};

type VetPanelProps = {
  config: VetConfig;
  /** Appointment just booked from the site: the panel opens on its day. */
  arrivalId: string | null;
};

/** The clinic's side of the demo: today, agenda, patients, reminders and cash. */
export function VetPanel({ config, arrivalId }: VetPanelProps) {
  const { data, today } = useDemoStore<VetData>();
  const copy = config.site.panel;
  const arrival = arrivalId ? data?.appointments.find((a) => a.id === arrivalId) : undefined;
  const [tab, setTab] = useState<Tab>(arrival && arrival.date !== today ? "agenda" : "hoy");
  const [agendaOffset, setAgendaOffset] = useState(arrival ? Math.max(0, daysBetween(today, arrival.date)) : 0);
  const [patientId, setPatientId] = useState<string | null>(null);
  const [patientOpen, setPatientOpen] = useState(false);

  const tabs = (["hoy", "agenda", "pacientes", "recordatorios", "caja"] as const).filter(
    (id) => id === "hoy" || config.modules[id],
  );
  const pendingReminders = data ? dueReminders(data, today).filter((r) => !r.sent).length : 0;

  // Bring the new booking into view (the agenda scrolls sideways on phones).
  useEffect(() => {
    if (!arrivalId) return;
    const timer = setTimeout(() => {
      document
        .querySelector(`[data-appointment-id="${arrivalId}"]`)
        ?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center", inline: "center" });
    }, 400);
    return () => clearTimeout(timer);
  }, [arrivalId]);

  function selectTab(next: Tab) {
    setTab(next);
    if (next === "pacientes") setPatientOpen(false);
    window.scrollTo({ top: 0 });
  }

  function openPatient(id: string) {
    setPatientId(id);
    setPatientOpen(true);
    setTab("pacientes");
    window.scrollTo({ top: 0 });
  }

  const navItems = tabs.map((id) => ({
    id,
    label: copy.tabs[id],
    icon: TAB_ICONS[id],
    badge: id === "recordatorios" && pendingReminders ? pendingReminders : 0,
  }));

  return (
    <div className={styles.panel}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.brandMark} aria-hidden>
            <Icon name="paw" size={24} />
          </span>
          <span className={styles.brandText}>
            <strong>{config.name}</strong>
            <span>{copy.subtitle}</span>
          </span>
        </div>
        <nav aria-label={copy.navLabel} className={styles.sideNav}>
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-current={tab === item.id ? "page" : undefined}
              onClick={() => selectTab(item.id)}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
              {item.badge > 0 && <span className={styles.badge}>{item.badge}</span>}
            </button>
          ))}
        </nav>
        <div className={styles.owner}>
          <OwnerAvatar config={config} />
          <span>
            <strong>{config.owner.name}</strong>
            <span>{config.contact.address}</span>
          </span>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.mobileHead}>
          <span className={styles.brandMark} aria-hidden>
            <Icon name="paw" size={22} />
          </span>
          <strong>{config.name}</strong>
          <OwnerAvatar config={config} />
        </div>

        <div className={styles.content}>
          {!data ? (
            <div className={styles.loading} aria-busy="true">
              <p>{copy.loading}</p>
              <span className={`${ui.skeleton} ${styles.skeletonKpis}`} />
              <span className={`${ui.skeleton} ${styles.skeletonAgenda}`} />
            </div>
          ) : (
            <>
              <TabTitle config={config} data={data} today={today} tab={tab} />
              {(tab === "hoy" || tab === "agenda") && (
                <NewBookingBanner config={config} data={data} today={today} onSeePatient={openPatient} />
              )}
              {tab === "hoy" && (
                <TodayTab config={config} data={data} today={today} onReminders={() => selectTab("recordatorios")} />
              )}
              {tab === "agenda" && (
                <AgendaTab config={config} data={data} today={today} offset={agendaOffset} onOffset={setAgendaOffset} />
              )}
              {tab === "pacientes" && (
                <PatientsTab
                  config={config}
                  data={data}
                  today={today}
                  selectedId={patientId}
                  open={patientOpen}
                  onSelect={(id) => {
                    setPatientId(id);
                    setPatientOpen(true);
                  }}
                  onBack={() => setPatientOpen(false)}
                />
              )}
              {tab === "recordatorios" && <RemindersTab config={config} data={data} today={today} />}
              {tab === "caja" && <CashTab config={config} data={data} today={today} />}
            </>
          )}
        </div>
      </main>

      <nav aria-label={copy.navLabel} className={styles.bottomNav}>
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-current={tab === item.id ? "page" : undefined}
            onClick={() => selectTab(item.id)}
          >
            <span className={styles.bottomIcon}>
              <Icon name={item.icon} />
            </span>
            {item.label}
            {item.badge > 0 && <span className={styles.bottomBadge}>{item.badge}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}

function OwnerAvatar({ config }: { config: VetConfig }) {
  const photo = config.owner.photo;
  return (
    <span className={styles.ownerAvatar} aria-hidden>
      {photo?.src ? (
        <Image src={photo.src} alt="" width={40} height={40} />
      ) : (
        config.owner.name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
      )}
    </span>
  );
}

type SectionProps = { config: VetConfig; data: VetData; today: string };

function TabTitle({ config, data, today, tab }: SectionProps & { tab: Tab }) {
  const copy = config.site.panel;
  if (tab === "hoy") {
    return (
      <div className={styles.titleBlock}>
        <h1>{config.owner.greeting}</h1>
        <p>
          {fill(copy.todaySub, {
            date: capitalize(dayLabels(today, today).long),
            count: String(todaysAppointments(data, today).length),
          })}
        </p>
      </div>
    );
  }
  const subs: Record<Exclude<Tab, "hoy">, string> = {
    agenda: copy.agenda.sub,
    pacientes: fill(copy.patients.sub, { count: String(data.patients.length) }),
    recordatorios: copy.reminders.sub,
    caja: capitalize(dayLabels(today, today).long),
  };
  return (
    <div className={styles.titleBlock}>
      <h1>{tab === "caja" ? copy.cash.title : copy.tabs[tab]}</h1>
      <p>{subs[tab]}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* New booking from the site                                           */
/* ------------------------------------------------------------------ */

function NewBookingBanner({
  config,
  data,
  today,
  onSeePatient,
}: SectionProps & { onSeePatient: (patientId: string) => void }) {
  const { confirm } = useDemoStore<VetData>();
  const toast = useToast();
  const copy = config.site.panel.newBooking;
  const booking = data.appointments.find((a) => a.id === data.lastBookingId && a.status !== "cancelled");
  if (!booking) return null;

  const service = getService(config, booking.serviceId);
  const staff = config.staff.find((m) => m.id === booking.staffId);
  const day = booking.date === today ? "Hoy" : capitalize(dayLabels(booking.date, today).long);
  const petName = booking.pet?.name ?? booking.clientName;
  const confirmed = booking.status === "confirmed";
  const message = fill(copy.message, {
    owner: firstName(booking.clientName),
    pet: petName,
    service: service?.name ?? "",
    day: dayLabels(booking.date, today).long,
    time: formatTime(booking.start),
  });

  return (
    <section className={styles.banner} aria-label={copy.badge}>
      <span className={styles.bannerIcon} aria-hidden>
        <Icon name="calendarCheck" size={28} />
      </span>
      <div className={styles.bannerText}>
        <span className={styles.bannerBadge}>{copy.badge}</span>
        <strong>
          {petName} · {service?.name}
        </strong>
        <span>
          {day}, {formatTime(booking.start)} · {staff?.name} · {booking.clientName}, {formatPhone(booking.phone)}
        </span>
      </div>
      <div className={styles.bannerActions}>
        {booking.petId && (
          <button type="button" className={styles.btnGhost} onClick={() => onSeePatient(booking.petId!)}>
            {copy.seePatient}
          </button>
        )}
        {confirmed ? (
          <span className={`${styles.btnLeaf} ${styles.btnDone}`}>
            <Icon name="checks" size={18} />
            {copy.confirmed}
          </span>
        ) : (
          <a
            href={whatsappLink(message, `${config.booking.phone.countryCode}${booking.phone}`)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnLeaf}
            onClick={() => {
              confirm(booking.id);
              toast(copy.toast);
            }}
          >
            <Icon name="chat" size={18} />
            {copy.confirm}
          </a>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Today                                                               */
/* ------------------------------------------------------------------ */

function TodayTab({ config, data, today, onReminders }: SectionProps & { onReminders: () => void }) {
  const copy = config.site.panel;
  const appointments = todaysAppointments(data, today);
  const newToday = appointments.filter((a) => a.source === "online").length;
  const due = dueReminders(data, today).length;
  const revenue = monthRevenue(data, today);

  return (
    <>
      <KpiGrid>
        <Kpi
          label={copy.kpis.today}
          value={String(appointments.length)}
          note={
            newToday
              ? fill(copy.kpis.todayNew, { count: String(newToday) })
              : fill(copy.kpis.todayNote, { count: String(config.staff.length) })
          }
          tone={newToday ? "positive" : "neutral"}
        />
        {config.modules.recordatorios && (
          <Kpi label={copy.kpis.due} value={String(due)} note={copy.kpis.dueCta} tone="positive" onClick={onReminders} />
        )}
        <Kpi
          label={copy.kpis.revenue}
          value={money(config.currency, revenue.current)}
          note={`${revenue.pct >= 0 ? "▲ +" : "▼ "}${revenue.pct}% ${copy.kpis.revenueNote}`}
          tone={revenue.pct >= 0 ? "positive" : "attention"}
        />
        <Kpi
          label={copy.kpis.returned}
          value={`${data.stats.returnRate}%`}
          note=""
          meter={data.stats.returnRate}
        />
      </KpiGrid>
      {config.modules.agenda && <DayAgenda config={config} data={data} date={today} title={copy.agenda.today} />}
      {config.modules.peluqueria && <GroomingBoard config={config} data={data} today={today} />}
    </>
  );
}

/** One day of the agenda (core Agenda), one column per professional. */
function DayAgenda({
  config,
  data,
  date,
  title,
}: Omit<SectionProps, "today"> & { date: string; title: string }) {
  const copy = config.site.panel.agenda;
  const attended = attendedIds(data);
  const toBlock = (a: Appointment): AgendaBlock => {
    const service = getService(config, a.serviceId);
    const category = config.categories.find((c) => c.id === service?.categoryId);
    return {
      id: a.id,
      columnId: a.staffId,
      start: a.start,
      duration: a.duration,
      title: `${formatTime(a.start)} · ${a.pet?.name ?? a.clientName}`,
      subtitle: `${service?.name ?? ""} · ${firstName(a.clientName)}`,
      tone: category?.tone ?? "muted",
      highlight: a.id === data.lastBookingId,
      done: attended.has(a.id),
    };
  };

  return (
    <Agenda
      title={title}
      legend={config.categories.map((c) => ({ label: c.kicker, tone: c.tone }))}
      columns={config.staff.map((m) => ({ id: m.id, name: m.name, role: m.role }))}
      blocks={appointmentsOn(data.appointments, date).map(toBlock)}
      hours={hoursFor(config, date)}
      closedText={copy.closed}
      hourHeight={104}
      minBlockMinutes={30}
    />
  );
}

function AgendaTab({
  config,
  data,
  today,
  offset,
  onOffset,
}: SectionProps & { offset: number; onOffset: (offset: number) => void }) {
  const copy = config.site.panel.agenda;
  const date = addDays(today, offset);
  const newBooking = data.appointments.find((a) => a.id === data.lastBookingId);

  return (
    <>
      <div className={styles.dayChips} role="group" aria-label={copy.dayLabel}>
        {Array.from({ length: config.booking.daysAhead }, (_, i) => {
          const day = addDays(today, i);
          const labels = dayLabels(day, today);
          const hasNew = newBooking?.date === day;
          return (
            <button
              key={day}
              type="button"
              aria-pressed={i === offset}
              aria-label={`${capitalize(labels.long)}${hasNew ? `, ${copy.newDot}` : ""}`}
              onClick={() => onOffset(i)}
            >
              <span>{labels.chip}</span>
              <strong>{labels.dayNumber}</strong>
              {hasNew && <span className={styles.newDot} aria-hidden />}
            </button>
          );
        })}
      </div>
      <DayAgenda
        config={config}
        data={data}
        date={date}
        title={offset === 0 ? copy.today : capitalize(dayLabels(date, today).long)}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Grooming board                                                      */
/* ------------------------------------------------------------------ */

function GroomingBoard({ config, data }: SectionProps) {
  const { update } = useDemoStore<VetData>();
  const toast = useToast();
  const copy = config.site.panel.grooming;
  const close = hoursFor(config, data.seededOn)?.close;
  const columns = (["recibido", "bano", "listo"] as const).map((status) => ({
    status,
    label: copy.columns[status],
    items: data.grooming.filter((t) => t.status === status),
  }));

  const move = (id: string, status: GroomingTicket["status"]) =>
    update((d) => ({ ...d, grooming: d.grooming.map((t) => (t.id === id ? { ...t, status } : t)) }));
  const markNotified = (id: string) =>
    update((d) => ({ ...d, grooming: d.grooming.map((t) => (t.id === id ? { ...t, notified: true } : t)) }));

  return (
    <section className={styles.section} aria-labelledby="grooming-title">
      <h2 id="grooming-title" className={styles.h2}>
        {copy.title}
      </h2>
      <div className={styles.board}>
        {columns.map((column) => (
          <div key={column.status} className={styles.boardColumn} data-status={column.status}>
            <div className={styles.boardHead}>
              <span className={styles.boardDot} aria-hidden />
              <strong>{column.label}</strong>
              <span>{column.items.length}</span>
            </div>
            {column.items.length === 0 && <p className={styles.boardEmpty}>{copy.empty}</p>}
            {column.items.map((ticket) => {
              const patient = patientById(data, ticket.patientId);
              if (!patient) return null;
              const owner = firstName(patient.owner.name);
              return (
                <div key={ticket.id} className={styles.ticket}>
                  <div className={styles.ticketHead}>
                    <span>
                      <strong>
                        {patient.name} <span>· {patient.breed}</span>
                      </strong>
                      <span>
                        {ticket.serviceName} · {owner}
                      </span>
                    </span>
                    <span className={styles.ticketTime}>{formatTime(ticket.time)}</span>
                  </div>
                  {ticket.status === "recibido" && (
                    <button type="button" className={styles.ticketBtn} onClick={() => move(ticket.id, "bano")}>
                      <Icon name="shower" size={18} />
                      {copy.actions.toBath}
                    </button>
                  )}
                  {ticket.status === "bano" && (
                    <button type="button" className={styles.ticketBtn} onClick={() => move(ticket.id, "listo")}>
                      <Icon name="check" size={18} />
                      {copy.actions.ready}
                    </button>
                  )}
                  {ticket.status === "listo" &&
                    (ticket.notified ? (
                      <span className={`${styles.ticketBtn} ${styles.ticketDone}`}>
                        <Icon name="checks" size={18} />
                        {copy.actions.notified}
                      </span>
                    ) : (
                      <a
                        href={whatsappLink(
                          fill(copy.message, { owner, pet: patient.name, close: close ? formatTime(close) : "" }),
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.ticketBtn} ${styles.ticketNotify}`}
                        onClick={() => {
                          markNotified(ticket.id);
                          toast(fill(copy.toast, { owner }));
                        }}
                      >
                        <Icon name="chat" size={18} />
                        {copy.actions.notify}
                      </a>
                    ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
