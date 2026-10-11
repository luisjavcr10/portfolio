"use client";

import Image from "next/image";
import { useState } from "react";
import { useToast } from "@/demos/core/components/Toast";
import { shortDate, weekdayDate } from "@/demos/core/dates";
import { fill, firstName, formatPhone, whatsappLink } from "@/demos/core/format";
import type { VetConfig } from "../config";
import { Icon } from "../icons";
import { nextVisitDate } from "../selectors";
import type { Patient, VetData } from "../types";
import styles from "./VetPanel.module.css";

type PatientsTabProps = {
  config: VetConfig;
  data: VetData;
  today: string;
  selectedId: string | null;
  /** On phones the list and the record are separate screens. */
  open: boolean;
  onSelect: (id: string) => void;
  onBack: () => void;
};

const MONTHS_SHORT = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "set", "oct", "nov", "dic"];

/** Patient list with search, and the selected pet's record. */
export function PatientsTab({ config, data, today, selectedId, open, onSelect, onBack }: PatientsTabProps) {
  const copy = config.site.panel.patients;
  const [query, setQuery] = useState("");
  // New patients (booked online) first, then alphabetical.
  const patients = [...data.patients].sort(
    (a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)) || a.name.localeCompare(b.name, "es"),
  );
  const q = query.trim().toLowerCase();
  const visible = q
    ? patients.filter((p) => `${p.name} ${p.owner.name}`.toLowerCase().includes(q))
    : patients;
  const selected = patients.find((p) => p.id === selectedId) ?? patients.find((p) => p.id === config.site.carnet.patientId) ?? patients[0];

  return (
    <div className={styles.patients} data-open={open}>
      <div className={styles.patientList}>
        <label className={styles.search}>
          <Icon name="search" size={20} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={copy.search}
            aria-label={copy.search}
          />
        </label>
        {visible.length === 0 && <p className={styles.listEmpty}>{copy.empty}</p>}
        <ul>
          {visible.map((patient) => {
            const next = nextVisitDate(data, patient, today);
            const current = patient.id === selected?.id;
            return (
              <li key={patient.id}>
                <button
                  type="button"
                  aria-current={current ? "true" : undefined}
                  className={styles.patientRow}
                  onClick={() => onSelect(patient.id)}
                >
                  <PetAvatar patient={patient} size={48} />
                  <span className={styles.patientText}>
                    <span>
                      <strong>{patient.name}</strong>
                      {patient.isNew && <span className={styles.newBadge}>{copy.newBadge}</span>}
                    </span>
                    <span>
                      {copy.species[patient.species]} · {patient.breed || copy.pending} · {firstName(patient.owner.name)}
                    </span>
                  </span>
                  {next && (
                    <span className={styles.nextChip} data-new={patient.isNew}>
                      {weekdayDate(next)}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {selected && (
        <div className={styles.record}>
          <button type="button" className={styles.backBtn} onClick={onBack}>
            <Icon name="chevronLeft" size={20} />
            {copy.back}
          </button>
          <PatientRecord config={config} patient={selected} today={today} />
        </div>
      )}
    </div>
  );
}

export function PetAvatar({ patient, size, rounded = false }: { patient: Patient; size: number; rounded?: boolean }) {
  return (
    <span
      className={`${styles.petAvatar} ${rounded ? styles.petAvatarRounded : ""}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      aria-hidden
    >
      {patient.photo ? <Image src={patient.photo} alt="" width={size} height={size} /> : patient.name.charAt(0)}
    </span>
  );
}

function PatientRecord({ config, patient, today }: { config: VetConfig; patient: Patient; today: string }) {
  const copy = config.site.panel.patients;
  const toast = useToast();
  const owner = firstName(patient.owner.name);
  const staffName = (id: string) => config.staff.find((m) => m.id === id)?.name ?? "";
  const events = [...patient.events].sort((a, b) => a.date.localeCompare(b.date));
  const notes = [...patient.notes].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <article className={styles.recordBody} aria-labelledby="patient-name">
      <div className={`${styles.card} ${styles.recordHead}`}>
        <PetAvatar patient={patient} size={104} rounded />
        <div className={styles.recordTitle}>
          <div>
            <h2 id="patient-name">{patient.name}</h2>
            <span>{fill(copy.record, { record: patient.record })}</span>
          </div>
          <div className={styles.tags}>
            <span className={styles.tagLeaf}>{copy.species[patient.species]}</span>
            <span>{patient.breed || copy.pending}</span>
            <span>{patient.sex ?? copy.pending}</span>
            <span>{patient.age}</span>
          </div>
        </div>
        <div className={styles.recordActions}>
          <button
            type="button"
            className={styles.btnGhost}
            onClick={() => toast(fill(copy.callToast, { phone: formatPhone(patient.owner.phone) }))}
          >
            <Icon name="phone" size={18} />
            {copy.call}
          </button>
          <a
            href={whatsappLink(fill(copy.whatsappMessage, { owner, pet: patient.name }))}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnLeaf}
          >
            <Icon name="chat" size={18} />
            {copy.whatsapp}
          </a>
        </div>
      </div>

      <div className={styles.recordGrid}>
        <div className={styles.card}>
          <span className={styles.cardLabel}>{copy.owner}</span>
          <strong className={styles.ownerName}>{patient.owner.name}</strong>
          <span className={styles.ownerPhone}>
            <Icon name="smartphone" size={18} />
            {formatPhone(patient.owner.phone)}
          </span>
          <span className={styles.muted}>{patient.isNew ? copy.ownerNoteNew : copy.ownerNote}</span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardLabel}>{copy.weight}</span>
          {patient.weights ? (
            <WeightChart weights={patient.weights} today={today} label={copy.weightChart} deltaText={copy.weightDelta} />
          ) : (
            <span className={styles.muted}>{copy.weightNew}</span>
          )}
        </div>
      </div>

      <div className={styles.recordGrid}>
        <section className={styles.card} aria-labelledby="events-title">
          <h3 id="events-title" className={styles.h3}>
            {copy.events}
          </h3>
          {events.length ? (
            <ol className={styles.events}>
              {events.map((e) => {
                const upcoming = !e.done;
                return (
                  <li key={e.id} data-next={upcoming}>
                    <span className={styles.eventDot} aria-hidden />
                    <span className={styles.eventText}>
                      <strong>{e.label}</strong>
                      <span>
                        {e.kind === "vacuna" ? "Vacuna" : e.kind === "control" ? "Control" : "Desparasitación"} ·{" "}
                        {upcoming ? weekdayDate(e.date) : `${shortDate(e.date)} ${e.date.slice(0, 4)}`}
                      </span>
                    </span>
                    <span className={styles.eventStatus}>{upcoming ? copy.next : copy.applied}</span>
                  </li>
                );
              })}
            </ol>
          ) : (
            <p className={styles.muted}>{copy.eventsEmpty}</p>
          )}
        </section>
        <section className={styles.card} aria-labelledby="notes-title">
          <h3 id="notes-title" className={styles.h3}>
            {copy.notes}
          </h3>
          <div className={styles.notes}>
            {notes.map((note) => (
              <div key={`${note.date}-${note.reason}`} className={styles.note}>
                <div>
                  <strong>{note.reason}</strong>
                  <span>{note.date === today ? "Hoy" : `${shortDate(note.date)} ${note.date.slice(0, 4)}`}</span>
                </div>
                <p>{note.text}</p>
                <span className={styles.noteVet}>{staffName(note.staffId)}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

/** Six monthly weights as a small line chart (plain SVG). */
function WeightChart({
  weights,
  today,
  label,
  deltaText,
}: {
  weights: number[];
  today: string;
  label: string;
  deltaText: string;
}) {
  const min = Math.min(...weights);
  const max = Math.max(...weights);
  const range = max - min || 1;
  const points = weights.map((w, i) => [4 + (i * 112) / (weights.length - 1), 38 - ((w - min) / range) * 30] as const);
  const last = points[points.length - 1];
  const delta = Math.round((weights[weights.length - 1] - weights[0]) * 10) / 10;
  const month = Number(today.slice(5, 7)) - 1;
  const months = weights.map((_, i) => MONTHS_SHORT[(month - (weights.length - 1 - i) + 12) % 12]);
  const summary = weights.map((w, i) => `${months[i]}: ${w} kg`).join(", ");

  return (
    <div className={styles.weight}>
      <div className={styles.weightRow}>
        <span className={styles.weightValue}>
          <strong>{weights[weights.length - 1]} kg</strong>
          <span>{fill(deltaText, { delta: `${delta > 0 ? "+" : ""}${delta}` })}</span>
        </span>
        <svg viewBox="0 0 120 44" width="140" height="52" role="img" aria-label={`${label}. ${summary}`}>
          <polyline
            points={points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ")}
            fill="none"
            stroke="var(--kv-leaf)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx={last[0]} cy={last[1]} r="4" fill="var(--kv-coral)" />
        </svg>
      </div>
      <span className={styles.weightMonths} aria-hidden>
        {months.map((m, i) => (
          <span key={`${m}-${i}`}>{m}</span>
        ))}
      </span>
    </div>
  );
}

