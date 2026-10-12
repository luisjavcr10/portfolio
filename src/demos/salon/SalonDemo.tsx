"use client";

import { useState } from "react";
import { BookingFlow, type BookingRequest } from "@/demos/core/components/BookingFlow";
import { ToastProvider } from "@/demos/core/components/Toast";
import { DEMO_NOTICE_HREF, ViewSwitch } from "@/demos/core/components/ViewSwitch";
import { DemoStoreProvider } from "@/demos/core/store";
import { themeStyle } from "@/demos/core/theme";
import theme from "@/demos/core/theme.module.css";
import { salonConfig as config } from "./config";
import { OwnerPanel } from "./panel/OwnerPanel";
import { createSalonSeed } from "./seed";
import { SalonSite } from "./site/SalonSite";

export type DemoView = "client" | "owner";

const VIEW_PARAM = "vista";
const OWNER_VALUE = "dueno";
const STORAGE_KEY = `demo:${config.id}:v1`;

/** Casa Bruma demo: public site and owner panel sharing one client-side store. */
export function SalonDemo({ initialView, fontClassName }: { initialView: DemoView; fontClassName: string }) {
  return (
    <div
      className={[theme.root, config.theme.grain ? theme.grain : "", fontClassName].join(" ")}
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
