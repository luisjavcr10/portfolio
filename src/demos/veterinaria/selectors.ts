import { addDays } from "@/demos/core/dates";
import { appointmentsOn } from "@/demos/core/schedule";
import type { Appointment } from "@/demos/core/types";
import type { HealthEvent, Patient, VetData } from "./types";

/* Derived values for the KusiVet site and panel. Everything is computed from the store. */

export function patientById(data: VetData, id: string | null | undefined): Patient | undefined {
  return data.patients.find((p) => p.id === id);
}

/** Next pending item of the health card (today or later). */
export function nextEvent(patient: Patient, today: string): HealthEvent | undefined {
  return patient.events.filter((e) => !e.done && e.date >= today).sort((a, b) => a.date.localeCompare(b.date))[0];
}

/** Next appointment or health-card item, whichever comes first. */
export function nextVisitDate(data: VetData, patient: Patient, today: string): string | null {
  const appointment = data.appointments
    .filter((a) => a.petId === patient.id && a.status !== "cancelled" && a.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date) || a.start - b.start)[0];
  const event = nextEvent(patient, today);
  const dates = [appointment?.date, event?.date].filter((d): d is string => Boolean(d)).sort();
  return dates[0] ?? null;
}

export type DueReminder = { id: string; patient: Patient; event: HealthEvent; sent: boolean };

/** Vaccines, dewormings and check-ups due in the next `days` days. */
export function dueReminders(data: VetData, today: string, days = 7): DueReminder[] {
  const until = addDays(today, days);
  return data.patients
    .flatMap((patient) =>
      patient.events
        .filter((e) => !e.done && e.date >= today && e.date <= until)
        .map((event) => {
          const id = `${patient.id}:${event.id}`;
          return { id, patient, event, sent: data.remindersSent.includes(id) };
        }),
    )
    .sort((a, b) => a.event.date.localeCompare(b.event.date) || a.patient.name.localeCompare(b.patient.name));
}

export function todaysAppointments(data: VetData, today: string): Appointment[] {
  return appointmentsOn(data.appointments, today);
}

/** Revenue so far this month vs. the same days of last month. */
export function monthRevenue(data: VetData, today: string) {
  const month = today.slice(0, 7);
  const dayOfMonth = Number(today.slice(8));
  const previousMonth = addDays(`${month}-01`, -1).slice(0, 7);
  let current = data.payments.reduce((sum, p) => sum + p.amount, 0);
  let previous = 0;
  for (const [date, total] of Object.entries(data.revenueByDay)) {
    if (date.startsWith(month) && date < today) current += total;
    else if (date.startsWith(previousMonth) && Number(date.slice(8)) <= dayOfMonth) previous += total;
  }
  const pct = previous ? Math.round(((current - previous) / previous) * 100) : 0;
  return { current, previous, pct };
}

/** Appointments already attended in the sample day (they have a payment). */
export function attendedIds(data: VetData): Set<string> {
  return new Set(data.payments.map((p) => p.appointmentId).filter((id): id is string => Boolean(id)));
}
