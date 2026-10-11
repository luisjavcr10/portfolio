import type { ReactNode } from "react";

/* Line icons for the KusiVet demo (24×24, drawn with currentColor). Inline SVG keeps
   the page free of an icon font. */

const ICONS = {
  paw: (
    <g fill="currentColor" stroke="none">
      <ellipse cx="6" cy="10.5" rx="2.2" ry="2.8" />
      <ellipse cx="9.8" cy="5.8" rx="2.2" ry="2.8" />
      <ellipse cx="14.2" cy="5.8" rx="2.2" ry="2.8" />
      <ellipse cx="18" cy="10.5" rx="2.2" ry="2.8" />
      <path d="M12 11.5c-3 0-6 4.2-6 6.6 0 1.6 1.2 2.4 2.7 2.4 1.3 0 2-.6 3.3-.6s2 .6 3.3.6c1.5 0 2.7-.8 2.7-2.4 0-2.4-3-6.6-6-6.6z" />
    </g>
  ),
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevronLeft: <path d="m15 18-6-6 6-6" />,
  star: (
    <path
      fill="currentColor"
      stroke="none"
      d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9z"
    />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 6.5V12l3.5 2" />
    </>
  ),
  chat: <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.9-.9L3 21l1.9-5.1A8.4 8.4 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5z" />,
  check: <path d="M20 6 9 17l-5-5" />,
  checks: <path d="M17 6 7 16.5 2.5 12M22 9l-7.5 7.5-1.5-1.5" />,
  bell: <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0" />,
  stethoscope: (
    <>
      <path d="M5 3H4a1.5 1.5 0 0 0-1.5 1.5V9a5.5 5.5 0 0 0 11 0V4.5A1.5 1.5 0 0 0 12 3h-1" />
      <path d="M8 14.5v1a5.5 5.5 0 0 0 11 0V12" />
      <circle cx="19" cy="10" r="2" />
    </>
  ),
  syringe: <path d="m18 2 4 4M17 7l3-3M19 9 8.7 19.3a2.4 2.4 0 0 1-3.4 0l-.6-.6a2.4 2.4 0 0 1 0-3.4L15 5M9 11l4 4M5 19l-3 3M14 4l6 6" />,
  pill: <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7zM8.5 8.5l7 7" />,
  shower: <path d="m4 4 2.5 2.5M13.5 6.5a4.95 4.95 0 0 0-7 7M15 5 5 15M14 17v.01M10 16v.01M13 13v.01M16 10v.01M11 20v.01M17 14v.01M20 11v.01" />,
  bandage: (
    <>
      <rect x="2" y="6" width="20" height="12" rx="3" />
      <path d="M7 6v12M17 6v12M10.5 10.5h.01M13.5 10.5h.01M10.5 13.5h.01M13.5 13.5h.01" />
    </>
  ),
  heartPulse: (
    <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7zM3.2 12h6.3l.5-1 2 4.5 2-7 1.5 3.5h5.3" />
  ),
  tooth: (
    <path d="M12 5.5C10.5 4 9 3.5 7.5 3.5 5 3.5 3.5 5.5 3.5 8c0 3 1.5 4.5 2 7 .4 2 .8 5.5 2.5 5.5 2 0 1.5-5 4-5s2 5 4 5c1.7 0 2.1-3.5 2.5-5.5.5-2.5 2-4 2-7 0-2.5-1.5-4.5-4-4.5-1.5 0-3 .5-4.5 2z" />
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  cross: <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" />,
  directions: <path d="m3 11 19-9-9 19-2-8z" />,
  plus: <path d="M12 5v14M5 12h14" />,
  today: (
    <>
      <rect x="3" y="4.5" width="18" height="17" rx="2.5" />
      <path d="M16 2.5v4M8 2.5v4M3 10h18" />
      <rect x="7.5" y="13.5" width="4" height="4" rx="1" fill="currentColor" stroke="none" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4.5" width="18" height="17" rx="2.5" />
      <path d="M16 2.5v4M8 2.5v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </>
  ),
  calendarCheck: (
    <>
      <rect x="3" y="4.5" width="18" height="17" rx="2.5" />
      <path d="M16 2.5v4M8 2.5v4M3 10h18M9 15.5l2 2 4-4" />
    </>
  ),
  wallet: (
    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
  ),
  send: <path d="m22 2-7 20-4-9-9-4zM22 2 11 13" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7.5" />
      <path d="m21 21-4.6-4.6" />
    </>
  ),
  smartphone: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2.5" />
      <path d="M12 18h.01" />
    </>
  ),
  bolt: <path d="M13 2 3 14h9l-1 8 10-12h-9z" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  restart: <path d="M3 12a9 9 0 1 0 9-9 9.8 9.8 0 0 0-6.7 2.7L3 8M3 3v5h5" />,
  qr: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3" />
    </>
  ),
  card: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2.5" />
      <path d="M2 10h20M6 15h4" />
    </>
  ),
  cash: (
    <>
      <rect x="2" y="6" width="20" height="12" rx="2.5" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6 12h.01M18 12h.01" />
    </>
  ),
  loader: <path d="M21 12a9 9 0 1 1-6.2-8.6" />,
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof ICONS;

type IconProps = { name: IconName; size?: number; className?: string };

/** Decorative icon; give the surrounding control its own accessible name. */
export function Icon({ name, size = 22, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      className={className}
    >
      {ICONS[name]}
    </svg>
  );
}
