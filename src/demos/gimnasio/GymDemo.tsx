"use client";

import { useRef, useState } from "react";
import { ToastProvider, useToast } from "@/demos/core/components/Toast";
import { ViewSwitch } from "@/demos/core/components/ViewSwitch";
import { themeFontClasses, themeStyle } from "@/demos/core/theme";
import theme from "@/demos/core/theme.module.css";
import { useStoredFlag } from "@/demos/core/useStoredFlag";
import { GymBooking } from "./booking/GymBooking";
import { gymConfig as config } from "./config";
import { createGymSeed, GymStoreProvider, useGymStore } from "./data";
import styles from "./gym.module.css";
import { screenWipe, useCursor } from "./motion";
import { GymPanel } from "./panel/GymPanel";
import { GymSite, type BookRequest } from "./site/GymSite";

export type DemoView = "client" | "owner";

const VIEW_PARAM = "vista";
const OWNER_VALUE = "dueno";
const STORAGE_KEY = `demo:${config.id}:v1`;
const HINT_KEY = `demo:${config.id}:hint-dismissed`;
const createSeed = createGymSeed(config);

/** FitMoche demo: public site and owner panel sharing one client-side store. */
export function GymDemo({ initialView }: { initialView: DemoView }) {
  return (
    <div className={[theme.root, styles.root, themeFontClasses(config.theme)].join(" ")} style={themeStyle(config.theme)}>
      {/* Match the page background to the tenant (visible on overscroll). */}
      <style href={`tenant-${config.id}`} precedence="default">
        {`body{background:${config.theme.colors.base}}`}
      </style>
      <GymStoreProvider storageKey={STORAGE_KEY} createSeed={createSeed}>
        <ToastProvider>
          <Demo initialView={initialView} />
        </ToastProvider>
      </GymStoreProvider>
    </div>
  );
}

function Demo({ initialView }: { initialView: DemoView }) {
  const { data, reset } = useGymStore();
  const toast = useToast();
  const copy = config.site.demo;
  const [view, setView] = useState<DemoView>(initialView);
  const [booking, setBooking] = useState<(BookRequest & { key: number }) | null>(null);
  const [arrivalId, setArrivalId] = useState<string | null>(null);
  const [hintDismissed, setHintDismissed] = useStoredFlag(HINT_KEY);
  const wipe = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);

  useCursor(cursor, root);

  function applyView(next: DemoView, nextArrival: string | null) {
    setView(next);
    setArrivalId(nextArrival);
    const url = new URL(window.location.href);
    if (next === "owner") url.searchParams.set(VIEW_PARAM, OWNER_VALUE);
    else url.searchParams.delete(VIEW_PARAM);
    window.history.replaceState(null, "", url);
    window.scrollTo({ top: 0 });
  }

  /** Switches views behind the striped yellow wipe (crossfade with reduced motion). */
  function showView(next: DemoView, nextArrival: string | null = null, dismissHint = true) {
    if (dismissHint) setHintDismissed(true);
    if (next === view && nextArrival === arrivalId) return;
    screenWipe(wipe.current, () => applyView(next, nextArrival));
  }

  function openBooking(request: BookRequest) {
    if (!data) return;
    setHintDismissed(true);
    setBooking({ ...request, key: Date.now() });
  }

  function handleReset() {
    reset();
    setBooking(null);
    setHintDismissed(false);
    applyView("client", null);
    toast(copy.resetDone);
  }

  return (
    <div ref={root}>
      {view === "client" ? (
        <GymSite config={config} onBook={openBooking} />
      ) : (
        <GymPanel
          key={arrivalId ?? "panel"}
          config={config}
          arrivalId={arrivalId}
          onTryFlow={() => {
            showView("client");
            setTimeout(() => openBooking({}), 700);
          }}
        />
      )}

      {booking && data && (
        <GymBooking
          key={booking.key}
          config={config}
          request={booking}
          onClose={() => setBooking(null)}
          onGoToPanel={(id) => {
            setBooking(null);
            showView("owner", id);
          }}
        />
      )}

      {!booking && (
        <ViewSwitch<DemoView>
          label={copy.switchLabel}
          options={[
            { id: "client", label: copy.clientView },
            { id: "owner", label: copy.ownerView },
          ]}
          active={view}
          onChange={(next) => next !== view && showView(next)}
          resetLabel={copy.reset}
          onReset={handleReset}
          raised={view === "owner"}
          hint={
            hintDismissed
              ? null
              : { text: copy.hint, dismissLabel: copy.hintDismiss, onDismiss: () => setHintDismissed(true) }
          }
        />
      )}

      <div ref={wipe} aria-hidden className={styles.wipe}>
        <span />
        <span />
      </div>
      <div ref={cursor} aria-hidden className={styles.cursor} />
      <div aria-hidden className={styles.grain} />
    </div>
  );
}
