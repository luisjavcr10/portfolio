import type { Metadata, Viewport } from "next";
import "./demos.css";

/*
 * Root layout for client demos. Separate from the portfolio's [lang] layout so
 * demos get none of its header, footer, fonts or global styles. Spanish only.
 */

export const metadata: Metadata = {
  title: { template: "%s · Demo", default: "Demos" },
  robots: { index: false, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function DemosLayout({ children }: LayoutProps<"/demos">) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
