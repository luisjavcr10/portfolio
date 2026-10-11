"use client";

import { useState } from "react";
import { BookingFlow, type BookingRequest } from "@/demos/core/components/BookingFlow";
import { ToastProvider, useToast } from "@/demos/core/components/Toast";
import { ViewSwitch } from "@/demos/core/components/ViewSwitch";
import { DemoStoreProvider, useDemoStore } from "@/demos/core/store";
import { themeFontClasses, themeStyle } from "@/demos/core/theme";
import theme from "@/demos/core/theme.module.css";
import { useStoredFlag } from "@/demos/core/useStoredFlag";
import { salonConfig as config } from "./config";
import { OwnerPanel } from "./panel/OwnerPanel";
import { createSalonSeed } from "./seed";
import { SalonSite } from "./site/SalonSite";

export type DemoView = "client" | "owner";

const VIEW_PARAM = "vista";
const OWNER_VALUE = "dueno";
const STORAGE_KEY = `demo:${config.id}:v1`;
const HINT_KEY = `demo:${config.id}:hint-dismissed`;

/** Casa Bruma demo: public site and owner panel sharing one client-side store. */
export function SalonDemo({ initialView }: { initialView: DemoView }) {
  return (
    <div
      className={[theme.root, config.theme.grain ? theme.grain : "", themeFontClasses(config.theme)].join(" ")}
      style={themeStyle(config.theme)}
    >
      {/* Match the page background to the tenant (visible on overscroll). */}
      <style href={`tenant-${config.id}`} precedence="default">
        {`body{background:${config.theme.colors.base}}`}
      </style>
      <DemoStoreProvider storageKey={STORAGE_KEY} createSeed={createSalonSeed}>
        <ToastProvider>
          <Demo initialView={initialView} />
        </ToastProvider>
      </DemoStoreProvider>
    </div>
  );
}

function Demo({ initialView }: { initialView: DemoView }) {
  const { reset } = useDemoStore();
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
        <SalonSite config={config} onBook={config.modules.reservas ? openBooking : undefined} />
      ) : (
        <OwnerPanel
          key={arrivalId ?? "panel"}
          config={config}
          arrivalId={arrivalId}
          onTryBooking={() => {
            showView("client");
            openBooking({ serviceId: null, staffId: null });
          }}
        />
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
