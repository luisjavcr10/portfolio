"use client";

import { useState } from "react";
import { BookingFlow, type BookingRequest } from "@/demos/core/components/BookingFlow";
import { ToastProvider } from "@/demos/core/components/Toast";
import { DEMO_NOTICE_HREF, ViewSwitch } from "@/demos/core/components/ViewSwitch";
import { DemoStoreProvider } from "@/demos/core/store";
import { themeStyle } from "@/demos/core/theme";
import theme from "@/demos/core/theme.module.css";
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
  const copy = config.site.demo;
  const [view, setView] = useState<DemoView>(initialView);
  const [booking, setBooking] = useState<(BookingRequest & { key: number }) | null>(null);
  const [arrivalId, setArrivalId] = useState<string | null>(null);

  function showView(next: DemoView, nextArrival: string | null = null) {
    setView(next);
    setArrivalId(nextArrival);
    const url = new URL(window.location.href);
    if (next === "owner") url.searchParams.set(VIEW_PARAM, OWNER_VALUE);
    else url.searchParams.delete(VIEW_PARAM);
    window.history.replaceState(null, "", url);
    window.scrollTo({ top: 0 });
  }

  function openBooking(request: BookingRequest) {
    setBooking({ ...request, key: Date.now() });
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
          notice={{ text: copy.notice, href: DEMO_NOTICE_HREF }}
          options={[
            { id: "client", label: copy.clientView },
            { id: "owner", label: copy.ownerView },
          ]}
          active={view}
          onChange={(next) => next !== view && showView(next)}
          raised={view === "owner"}
        />
      )}
    </>
  );
}
