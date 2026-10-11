"use client";

import { Kpi, KpiGrid } from "@/demos/core/components/Kpi";
import { useToast } from "@/demos/core/components/Toast";
import { dayLabels, weekdayDate } from "@/demos/core/dates";
import { fill, firstName, whatsappLink } from "@/demos/core/format";
import { useDemoStore } from "@/demos/core/store";
import type { VetConfig } from "../config";
import { Icon } from "../icons";
import { dueReminders, type DueReminder } from "../selectors";
import type { VetData } from "../types";
import { PetAvatar } from "./PatientsTab";
import styles from "./VetPanel.module.css";

type RemindersTabProps = { config: VetConfig; data: VetData; today: string };

/** "vacuna antirrábica", "desparasitación interna", "control dermatológico" */
function reasonText(reminder: DueReminder) {
  const label = reminder.event.label.toLowerCase();
  return reminder.event.kind === "vacuna" ? `vacuna ${label}` : label;
}

/** WhatsApp reminders for vaccines and check-ups due this week. */
export function RemindersTab({ config, data, today }: RemindersTabProps) {
  const { update } = useDemoStore<VetData>();
  const toast = useToast();
  const copy = config.site.panel.reminders;
  const reminders = dueReminders(data, today);
  const pending = reminders.filter((r) => !r.sent);
  const sentTotal = data.stats.remindersSentMonth + data.remindersSent.length;
  const bookedPct = Math.round((data.stats.remindersBooked / sentTotal) * 100);

  const markSent = (ids: string[]) =>
    update((d) => ({ ...d, remindersSent: [...new Set([...d.remindersSent, ...ids])] }));

  return (
    <>
      <KpiGrid>
        <Kpi label={copy.sentMonth} value={String(sentTotal)} note="" />
        <Kpi label={copy.booked} value={String(data.stats.remindersBooked)} note={`${bookedPct}%`} tone="positive" />
        <Kpi label={copy.pending} value={String(pending.length)} note="" />
      </KpiGrid>

      <section className={styles.section} aria-labelledby="reminders-title">
        <div className={styles.sectionHead}>
          <h2 id="reminders-title" className={styles.h2}>
            {copy.listTitle}
          </h2>
          {pending.length > 0 && (
            <button
              type="button"
              className={styles.btnOutline}
              onClick={() => {
                markSent(pending.map((r) => r.id));
                toast(fill(copy.toastAll, { count: String(pending.length) }));
              }}
            >
              <Icon name="send" size={18} />
              {copy.sendAll}
            </button>
          )}
        </div>
        {pending.length === 0 && <p className={styles.allDone}>{copy.empty}</p>}
        <ul className={styles.reminders}>
          {reminders.map((reminder) => {
            const { patient, event } = reminder;
            const owner = firstName(patient.owner.name);
            const message = fill(copy.message, {
              owner,
              pet: patient.name,
              reason: reasonText(reminder),
              date: dayLabels(event.date, today).long,
            });
            return (
              <li key={reminder.id} className={styles.reminder}>
                <div className={styles.reminderWho}>
                  <PetAvatar patient={patient} size={56} rounded />
                  <span>
                    <strong>
                      {patient.name} <span>· {patient.owner.name}</span>
                    </strong>
                    <span>{event.label}</span>
                    <span className={styles.dueChip}>{fill(copy.due, { date: weekdayDate(event.date) })}</span>
                  </span>
                </div>
                <div className={styles.reminderMessage}>
                  <p className={styles.bubble}>{message}</p>
                  {reminder.sent ? (
                    <span className={`${styles.btnLeaf} ${styles.btnDone} ${styles.sendBtn}`}>
                      <Icon name="checks" size={18} />
                      {copy.sent}
                    </span>
                  ) : (
                    <a
                      href={whatsappLink(message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.btnLeaf} ${styles.sendBtn}`}
                      aria-label={`${copy.send}: ${patient.name}, ${patient.owner.name}`}
                      onClick={() => {
                        markSent([reminder.id]);
                        toast(fill(copy.toast, { owner }));
                      }}
                    >
                      <Icon name="send" size={18} />
                      {copy.send}
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
