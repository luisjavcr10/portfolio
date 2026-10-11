import type { FontKey } from "./fonts";

/* ------------------------------------------------------------------ */
/* Tenant configuration                                                */
/* Everything a client-specific demo needs, as plain serializable data. */
/* ------------------------------------------------------------------ */

export type ModuleId = "reservas" | "recordatorios" | "ventas" | "clientes";

/** A photo slot. Without `src` the UI shows a labelled placeholder. */
export type Photo = {
  src?: string;
  alt: string;
  /** Short description of the intended photo, shown on the placeholder. */
  hint: string;
};

export type ThemeConfig = {
  colors: {
    /** Page background. */
    base: string;
    /** Soft surfaces, dividers. */
    muted: string;
    /** Decorative accent (bars, progress). */
    accent: string;
    /** Accent dark enough for text (AA on base). */
    accentInk: string;
    /** Main buttons and selected states. */
    primary: string;
    ink: string;
    inkSoft: string;
  };
  fonts: { display: FontKey; body: FontKey; mono?: FontKey };
  /** Subtle film grain over the page. */
  grain: boolean;
};

/** Visual treatment of a category in the agenda and legends. */
export type CategoryTone = "muted" | "accent" | "primarySoft" | "primary";

export type Category = {
  id: string;
  name: string;
  kicker: string;
  blurb: string;
  tone: CategoryTone;
  photo: Photo;
};

export type Service = {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  /** Price is a starting price ("desde"). */
  from?: boolean;
  /** Minutes. */
  duration: number;
};

export type StaffMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  categoryIds: string[];
  photo: Photo;
};

/** Opening hours for a set of weekdays (0 = Sunday). Times are "HH:MM". */
export type OpeningHours = {
  label: string;
  weekdays: number[];
  open: string;
  close: string;
};

export type BookingCopy = {
  title: string;
  confirmedTitle: string;
  steps: [string, string, string, string];
  /** {service} is replaced with the chosen service name. */
  staffIntro: string;
  anyStaff: { name: string; role: string; note: string };
  anyStaffSummary: string;
  noSlots: { title: string; text: string };
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  privacyNote: string;
  errors: { name: string; phone: string; slotTaken: string };
  next: string;
  back: string;
  confirm: string;
  /** {name} is replaced with the client's first name. */
  doneTitle: string;
  doneText: string;
  /** {phone} is replaced with the client's phone. */
  reminderNote: string;
  goToPanel: string;
  backToSite: string;
  close: string;
};

/** Identity, look and contact details shared by every vertical. */
export type TenantBase = {
  id: string;
  name: string;
  tagline: string;
  theme: ThemeConfig;
  owner: { name: string; role: string; greeting: string };
  contact: {
    address: string;
    area: string;
    city: string;
    mapsUrl: string;
    /** `number` in international format without "+"; omit it to open WhatsApp without a recipient. */
    whatsapp: { display: string; number?: string; message: string };
    instagram: { handle: string; url: string };
  };
  hours: OpeningHours[];
  currency: { symbol: string; locale: string };
};

/** Appointment-based tenant (salon, clinic…): services booked with a staff member. */
export type TenantConfig<SiteCopy = unknown> = TenantBase & {
  /** Words that change per vertical (estilista / entrenador / doctora…). */
  vocabulary: { staff: string; client: string; clients: string };
  categories: Category[];
  services: Service[];
  staff: StaffMember[];
  modules: Record<ModuleId, boolean>;
  booking: {
    slotMinutes: number;
    /** Minimum minutes between now and a same-day booking. */
    leadMinutes: number;
    daysAhead: number;
    codePrefix: string;
    /** Phone validation for the client form. */
    phone: { countryCode: string; pattern: string };
    copy: BookingCopy;
  };
  /** Vertical-specific marketing copy (sections of the public site). */
  site: SiteCopy;
};

/* ------------------------------------------------------------------ */
/* Demo data (client-side store)                                       */
/* ------------------------------------------------------------------ */

export type ReminderStatus = "confirmed" | "no-reply" | "cancelled" | "scheduled";

export type Appointment = {
  id: string;
  code: string;
  clientName: string;
  /** National number, digits only. */
  phone: string;
  serviceId: string;
  staffId: string;
  /** Local date, "YYYY-MM-DD". */
  date: string;
  /** Minutes from midnight. */
  start: number;
  duration: number;
  status: "booked" | "confirmed" | "cancelled";
  source: "online" | "sample";
  reminder: ReminderStatus | null;
};

export type Client = {
  id: string;
  name: string;
  phone: string;
  /** Local date of the last visit, "YYYY-MM-DD". */
  lastVisit: string;
  lastServiceId: string;
  lastStaffId: string;
  /** Shown first in the "win back" list. */
  featured?: boolean;
};

export type Sale = {
  id: string;
  date: string;
  serviceId: string;
  amount: number;
};

export type DemoData = {
  /** Day the sample data was generated for; stale data is regenerated. */
  seededOn: string;
  appointments: Appointment[];
  clients: Client[];
  sales: Sale[];
  stats: { noShowRate: number; noShowRateBefore: number };
  /** Client ids already messaged today. */
  contacted: string[];
  /** Most recent online booking, highlighted in the owner panel. */
  lastBookingId: string | null;
};
