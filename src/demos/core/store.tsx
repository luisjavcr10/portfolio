"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Appointment, DemoData } from "./types";
import { usePersistedReducer } from "./usePersistedReducer";

type Action =
  | { type: "book"; appointment: Appointment }
  | { type: "confirm"; id: string }
  | { type: "contact"; clientId: string };

function reducer(data: DemoData, action: Action): DemoData {
  switch (action.type) {
    case "book":
      return { ...data, appointments: [...data.appointments, action.appointment], lastBookingId: action.appointment.id };
    case "confirm":
      return {
        ...data,
        appointments: data.appointments.map((a) =>
          a.id === action.id ? { ...a, status: "confirmed", reminder: "scheduled" } : a,
        ),
      };
    case "contact":
      return data.contacted.includes(action.clientId)
        ? data
        : { ...data, contacted: [...data.contacted, action.clientId] };
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

type DemoStoreProviderProps = {
  storageKey: string;
  /** Builds the sample data for a given day ("YYYY-MM-DD"). */
  createSeed: (today: string) => DemoData;
  children: ReactNode;
};

/** Client-only store for appointment-based demos (see usePersistedReducer). */
export function DemoStoreProvider({ storageKey, createSeed, children }: DemoStoreProviderProps) {
  const { data, dispatch, reset } = usePersistedReducer(storageKey, createSeed, reducer);

  const value = useMemo<StoreValue>(
    () => ({
      data,
      today: data?.seededOn ?? "",
      book: (appointment) => dispatch({ type: "book", appointment }),
      confirm: (id) => dispatch({ type: "confirm", id }),
      contact: (clientId) => dispatch({ type: "contact", clientId }),
      reset,
    }),
    [data, dispatch, reset],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useDemoStore(): StoreValue {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useDemoStore must be used inside <DemoStoreProvider>");
  return value;
}
