"use client";

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { useToast } from "@/demos/core/components/Toast";
import { addDays, parseTime, weekday } from "@/demos/core/dates";
import { fill, firstName, formatPhone, money, whatsappLink } from "@/demos/core/format";
import { coachName, getClass, hoursOn, sessionsOn, shortTime, useGymStore, whenWords, type GymData, type Lead } from "../data";
import { CountUp, prefersReducedMotion, useReveal } from "../motion";
import type { GymConfig, GymPanelCopy } from "../types";
import styles from "./GymPanel.module.css";

type TabId = GymPanelCopy["tabs"][number]["id"];

type Props = { config: GymConfig; arrivalId: string | null; onTryFlow: () => void };

const HEAT_DAYS = [1, 2, 3, 4, 5, 6, 0];
const HEAT_LABELS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const HOURS = Array.from({ length: 18 }, (_, i) => i + 5);

/** Owner dashboard ("Para ti"). */
export function GymPanel({ config, arrivalId, onTryFlow }: Props) {
  const { data } = useGymStore();
  const copy = config.site.panel;
  const [tab, setTab] = useState<TabId>("hoy");

  function goTo(id: TabId) {
    setTab(id);
    const el = document.getElementById(`panel-${id}`);
    if (!el) return;
    const behavior = prefersReducedMotion() ? "auto" : "smooth";
    if (id === "hoy") window.scrollTo({ top: 0, behavior });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 16, behavior });
  }

  const hasNewLead = !!data?.leads.some((l) => l.source === "online");
  const tabs = copy.tabs.map((t) => (
    <button
      key={t.id}
      type="button"
      aria-current={tab === t.id ? "page" : undefined}
      className={styles.tab}
      onClick={() => goTo(t.id)}
    >
      <span aria-hidden className={styles.tabDot} />
      {t.label}
      {t.id === "leads" && hasNewLead && <span className={styles.tabBadge}>1</span>}
    </button>
  ));

  return (
    <div className={styles.panel}>
      <aside className={styles.sidebar}>
        <div className={styles.sideBrand}>
          <span aria-hidden className={styles.logoMark} />
          <span className={styles.logoText}>
            FIT<span>MOCHE</span>
          </span>
          <span className={styles.sideBadge}>{copy.badge.toUpperCase()}</span>
        </div>
        <nav aria-label={copy.navLabel} className={styles.sideNav}>
          {tabs}
        </nav>
        {data && <OpenBox config={config} today={data.seededOn} />}
      </aside>

      <main className={styles.main}>
        {data ? <PanelBody config={config} data={data} arrivalId={arrivalId} onTryFlow={onTryFlow} /> : <PanelSkeleton />}
      </main>

      <nav aria-label={copy.navLabel} className={styles.bottomNav}>
        {tabs}
      </nav>
    </div>
  );
}

function OpenBox({ config, today }: { config: GymConfig; today: string }) {
  const copy = config.site.panel;
  const [status, setStatus] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const minutes = now.getHours() * 60 + now.getMinutes();
      const h = hoursOn(config, today);
      const open = h && minutes >= parseTime(h.open) && minutes < parseTime(h.close);
      const nextOpen = hoursOn(config, addDays(today, 1));
      setStatus(
        open
          ? fill(copy.openUntil, { time: shortTime(h.close) })
          : fill(copy.closedUntil, { time: shortTime(h && minutes < parseTime(h.open) ? h.open : nextOpen?.open ?? "") }),
      );
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [config, copy, today]);

  return (
    <div className={styles.openBox}>
      <strong>
        {config.name} {config.contact.city}
      </strong>
      <span>{config.contact.address}</span>
      <span className={styles.openStatus}>
        <span aria-hidden className={styles.pulse} />
        {status}
      </span>
    </div>
  );
}

function PanelSkeleton() {
  return (
    <div className={styles.skeleton} aria-busy="true" aria-label="Cargando panel">
      <span />
      <span />
      <span />
    </div>
  );
}

/* ------------------------------------------------------------------ */

/** Attendance curve from the design: morning and evening peaks on weekdays. */
function heatValue(dow: number, hour: number): number {
  let v: number;
  if (dow >= 1 && dow <= 5)
    v =
      0.12 +
      0.7 * Math.exp(-((hour - 7) ** 2) / 2.2) +
      0.9 * Math.exp(-((hour - 19.5) ** 2) / 2.6) +
      0.12 * Math.exp(-((hour - 13) ** 2) / 2);
  else if (dow === 6) v = 0.18 + 0.8 * Math.exp(-((hour - 9.5) ** 2) / 4);
  else v = 0.2 + 0.5 * Math.exp(-((hour - 10) ** 2) / 3);
  return Math.min(1, v * (dow === 1 ? 1.08 : dow === 5 ? 0.86 : 1));
}

function isOpenAt(config: GymConfig, dow: number, hour: number) {
  const h = config.hours.find((x) => x.weekdays.includes(dow));
  if (!h) return false;
  return hour * 60 + 59 >= parseTime(h.open) && hour * 60 < parseTime(h.close);
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];
const clock = (d: Date) => `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;

type Checkin = { id: number; name: string; plan: string; zone: string; time: string };

function PanelBody({ config, data, arrivalId, onTryFlow }: { config: GymConfig; data: GymData; arrivalId: string | null; onTryFlow: () => void }) {
  const { dispatch } = useGymStore();
  const toast = useToast();
  const copy = config.site.panel;
  const s = config.sample;
  const root = useRef<HTMLDivElement>(null);
  const leadCard = useRef<HTMLDivElement>(null);
  const today = data.seededOn;
  const now = new Date();
  const dow = weekday(today);

  useReveal(root, "panel");

  // Live check-ins: a new member walks in every few seconds.
  const [checkins, setCheckins] = useState<Checkin[]>(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      name: s.checkinNames[(i * 2) % s.checkinNames.length],
      plan: s.planNames[i % s.planNames.length],
      zone: s.zones[i % s.zones.length],
      time: clock(new Date(Date.now() - (i * 4 + 1) * 60_000)),
    })),
  );
  const listRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    let id = 100;
    const timer = setInterval(() => {
      setCheckins((list) =>
        [{ id: id++, name: pick(s.checkinNames), plan: pick(s.planNames), zone: pick(s.zones), time: clock(new Date()) }, ...list].slice(0, 6),
      );
      if (!prefersReducedMotion())
        requestAnimationFrame(() =>
          listRef.current?.firstElementChild?.animate(
            [
              { transform: "translateY(-14px)", opacity: 0, background: "rgba(255,212,0,.15)" },
              { transform: "none", opacity: 1, background: "rgba(255,212,0,0)" },
            ],
            { duration: 450, easing: "cubic-bezier(.16,1,.3,1)" },
          ),
        );
    }, 3800);
    return () => clearInterval(timer);
  }, [s]);

  // The visitor's booking enters at the top after the screen wipe.
  useEffect(() => {
    const card = leadCard.current;
    if (!arrivalId || !card) return;
    const reduced = prefersReducedMotion();
    const timer = setTimeout(() => {
      card.scrollIntoView({ block: "center", behavior: "auto" });
      card.focus({ preventScroll: true });
      if (reduced) card.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400 });
      else {
        card.animate([{ transform: "translateY(-40px) scale(.96)", opacity: 0 }, { transform: "none", opacity: 1 }], {
          duration: 700,
          easing: "cubic-bezier(.34,1.56,.64,1)",
          fill: "backwards",
        });
        card.animate([{ boxShadow: "0 0 0 0 rgba(255,212,0,.7)" }, { boxShadow: "0 0 0 18px rgba(255,212,0,0)" }], {
          duration: 900,
          delay: 700,
          iterations: 2,
        });
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [arrivalId]);

  const online = data.leads.filter((l) => l.source === "online");
  const lead = data.leads.find((l) => l.id === data.lastLeadId) ?? null;

  const funnelNew = s.monthLeads + online.length;
  const funnelCame = s.monthLeadsCame + online.filter((l) => l.status === "came").length;
  const funnelJoined = s.monthLeadsJoined;
  const joinedPct = Math.round((funnelJoined / funnelNew) * 100);

  const hour = now.getHours();
  const h = hoursOn(config, today);
  const minutes = hour * 60 + now.getMinutes();
  const openNow = !!h && minutes >= parseTime(h.open) && minutes < parseTime(h.close);
  const training = openNow ? Math.max(8, Math.round((0.06 + heatValue(dow, Math.min(22, Math.max(5, hour))) * 0.94) * 140)) : 0;

  const fecha = now.toLocaleDateString("es-PE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const month = now.toLocaleDateString("es-PE", { month: "long" }).toLowerCase();
  const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toLocaleDateString("es-PE", { month: "long" }).toLowerCase();
  const reopens = h && minutes < parseTime(h.open) ? h.open : hoursOn(config, addDays(today, 1))?.open ?? "";

  const todaySessions = sessionsOn(config, data, today);
  const mixTotal = s.paymentMix.reduce((sum, m) => sum + m.amount, 0);
  const mixColors = ["var(--g-yellow)", "var(--g-white)", "#5a5a5a"];

  function sendWinBack(id: string, name: string) {
    dispatch({ type: "contact", id });
    toast(fill(copy.risk.toast, { name: firstName(name) }));
  }

  function remind(id: string, name: string) {
    dispatch({ type: "remind", id });
    toast(fill(copy.payments.toast, { name: firstName(name) }));
  }

  const leadStatus = (l: Lead) =>
    l.status === "came"
      ? { text: copy.funnel.states.came, tone: "came" }
      : l.status === "joined"
        ? { text: copy.funnel.states.joined, tone: "joined" }
        : l.status === "noShow"
          ? { text: copy.funnel.states.noShow, tone: "off" }
          : { text: copy.funnel.states.new, tone: "new" };

  return (
    <div ref={root} className={styles.body}>
      <div id="panel-hoy" className={styles.hello}>
        <div>
          <span className={styles.date}>{fecha}</span>
          <h1 className={styles.h1}>
            {copy.greeting} <span>{config.owner.name}</span>
          </h1>
        </div>
        <span className={styles.trainingPill}>
          <span aria-hidden className={styles.pulse} />
          {openNow ? fill(copy.training, { n: String(training) }) : fill(copy.closedUntil, { time: shortTime(reopens) })}
        </span>
      </div>

      {lead ? (
        <LeadCard config={config} lead={lead} today={today} cardRef={leadCard} />
      ) : (
        <div className={styles.emptyLead}>
          <p>{copy.emptyLead}</p>
          <button type="button" className={styles.btnGhost} onClick={onTryFlow}>
            {copy.tryFlow}
          </button>
        </div>
      )}

      <div className={styles.kpis}>
        <div data-rise="" className={styles.kpi}>
          <span className={styles.kpiLabel}>{copy.kpis.members}</span>
          <CountUp value={s.activeMembers} className={styles.kpiValue} />
          <span className={styles.kpiNote}>{fill(copy.kpis.membersNote, { n: String(s.newMembers) })}</span>
        </div>
        <div data-rise="" className={styles.kpi}>
          <span className={styles.kpiLabel}>{copy.kpis.expiring}</span>
          <CountUp value={s.expiringThisWeek} className={`${styles.kpiValue} ${styles.yellowText}`} />
          <span className={styles.kpiNote}>{copy.kpis.expiringNote}</span>
        </div>
        <div data-rise="" data-on-yellow="" className={`${styles.kpi} ${styles.kpiYellow}`}>
          <span className={styles.kpiLabel}>{copy.kpis.revenue}</span>
          <CountUp value={s.monthRevenue} prefix={`${config.currency.symbol} `} className={styles.kpiValue} />
          <span className={styles.kpiPill}>{fill(copy.kpis.revenueNote, { n: String(s.revenueChange), month: prevMonth })}</span>
        </div>
        <div data-rise="" className={styles.kpi}>
          <span className={styles.kpiLabel}>
            {copy.kpis.leads}
            {online.length > 0 && <span className={styles.miniBadge}>{fill(copy.kpis.leadsToday, { n: String(online.length) })}</span>}
          </span>
          <CountUp value={funnelNew} className={styles.kpiValue} />
          <span className={styles.kpiNote}>{fill(copy.kpis.leadsNote, { n: String(joinedPct) })}</span>
        </div>
      </div>

      <div className={styles.grid2}>
        <section data-rise="" aria-labelledby="ci-title" className={styles.card}>
          <div className={styles.cardHead}>
            <h2 id="ci-title">{copy.checkins.title}</h2>
            <span className={styles.live}>
              <span aria-hidden className={styles.pulse} />
              {copy.checkins.live.toUpperCase()}
            </span>
          </div>
          <ul ref={listRef} className={styles.list}>
            {checkins.map((c) => (
              <li key={c.id} className={styles.row}>
                <span aria-hidden className={styles.avatar}>
                  {initials(c.name)}
                </span>
                <span className={styles.rowText}>
                  <strong>{fill(copy.checkins.entered, { name: c.name })}</strong>
                  <small>
                    {c.plan} · {c.zone}
                  </small>
                </span>
                <span className={styles.rowTime}>{c.time}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="panel-clases" data-rise="" aria-labelledby="today-title" className={styles.card}>
          <div className={styles.cardHead}>
            <h2 id="today-title">{copy.today.title}</h2>
            <span className={styles.monoTag}>{fill(copy.today.capacity, { n: String(config.capacity) }).toUpperCase()}</span>
          </div>
          {todaySessions.map((session) => {
            const c = getClass(config, session.classId);
            const full = session.free === 0;
            const hot = full || session.taken >= config.capacity * 0.8;
            const isNew = lead && lead.date === today && lead.time === session.time && lead.classId === session.classId;
            return (
              <div key={session.key} className={styles.occupancy} data-hot={hot ? "" : undefined} data-new={isNew ? "" : undefined}>
                <div className={styles.occHead}>
                  <span>
                    <span className={styles.occTime}>{shortTime(session.time)}</span> · <strong>{c.name}</strong> · {coachName(config, c.coachId)}
                  </span>
                  <strong className={styles.occCount}>
                    {full ? `${copy.today.full} · ` : ""}
                    {session.taken}/{config.capacity}
                  </strong>
                </div>
                <div
                  className={styles.bar}
                  role="meter"
                  aria-label={`${c.name} ${shortTime(session.time)}`}
                  aria-valuemin={0}
                  aria-valuemax={config.capacity}
                  aria-valuenow={session.taken}
                >
                  <span style={{ width: `${(session.taken / config.capacity) * 100}%` }} />
                </div>
              </div>
            );
          })}
          {!todaySessions.length && <p className={styles.muted}>{copy.today.empty}</p>}
        </section>
      </div>

      <section data-rise="" aria-labelledby="heat-title" className={styles.card}>
        <div className={styles.cardHead}>
          <h2 id="heat-title">{copy.heat.title}</h2>
          <span className={styles.mutedSmall}>
            {copy.heat.peak.split("{peak}")[0]}
            <strong className={styles.yellowText}>7 – 9 p. m.</strong>
            {copy.heat.peak.split("{peak}")[1]}
          </span>
        </div>
        <div className={styles.heatScroll}>
          <table className={styles.heat}>
            <caption className={styles.srOnly}>{copy.heat.title}</caption>
            <thead>
              <tr>
                <th scope="col">
                  <span className={styles.srOnly}>Día</span>
                </th>
                {HOURS.map((hh) => (
                  <th key={hh} scope="col">
                    {hh % 2 ? <span className={styles.srOnly}>{hh}</span> : hh}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HEAT_DAYS.map((d) => (
                <tr key={d}>
                  <th scope="row">{HEAT_LABELS[d]}</th>
                  {HOURS.map((hh) => {
                    const open = isOpenAt(config, d, hh);
                    const v = heatValue(d, hh);
                    const label = open ? `${Math.round(v * 140)} ${copy.heat.people}` : copy.heat.closed;
                    return (
                      <td key={hh} title={`${HEAT_LABELS[d]} ${hh}:00 · ${label}`}>
                        <span
                          className={styles.cell}
                          data-closed={open ? undefined : ""}
                          data-now={d === dow && hh === hour ? "" : undefined}
                          style={open ? ({ "--v": (0.06 + v * 0.94).toFixed(2) } as CSSProperties) : undefined}
                        />
                        <span className={styles.srOnly}>{label}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.legend} aria-hidden>
          <span>{copy.heat.less}</span>
          <span className={styles.legendRamp} />
          <span>{copy.heat.more}</span>
          <span className={styles.legendClosed} />
          <span>{copy.heat.closed}</span>
        </div>
      </section>

      <div className={styles.grid2}>
        <section id="panel-socios" data-rise="" aria-labelledby="risk-title" className={styles.card}>
          <div className={styles.cardHead}>
            <h2 id="risk-title">{copy.risk.title}</h2>
            <span className={styles.mutedSmall}>{copy.risk.note}</span>
          </div>
          <ul className={styles.list}>
            {s.atRisk.map((m) => {
              const sent = data.contacted.includes(m.id);
              return (
                <li key={m.id} className={styles.row}>
                  <span aria-hidden className={`${styles.avatar} ${styles.avatarRing}`}>
                    {initials(m.name)}
                  </span>
                  <span className={styles.rowText}>
                    <strong>{m.name}</strong>
                    <small>
                      {m.plan} · {copy.risk.awayPrefix}{" "}
                      <b className={styles.yellowText}>
                        {m.daysAway} {copy.risk.days}
                      </b>
                    </small>
                  </span>
                  {sent ? (
                    <span className={styles.sent}>{copy.risk.sent}</span>
                  ) : (
                    <a
                      href={whatsappLink(fill(config.messages.winBack, { name: firstName(m.name) }))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btnYellow}
                      onClick={() => sendWinBack(m.id, m.name)}
                      aria-label={`${copy.risk.send} a ${m.name}`}
                    >
                      {copy.risk.send}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
          <p className={styles.messageNote}>Mensaje: “{fill(config.messages.winBack, { name: "" }).replace(/\s+,/, ",")}”</p>
        </section>

        <section id="panel-leads" data-rise="" aria-labelledby="funnel-title" className={styles.card}>
          <div className={styles.cardHead}>
            <h2 id="funnel-title">{fill(copy.funnel.title, { month })}</h2>
            <span className={styles.monoTag}>{copy.funnel.tag.toUpperCase()}</span>
          </div>
          {[
            { label: copy.funnel.stages[0], n: funnelNew, color: "#5a5a5a" },
            { label: copy.funnel.stages[1], n: funnelCame, color: "var(--g-yellow-dark)" },
            { label: copy.funnel.stages[2], n: funnelJoined, color: "var(--g-yellow)" },
          ].map((stage) => {
            const pct = (stage.n / funnelNew) * 100;
            return (
              <div key={stage.label} className={styles.stage}>
                <div className={styles.stageHead}>
                  <strong>{stage.label}</strong>
                  <span>
                    <b>{stage.n}</b> <small>{Math.round(pct)}%</small>
                  </span>
                </div>
                <div className={styles.stageBar}>
                  <span style={{ width: `${pct}%`, background: stage.color }} />
                </div>
              </div>
            );
          })}
          <ul className={styles.leadRows}>
            {data.leads.map((l) => {
              const st = leadStatus(l);
              return (
                <li key={l.id}>
                  <span>
                    <strong>{l.name}</strong>
                    <small>
                      {getClass(config, l.classId).name} · {whenWords(l.date, today)} {shortTime(l.time)}
                    </small>
                  </span>
                  <span className={styles.status} data-tone={st.tone}>
                    {st.text}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <section id="panel-pagos" data-rise="" aria-labelledby="pay-title" className={styles.card}>
        <div className={styles.cardHead}>
          <h2 id="pay-title">{copy.payments.title}</h2>
          <span className={styles.mutedSmall}>
            {fill(copy.payments.collected, { amount: money(config.currency, s.monthRevenue) })} ·{" "}
            <strong className={styles.yellowText}>{fill(copy.payments.pending, { amount: money(config.currency, s.pendingDebt) })}</strong>
          </span>
        </div>
        <div className={styles.mix} aria-hidden>
          {s.paymentMix.map((m, i) => (
            <span key={m.method} style={{ width: `${(m.amount / mixTotal) * 100}%`, background: mixColors[i % mixColors.length] }} />
          ))}
        </div>
        <ul className={styles.mixLegend}>
          {s.paymentMix.map((m, i) => (
            <li key={m.method}>
              <span aria-hidden style={{ background: mixColors[i % mixColors.length] }} />
              {m.method} <strong>{money(config.currency, m.amount)}</strong>
            </li>
          ))}
        </ul>
        <div className={styles.payCols}>
          <div>
            <h3 className={styles.colTitle}>{copy.payments.today.toUpperCase()}</h3>
            <ul className={styles.list}>
              {s.payments.map((p) => (
                <li key={p.name} className={styles.row}>
                  <span className={styles.rowText}>
                    <strong>{p.name}</strong>
                    <small>
                      {p.plan} · {p.time}
                    </small>
                  </span>
                  <span className={styles.method} data-method={p.method}>
                    {p.method}
                  </span>
                  <strong className={styles.amount}>{money(config.currency, p.amount)}</strong>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={`${styles.colTitle} ${styles.yellowText}`}>{copy.payments.owe.toUpperCase()}</h3>
            <ul className={styles.list}>
              {s.debts.map((d) => {
                const done = data.reminded.includes(d.id);
                return (
                  <li key={d.id} className={styles.row}>
                    <span className={styles.rowText}>
                      <strong>
                        {d.name} · {money(config.currency, d.amount)}
                      </strong>
                      <small className={styles.yellowText}>
                        {d.plan} · {d.due}
                      </small>
                    </span>
                    {done ? (
                      <span className={styles.sentMuted}>{copy.payments.reminded}</span>
                    ) : (
                      <a
                        href={whatsappLink(
                          fill(config.messages.debtReminder, { name: firstName(d.name), plan: d.plan, amount: money(config.currency, d.amount) }),
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.btnGhost}
                        onClick={() => remind(d.id, d.name)}
                        aria-label={`${copy.payments.remind} a ${d.name}`}
                      >
                        {copy.payments.remind}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function LeadCard({ config, lead, today, cardRef }: { config: GymConfig; lead: Lead; today: string; cardRef: RefObject<HTMLDivElement | null> }) {
  const { dispatch } = useGymStore();
  const copy = config.site.panel;
  const c = getClass(config, lead.classId);
  const when = whenWords(lead.date, today);
  const attended = lead.status === "came";
  const message = fill(config.messages.confirmLead, {
    name: firstName(lead.name),
    owner: config.owner.name,
    class: c.name,
    when,
    time: shortTime(lead.time),
  });

  return (
    <div ref={cardRef} tabIndex={-1} className={styles.leadCard} aria-labelledby="lead-name">
      <div className={styles.leadInfo}>
        <span className={styles.leadTag}>
          <span aria-hidden />
          {fill(copy.newLeadTag, { class: c.name, when, time: shortTime(lead.time) })}
        </span>
        <span id="lead-name" className={styles.leadName}>
          {lead.name}
        </span>
        <span className={styles.leadDetails}>
          {fill(copy.leadDetails, { phone: formatPhone(lead.phone), goal: lead.goal, coach: coachName(config, c.coachId), code: lead.code })}
        </span>
      </div>
      <div className={styles.leadActions}>
        <a href={whatsappLink(message, `51${lead.phone}`)} target="_blank" rel="noopener noreferrer" className={styles.btnYellow}>
          {copy.writeLead}
        </a>
        <button
          type="button"
          aria-pressed={attended}
          className={styles.attend}
          onClick={() => dispatch({ type: "toggleAttended", id: lead.id })}
        >
          {attended ? copy.attended : copy.markAttended}
        </button>
      </div>
    </div>
  );
}
