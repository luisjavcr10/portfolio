import type { Photo, TenantBase } from "@/demos/core/types";

/* ------------------------------------------------------------------ */
/* Gym tenant configuration                                            */
/* ------------------------------------------------------------------ */

export type Plan = {
  id: string;
  name: string;
  price: number;
  /** "/mes", "/3 meses"… */
  period: string;
  blurb: string;
  features: { text: string; included: boolean }[];
  /** Pill in the card header ("El más elegido", "Ahorras S/ 48"). */
  badge?: string;
  /** Highlighted (yellow) card. */
  featured?: boolean;
  cta: string;
};

export type Coach = {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  photo: Photo;
};

export type GymClass = {
  id: string;
  name: string;
  coachId: string;
  /** Minutes. */
  duration: number;
  description: string;
  photo: Photo;
};

/** A weekly recurring session. Weekdays use Date#getDay (0 = Sunday). */
export type ScheduleEntry = { classId: string; weekdays: number[]; time: string };

export type Result = {
  id: string;
  name: string;
  stat: string;
  time: string;
  plan: string;
  how: string;
  before: Photo;
  after: Photo;
};

export type Testimonial = { result: string; quote: string; name: string; meta: string };

export type SampleMember = { id: string; name: string; plan: string; daysAway: number };
export type SampleDebt = { id: string; name: string; plan: string; amount: number; due: string };
export type SamplePayment = { name: string; plan: string; amount: number; method: string; time: string };

export type GymConfig = TenantBase & {
  /** People per class. */
  capacity: number;
  plans: Plan[];
  classes: GymClass[];
  coaches: Coach[];
  schedule: ScheduleEntry[];
  booking: {
    daysAhead: number;
    /** Minimum minutes between now and a same-day class. */
    leadMinutes: number;
    codePrefix: string;
    phone: { countryCode: string; pattern: string };
    goals: string[];
  };
  results: Result[];
  testimonials: Testimonial[];
  rating: { score: string; reviews: number };
  /** Sample data for the owner panel. */
  sample: {
    activeMembers: number;
    newMembers: number;
    expiringThisWeek: number;
    monthRevenue: number;
    revenueChange: number;
    previousMonth: string;
    pendingDebt: number;
    monthLeads: number;
    monthLeadsCame: number;
    monthLeadsJoined: number;
    paymentMix: { method: string; amount: number }[];
    payments: SamplePayment[];
    debts: SampleDebt[];
    atRisk: SampleMember[];
    checkinNames: string[];
    zones: string[];
    planNames: string[];
  };
  messages: {
    /** {name} {class} {when} {time} {owner} */
    confirmLead: string;
    /** {name} */
    winBack: string;
    /** {name} {amount} {plan} */
    debtReminder: string;
  };
  site: GymSiteCopy;
};

export type GymSiteCopy = {
  nav: { label: string; href: string }[];
  headerCta: string;
  hero: {
    promo: string;
    address: string;
    titleTop: string;
    titleBottom: string;
    lead: string;
    primary: string;
    secondary: string;
    trust: string[];
    image: { desktop: string; mobile: string; alt: string };
  };
  marquee: [string, string];
  numbers: {
    kicker: string;
    title: string;
    text: string;
    stats: { value: number; prefix?: string; label: string }[];
    bpm: string;
  };
  plans: { kicker: string; title: string; text: string; loadLabel: string; platesLabel: string };
  classes: { kicker: string; title: string; cta: string; closingKicker: string; closingTitle: string; closingCta: string };
  schedule: { kicker: string; title: string; text: string; filterLabel: string; all: string; today: string; empty: string };
  coaches: { kicker: string; title: string };
  results: { kicker: string; title: string; compareLabel: string; before: string; after: string };
  testimonials: { kicker: string; title: string; reviewsLabel: string };
  location: { kicker: string; title: string; badge: string; image: Photo };
  cta: { title: string; button: string; text: string; plate: Photo };
  footer: { tagline: string; note: string };
  decor: { dumbbell: Photo };
  flow: {
    title: string;
    steps: [string, string, string];
    stepLabel: string;
    doneLabel: string;
    dayQuestion: string;
    timeQuestion: string;
    noTimes: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    goalLabel: string;
    errors: { name: string; phone: string; goal: string; full: string };
    summary: string;
    next: string;
    back: string;
    confirm: string;
    close: string;
    doneTitle: string;
    doneText: string;
    pass: { brand: string; label: string; name: string; when: string; coach: string; code: string; show: string; admits: string };
    goToPanel: string;
  };
  demo: {
    switchLabel: string;
    /** Always-visible label that says the business is made up. */
    notice: string;
    clientView: string;
    ownerView: string;
  };
  panel: GymPanelCopy;
};

export type GymPanelCopy = {
  badge: string;
  tabs: { id: "hoy" | "socios" | "leads" | "clases" | "pagos"; label: string }[];
  navLabel: string;
  greeting: string;
  training: string;
  openUntil: string;
  closedUntil: string;
  newLeadTag: string;
  leadDetails: string;
  writeLead: string;
  markAttended: string;
  attended: string;
  emptyLead: string;
  tryFlow: string;
  kpis: {
    members: string;
    membersNote: string;
    expiring: string;
    expiringNote: string;
    revenue: string;
    revenueNote: string;
    leads: string;
    leadsToday: string;
    leadsNote: string;
  };
  checkins: { title: string; live: string; entered: string };
  today: { title: string; capacity: string; full: string; empty: string };
  heat: { title: string; peak: string; less: string; more: string; closed: string; people: string };
  risk: { title: string; note: string; send: string; sent: string; awayPrefix: string; days: string; toast: string };
  funnel: {
    title: string;
    tag: string;
    stages: [string, string, string];
    states: { new: string; came: string; joined: string; noShow: string };
  };
  payments: { title: string; collected: string; pending: string; today: string; owe: string; remind: string; reminded: string; toast: string };
};
