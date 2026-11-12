"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("es-PE", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "America/Lima",
});

function subscribe(onChange: () => void) {
  const timer = setInterval(onChange, 15_000);
  return () => clearInterval(timer);
}

/** Current time in Peru. Empty on the server and during hydration, so the markup always matches. */
export function LimaClock() {
  const time = useSyncExternalStore(
    subscribe,
    () => formatter.format(new Date()),
    () => "",
  );
  if (!time) return null;
  return <span> · {time} (UTC−5)</span>;
}
