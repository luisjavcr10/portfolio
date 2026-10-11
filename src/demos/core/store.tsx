"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Appointment, DemoData } from "./types";
import { usePersistedReducer } from "./usePersistedReducer";

/** What every appointment-based demo stores; verticals add their own fields. */
export type StoreData = { seededOn: string; appointments: Appointment[]; lastBookingId: string | null };

type Action<D> =
  | { type: "book"; appointment: Appointment }
  | { type: "confirm"; id: string }
  | { type: "update"; recipe: (data: D) => D };

type StoreValue<D extends StoreData> = {
  data: D | null;
  today: string;
  book: (appointment: Appointment) => void;
  confirm: (id: string) => void;
  /** Vertical-specific changes (mark a reminder as sent, move a pet to "ready"…). */
  update: (recipe: (data: D) => D) => void;
  reset: () => void;
};

// The context is shared by every vertical; useDemoStore<D>() narrows it back.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StoreContext = createContext<StoreValue<any> | null>(null);

type DemoStoreProviderProps<D extends StoreData> = {
  storageKey: string;
  /** Builds the sample data for a given day ("YYYY-MM-DD"). */
  createSeed: (today: string) => D;
  /** Extra changes when a booking arrives (e.g. create the patient record). Keep it stable. */
  onBook?: (data: D, appointment: Appointment) => D;
  children: ReactNode;
};

function reduce<D extends StoreData>(data: D, action: Action<D>, onBook?: (data: D, appointment: Appointment) => D): D {
  switch (action.type) {
    case "book": {
      const next = { ...data, appointments: [...data.appointments, action.appointment], lastBookingId: action.appointment.id };
      return onBook ? onBook(next, action.appointment) : next;
    }
    case "confirm":
      return {
        ...data,
        appointments: data.appointments.map((a) =>
          a.id === action.id ? { ...a, status: "confirmed", reminder: "scheduled" } : a,
        ),
      };
    case "update":
      return action.recipe(data);
  }
}

/** Client-only store for appointment-based demos (see usePersistedReducer). */
export function DemoStoreProvider<D extends StoreData>({ storageKey, createSeed, onBook, children }: DemoStoreProviderProps<D>) {
  const { data, dispatch, reset } = usePersistedReducer<D, Action<D>>(storageKey, createSeed, (current, action) =>
    reduce(current, action, onBook),
  );

  const value = useMemo<StoreValue<D>>(
    () => ({
      data,
      today: data?.seededOn ?? "",
      book: (appointment) => dispatch({ type: "book", appointment }),
      confirm: (id) => dispatch({ type: "confirm", id }),
      update: (recipe) => dispatch({ type: "update", recipe }),
      reset,
    }),
    [data, dispatch, reset],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

/** Store of the surrounding provider; pass the vertical's data type (defaults to the salon's). */
export function useDemoStore<D extends StoreData = DemoData>(): StoreValue<D> {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useDemoStore must be used inside <DemoStoreProvider>");
  return value;
}
