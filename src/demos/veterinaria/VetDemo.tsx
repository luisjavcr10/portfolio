"use client";

import { useState } from "react";
import { BookingFlow, type BookingRequest } from "@/demos/core/components/BookingFlow";
import { ToastProvider, useToast } from "@/demos/core/components/Toast";
import { ViewSwitch } from "@/demos/core/components/ViewSwitch";
import { DemoStoreProvider, useDemoStore } from "@/demos/core/store";
import { themeStyle } from "@/demos/core/theme";
import theme from "@/demos/core/theme.module.css";
import { useStoredFlag } from "@/demos/core/useStoredFlag";
import { vetConfig as config } from "./config";
import { VetPanel } from "./panel/VetPanel";
import { createVetSeed, onVetBook } from "./seed";
import { VetSite } from "./site/VetSite";
import type { VetData } from "./types";
import styles from "./vet.module.css";

export type DemoView = "client" | "owner";

const VIEW_PARAM = "vista";
const OWNER_VALUE = "dueno";
const STORAGE_KEY = `demo:${config.id}:v1`;
const HINT_KEY = `demo:${config.id}:hint-dismissed`;

/** KusiVet demo: public site and clinic panel sharing one client-side store. */
export function VetDemo({ initialView, fontClassName }: { initialView: DemoView; fontClassName: string }) {
  return (
    <div className={`${theme.root} ${fontClassName}`} style={themeStyle(config.theme)}>
      {/* Match the page background to the tenant (visible on overscroll). */}
      <style href={`tenant-${config.id}`} precedence="default">
        {`body{background:${config.theme.colors.base}}`}
      </style>
      {/* Clinic tokens on an inner wrapper so they override the shared theme defaults. */}
      <div className={styles.root}>
        <DemoStoreProvider<VetData> storageKey={STORAGE_KEY} createSeed={createVetSeed} onBook={onVetBook}>
          <ToastProvider>
            <Demo initialView={initialView} />
          </ToastProvider>
        </DemoStoreProvider>
      </div>
    </div>
  );
}

function Demo({ initialView }: { initialView: DemoView }) {
  const { reset } = useDemoStore<VetData>();
  const toast = useToast();
  const copy = config.site.demo;
  const [view, setView] = useState<DemoView>(initialView);
  const [booking, setBooking] = useState<(BookingRequest & { key: number }) | null>(null);
  const [arrivalId, setArrivalId] = useState<string | null>(null);
  const [hintDismissed, setHintDismissed] = useStoredFlag(HINT_KEY);

  function showView(next: DemoView, nextArrival: string | null = null, dismissHint = true) {
    setView(next);
    setArrivalId(nextArrival);
    if (dismissHint) setHintDismissed(true);
    const url = new URL(window.location.href);
    if (next === "owner") url.searchParams.set(VIEW_PARAM, OWNER_VALUE);
    else url.searchParams.delete(VIEW_PARAM);
    window.history.replaceState(null, "", url);
    window.scrollTo({ top: 0 });
  }

  function openBooking(request: BookingRequest) {
    setBooking({ ...request, key: Date.now() });
  }

  function handleReset() {
    reset();
    setBooking(null);
    setHintDismissed(false);
    showView("client", null, false);
    toast(copy.resetDone);
  }

  return (
    <>
      {view === "client" ? (
        <VetSite config={config} onBook={openBooking} />
      ) : (
        <VetPanel key={arrivalId ?? "panel"} config={config} arrivalId={arrivalId} />
      )}

      {booking && (
        <BookingFlow
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
    </>
  );
}
