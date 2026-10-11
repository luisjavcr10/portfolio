"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { addDays, daysBetween, minutesNow, parseTime, weekday } from "@/demos/core/dates";
import { usePersistedReducer } from "@/demos/core/usePersistedReducer";
import type { GymConfig, GymClass } from "./types";

/* ------------------------------------------------------------------ */
/* Data model                                                          */
/* ------------------------------------------------------------------ */

export type LeadStatus = "new" | "came" | "joined" | "noShow";

export type Lead = {
  id: string;
  code: string;
  name: string;
  /** National number, digits only. */
  phone: string;
  goal: string;
  classId: string;
  date: string;
  time: string;
  status: LeadStatus;
  source: "online" | "sample";
};

export type GymData = {
  seededOn: string;
  /** People booked per session, keyed by sessionKey(). */
  taken: Record<string, number>;
  leads: Lead[];
  lastLeadId: string | null;
  /** At-risk member ids already messaged. */
  contacted: string[];
  /** Debt ids already reminded. */
  reminded: string[];
};

export type Session = {
  key: string;
  classId: string;
  date: string;
  time: string;
  taken: number;
  free: number;
};

export function sessionKey(date: string, time: string, classId: string): string {
  return `${date}|${time}|${classId}`;
}

/* ------------------------------------------------------------------ */
/* Schedule helpers                                                    */
/* ------------------------------------------------------------------ */

export function getClass(config: GymConfig, id: string): GymClass {
  const found = config.classes.find((c) => c.id === id);
  if (!found) throw new Error(`Unknown class ${id}`);
  return found;
}

export function coachName(config: GymConfig, coachId: string): string {
  return config.coaches.find((c) => c.id === coachId)?.name ?? "";
}

/** "07:00" → "7:00" */
export function shortTime(time: string): string {
  return time.replace(/^0/, "");
}

export function hoursOn(config: GymConfig, date: string) {
  const dow = weekday(date);
  return config.hours.find((h) => h.weekdays.includes(dow)) ?? null;
}

/** Sessions on a date, sorted by time, with seats from the store. */
export function sessionsOn(config: GymConfig, data: GymData, date: string, classId?: string): Session[] {
  const dow = weekday(date);
  return config.schedule
    .filter((entry) => entry.weekdays.includes(dow) && (!classId || entry.classId === classId))
    .map((entry) => {
      const key = sessionKey(date, entry.time, entry.classId);
      const taken = Math.min(config.capacity, data.taken[key] ?? 0);
      return { key, classId: entry.classId, date, time: entry.time, taken, free: config.capacity - taken };
    })
    .sort((a, b) => a.time.localeCompare(b.time) || a.classId.localeCompare(b.classId));
}

/** Sessions a visitor can still book (same-day ones need `leadMinutes` notice). */
export function bookableSessions(config: GymConfig, data: GymData, date: string, classId: string): Session[] {
  const isToday = date === data.seededOn;
  const limit = minutesNow() + config.booking.leadMinutes;
  return sessionsOn(config, data, date, classId).filter((s) => !isToday || parseTime(s.time) > limit);
}

/** Upcoming days offered in the booking flow, starting today. */
export function bookingDays(config: GymConfig, today: string): string[] {
  return Array.from({ length: config.booking.daysAhead }, (_, i) => addDays(today, i));
}

/** Words for a lead's day: "hoy", "mañana", "el jueves 15". */
export function whenWords(date: string, today: string): string {
  const diff = daysBetween(today, date);
  if (diff === 0) return "hoy";
  if (diff === 1) return "mañana";
  if (diff === -1) return "ayer";
  const d = new Date(`${date}T12:00:00`);
  return `el ${d.toLocaleDateString("es-PE", { weekday: "long" })} ${d.getDate()}`;
}

/** Chip label for a day: "Hoy", "Mañana", "Jue 15". */
export function dayChip(date: string, today: string): string {
  const diff = daysBetween(today, date);
  if (diff === 0) return "Hoy";
  if (diff === 1) return "Mañana";
  const d = new Date(`${date}T12:00:00`);
  const name = d.toLocaleDateString("es-PE", { weekday: "short" }).replace(".", "");
  return `${name.charAt(0).toUpperCase()}${name.slice(1)} ${d.getDate()}`;
}

/* ------------------------------------------------------------------ */
/* Seed                                                                */
/* ------------------------------------------------------------------ */

function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Same spread as the design: ~10% full, ~30% with a few seats, the rest roomy. */
function seededFree(key: string): number {
  const r = hash(key) % 100;
  if (r < 10) return 0;
  if (r < 40) return 1 + (r % 5);
  return 6 + (r % 13);
}

export function createGymSeed(config: GymConfig) {
  return (today: string): GymData => {
    const taken: Record<string, number> = {};
    for (let offset = -1; offset <= 7; offset++) {
      const date = addDays(today, offset);
      for (const entry of config.schedule) {
        if (!entry.weekdays.includes(weekday(date))) continue;
        const key = sessionKey(date, entry.time, entry.classId);
        taken[key] = config.capacity - seededFree(key);
      }
    }

    const yesterday = addDays(today, -1);
    const leads: Lead[] = [
      { id: "s1", code: "FM-3107", name: "Mariana T.", phone: "", goal: "Tonificar", classId: "funcional", date: today, time: "06:30", status: "came", source: "sample" },
      { id: "s2", code: "FM-2954", name: "Jean Pierre A.", phone: "", goal: "Ganar masa", classId: "box", date: yesterday, time: "19:00", status: "joined", source: "sample" },
      { id: "s3", code: "FM-2871", name: "Kimberly L.", phone: "", goal: "Bajar de peso", classId: "gluteos", date: yesterday, time: "18:00", status: "noShow", source: "sample" },
    ];

    return { seededOn: today, taken, leads, lastLeadId: null, contacted: [], reminded: [] };
  };
}

/* ------------------------------------------------------------------ */
/* Store                                                               */
/* ------------------------------------------------------------------ */

type Action =
  | { type: "book"; lead: Lead }
  | { type: "toggleAttended"; id: string }
  | { type: "contact"; id: string }
  | { type: "remind"; id: string };

function reducer(data: GymData, action: Action): GymData {
  switch (action.type) {
    case "book": {
      const { lead } = action;
      const key = sessionKey(lead.date, lead.time, lead.classId);
      return {
        ...data,
        taken: { ...data.taken, [key]: (data.taken[key] ?? 0) + 1 },
        leads: [lead, ...data.leads],
        lastLeadId: lead.id,
      };
    }
    case "toggleAttended":
      return {
        ...data,
        leads: data.leads.map((l) =>
          l.id === action.id ? { ...l, status: l.status === "came" ? "new" : "came" } : l,
        ),
      };
    case "contact":
      return data.contacted.includes(action.id) ? data : { ...data, contacted: [...data.contacted, action.id] };
    case "remind":
      return data.reminded.includes(action.id) ? data : { ...data, reminded: [...data.reminded, action.id] };
  }
}

type GymStore = {
  data: GymData | null;
  dispatch: (action: Action) => void;
  reset: () => void;
};

const GymStoreContext = createContext<GymStore | null>(null);

export function GymStoreProvider({
  storageKey,
  createSeed,
  children,
}: {
  storageKey: string;
  createSeed: (today: string) => GymData;
  children: ReactNode;
}) {
  const { data, dispatch, reset } = usePersistedReducer(storageKey, createSeed, reducer);
  const value = useMemo(() => ({ data, dispatch, reset }), [data, dispatch, reset]);
  return <GymStoreContext.Provider value={value}>{children}</GymStoreContext.Provider>;
}

export function useGymStore(): GymStore {
  const value = useContext(GymStoreContext);
  if (!value) throw new Error("useGymStore must be used inside <GymStoreProvider>");
  return value;
}
