"use client";

import { useCallback, useEffect, useReducer } from "react";
import { todayKey } from "./dates";

type Seeded = { seededOn: string };

type State<D> = { status: "loading" } | { status: "ready"; data: D };
type Internal<D, A> = { type: "@load"; data: D } | { type: "@action"; action: A };

function readStorage<D>(key: string): D | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as D) : null;
  } catch {
    return null;
  }
}

function writeStorage<D>(key: string, data: D) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Storage may be unavailable (private mode, quota); the demo keeps working in memory.
  }
}

/**
 * Reducer state generated in the browser and persisted in localStorage. Sample data
 * is created for the visitor's today; data seeded on an earlier day is discarded so
 * agendas and schedules never look stale. `data` is null until hydrated.
 */
export function usePersistedReducer<D extends Seeded, A>(
  storageKey: string,
  createSeed: (today: string) => D,
  reducer: (data: D, action: A) => D,
) {
  const [state, dispatchInternal] = useReducer(
    (current: State<D>, event: Internal<D, A>): State<D> => {
      if (event.type === "@load") return { status: "ready", data: event.data };
      if (current.status !== "ready") return current;
      const next = reducer(current.data, event.action);
      return next === current.data ? current : { status: "ready", data: next };
    },
    { status: "loading" },
  );

  useEffect(() => {
    const today = todayKey();
    const saved = readStorage<D>(storageKey);
    dispatchInternal({ type: "@load", data: saved?.seededOn === today ? saved : createSeed(today) });
  }, [storageKey, createSeed]);

  useEffect(() => {
    if (state.status === "ready") writeStorage(storageKey, state.data);
  }, [state, storageKey]);

  const dispatch = useCallback((action: A) => dispatchInternal({ type: "@action", action }), []);
  const reset = useCallback(() => dispatchInternal({ type: "@load", data: createSeed(todayKey()) }), [createSeed]);

  return { data: state.status === "ready" ? state.data : null, dispatch, reset };
}
