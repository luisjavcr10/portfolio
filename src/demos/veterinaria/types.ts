import type { StoreData } from "@/demos/core/store";

export type VetModule = "agenda" | "pacientes" | "recordatorios" | "peluqueria" | "caja";

export type Species = "perro" | "gato";

/** A vaccine, deworming or check-up in the pet's health card. */
export type HealthEvent = {
  id: string;
  label: string;
  kind: "vacuna" | "desparasitacion" | "control";
  /** "YYYY-MM-DD" */
  date: string;
  /** Applied (true) or upcoming (false). */
  done: boolean;
};

export type ConsultNote = { date: string; reason: string; staffId: string; text: string };

export type Patient = {
  id: string;
  name: string;
  species: Species;
  /** Empty until the first visit for pets booked online. */
  breed: string;
  sex: "Macho" | "Hembra" | null;
  age: string;
  record: string;
  owner: { name: string; phone: string };
  /** Monthly weights for the last 6 months, oldest first (kg). Null until the first visit. */
  weights: number[] | null;
  events: HealthEvent[];
  notes: ConsultNote[];
  photo?: string;
  /** Created by an online booking. */
  isNew?: boolean;
};

export type GroomingStatus = "recibido" | "bano" | "listo";

export type GroomingTicket = {
  id: string;
  patientId: string;
  serviceName: string;
  /** Minutes from midnight. */
  time: number;
  status: GroomingStatus;
  notified: boolean;
};

export type PaymentMethod = "yape" | "plin" | "tarjeta" | "efectivo";

export type Payment = {
  id: string;
  /** Minutes from midnight. */
  time: number;
  patientId: string;
  serviceId: string;
  amount: number;
  method: PaymentMethod;
  appointmentId?: string;
};

export type VetData = StoreData & {
  patients: Patient[];
  grooming: GroomingTicket[];
  /** Today's payments, newest last. */
  payments: Payment[];
  /** Revenue of past days ("YYYY-MM-DD" → soles), for the monthly KPI. */
  revenueByDay: Record<string, number>;
  /** Reminder ids ("patientId:eventId") already sent. */
  remindersSent: string[];
  stats: { remindersSentMonth: number; remindersBooked: number; returnRate: number };
};
