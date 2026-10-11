/* Local-date helpers. Dates are stored as "YYYY-MM-DD" in the visitor's timezone. */

const WEEKDAYS_SHORT = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const WEEKDAYS_LONG = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const MONTHS = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "setiembre", "octubre", "noviembre", "diciembre",
];
const MONTHS_SHORT = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "set", "oct", "nov", "dic"];

export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function fromDateKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(key: string, days: number): string {
  const date = fromDateKey(key);
  date.setDate(date.getDate() + days);
  return toDateKey(date);
}

export function todayKey(): string {
  return toDateKey(new Date());
}

/** Whole days from `from` to `to` (positive when `to` is later). */
export function daysBetween(from: string, to: string): number {
  return Math.round((fromDateKey(to).getTime() - fromDateKey(from).getTime()) / 86_400_000);
}

export function weekday(key: string): number {
  return fromDateKey(key).getDay();
}

export type DayLabels = {
  key: string;
  /** "Hoy", "Lun"… */
  chip: string;
  dayNumber: number;
  /** "Lun 13" */
  short: string;
  /** "lunes 13 de octubre" */
  long: string;
  /** "Octubre 2026" */
  month: string;
};

export function dayLabels(key: string, today: string): DayLabels {
  const date = fromDateKey(key);
  const dow = date.getDay();
  const month = MONTHS[date.getMonth()];
  return {
    key,
    chip: key === today ? "Hoy" : WEEKDAYS_SHORT[dow],
    dayNumber: date.getDate(),
    short: `${WEEKDAYS_SHORT[dow]} ${date.getDate()}`,
    long: `${WEEKDAYS_LONG[dow]} ${date.getDate()} de ${month}`,
    month: `${month.charAt(0).toUpperCase()}${month.slice(1)} ${date.getFullYear()}`,
  };
}

/** "17 ago" */
export function shortDate(key: string): string {
  const date = fromDateKey(key);
  return `${date.getDate()} ${MONTHS_SHORT[date.getMonth()]}`;
}

/** "vie 16 oct" */
export function weekdayDate(key: string): string {
  return `${WEEKDAYS_SHORT[weekday(key)].toLowerCase()} ${shortDate(key)}`;
}

/** "Hoy", "Mañana · Mar 14" or "Jue 16". */
export function relativeDay(key: string, today: string): string {
  const labels = dayLabels(key, today);
  const diff = daysBetween(today, key);
  if (diff === 0) return "Hoy";
  if (diff === 1) return `Mañana · ${labels.short}`;
  return labels.short;
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** "HH:MM" → minutes from midnight. */
export function parseTime(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/** Minutes from midnight → "9:00". */
export function formatTime(minutes: number): string {
  return `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, "0")}`;
}

export function minutesNow(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}
