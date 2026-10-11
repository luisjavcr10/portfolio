"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import { todayKey } from "./dates";
import type { Appointment, DemoData } from "./types";

type State = { status: "loading" } | { status: "ready"; data: DemoData };

type Action =
  | { type: "load"; data: DemoData }
  | { type: "book"; appointment: Appointment }
  | { type: "confirm"; id: string }
  | { type: "contact"; clientId: string };

function reducer(state: State, action: Action): State {
  if (action.type === "load") return { status: "ready", data: action.data };
  if (state.status !== "ready") return state;

  const { data } = state;
  switch (action.type) {
    case "book":
      return {
        status: "ready",
        data: { ...data, appointments: [...data.appointments, action.appointment], lastBookingId: action.appointment.id },
      };
    case "confirm":
      return {
        status: "ready",
        data: {
          ...data,
          appointments: data.appointments.map((a) =>
            a.id === action.id ? { ...a, status: "confirmed", reminder: "scheduled" } : a,
          ),
        },
      };
    case "contact":
      return data.contacted.includes(action.clientId)
        ? state
        : { status: "ready", data: { ...data, contacted: [...data.contacted, action.clientId] } };
  }
}

type StoreValue = {
  data: DemoData | null;
  today: string;
  book: (appointment: Appointment) => void;
  confirm: (id: string) => void;
  contact: (clientId: string) => void;
  reset: () => void;
};

const StoreContext = createContext<StoreValue | null>(null);

function readStorage(key: string): DemoData | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as DemoData) : null;
  } catch {
    return null;
  }
}

function writeStorage(key: string, data: DemoData | null) {
  try {
    if (data) localStorage.setItem(key, JSON.stringify(data));
    else localStorage.removeItem(key);
  } catch {
    // Storage may be unavailable (private mode, quota); the demo keeps working in memory.
  }
}

type DemoStoreProviderProps = {
  storageKey: string;
  /** Builds the sample data for a given day ("YYYY-MM-DD"). */
  createSeed: (today: string) => DemoData;
  children: ReactNode;
};

/**
 * Client-only store for a demo. Sample data is generated in the browser (dates are
 * relative to the visitor's today) and persisted in localStorage. Data seeded on an
 * earlier day is discarded so the agenda never looks stale.
 */
export function DemoStoreProvider({ storageKey, createSeed, children }: DemoStoreProviderProps) {
  const [state, dispatch] = useReducer(reducer, { status: "loading" });

  useEffect(() => {
    const today = todayKey();
    const saved = readStorage(storageKey);
    dispatch({ type: "load", data: saved?.seededOn === today ? saved : createSeed(today) });
  }, [storageKey, createSeed]);

  useEffect(() => {
    if (state.status === "ready") writeStorage(storageKey, state.data);
  }, [state, storageKey]);

  const reset = useCallback(() => {
    dispatch({ type: "load", data: createSeed(todayKey()) });
  }, [createSeed]);

  const data = state.status === "ready" ? state.data : null;
  const value = useMemo<StoreValue>(
    () => ({
      data,
      today: data?.seededOn ?? "",
      book: (appointment) => dispatch({ type: "book", appointment }),
      confirm: (id) => dispatch({ type: "confirm", id }),
      contact: (clientId) => dispatch({ type: "contact", clientId }),
      reset,
    }),
    [data, reset],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useDemoStore(): StoreValue {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useDemoStore must be used inside <DemoStoreProvider>");
  return value;
}
