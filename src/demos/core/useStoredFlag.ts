"use client";

import { useCallback, useSyncExternalStore } from "react";

const EVENT = "demo-flag-change";

function read(key: string): boolean {
  try {
    return localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/**
 * Boolean persisted in localStorage (e.g. "hint dismissed"). Renders `false`
 * on the server and during hydration, then the stored value.
 */
export function useStoredFlag(key: string): [boolean, (value: boolean) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => read(key),
    () => false,
  );

  const setValue = useCallback(
    (next: boolean) => {
      try {
        if (next) localStorage.setItem(key, "1");
        else localStorage.removeItem(key);
      } catch {
        // Ignore unavailable storage.
      }
      window.dispatchEvent(new Event(EVENT));
    },
    [key],
  );

  return [value, setValue];
}
