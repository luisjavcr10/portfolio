import { formatTime, minutesNow, parseTime, weekday } from "./dates";
import type { AnyTenantConfig, Appointment, Service, StaffMember } from "./types";

export const ANY_STAFF = "any";

export function getService(config: AnyTenantConfig, id: string | null): Service | undefined {
  return config.services.find((service) => service.id === id);
}

export function getStaff(config: AnyTenantConfig, id: string | null): StaffMember | undefined {
  return config.staff.find((member) => member.id === id);
}

export function canPerform(member: StaffMember, service: Service): boolean {
  return member.categoryIds.includes(service.categoryId);
}

export function eligibleStaff(config: AnyTenantConfig, service?: Service): StaffMember[] {
  return service ? config.staff.filter((member) => canPerform(member, service)) : config.staff;
}

/** Opening and closing minutes for a date, or null when closed. */
export function hoursFor(config: AnyTenantConfig, date: string): { open: number; close: number } | null {
  const day = weekday(date);
  const entry = config.hours.find((hours) => hours.weekdays.includes(day));
  return entry ? { open: parseTime(entry.open), close: parseTime(entry.close) } : null;
}

/** Active (not cancelled) appointments on a date, sorted by start time. */
export function appointmentsOn(appointments: Appointment[], date: string): Appointment[] {
  return appointments
    .filter((a) => a.date === date && a.status !== "cancelled")
    .sort((a, b) => a.start - b.start);
}

function isStaffFree(appointments: Appointment[], staffId: string, start: number, end: number): boolean {
  return !appointments.some((a) => a.staffId === staffId && a.start < end && start < a.start + a.duration);
}

export type Slot = {
  start: number;
  label: string;
  free: boolean;
  /** Staff member who would take the slot (first free one when "any"). */
  staffId: string | null;
};

/**
 * Slots for a service on a date, based on the real appointments in the store.
 * A slot is free when the whole service fits before closing without overlapping
 * another appointment of the chosen staff member (or of any eligible one).
 */
export function slotsFor(params: {
  config: AnyTenantConfig;
  appointments: Appointment[];
  date: string;
  today: string;
  service: Service;
  staffId: string;
}): Slot[] {
  const { config, appointments, date, today, service, staffId } = params;
  const hours = hoursFor(config, date);
  if (!hours) return [];

  const dayAppointments = appointmentsOn(appointments, date);
  const candidates =
    staffId === ANY_STAFF ? eligibleStaff(config, service).map((m) => m.id) : [staffId];
  const earliest = date === today ? minutesNow() + config.booking.leadMinutes : 0;

  const slots: Slot[] = [];
  const step = config.booking.slotMinutes;
  for (let start = hours.open; start + service.duration <= hours.close; start += step) {
    const end = start + service.duration;
    const taker =
      start >= earliest ? candidates.find((id) => isStaffFree(dayAppointments, id, start, end)) : undefined;
    slots.push({ start, label: formatTime(start), free: Boolean(taker), staffId: taker ?? null });
  }
  return slots;
}
