import { addDays, parseTime } from "@/demos/core/dates";
import { createRandom } from "@/demos/core/random";
import { canPerform, hoursFor } from "@/demos/core/schedule";
import type { Appointment, Client, DemoData, ReminderStatus, Sale } from "@/demos/core/types";
import { salonConfig as config } from "./config";

/* Sample data for Casa Bruma. Every date is relative to `today`, so the demo never looks old. */

type SampleBooking = {
  staffId: string;
  time: string;
  client: string;
  serviceId: string;
  reminder?: ReminderStatus;
};

/** Today's agenda (from the design). */
const TODAY: SampleBooking[] = [
  { staffId: "valeria", time: "09:00", client: "Carla M.", serviceId: "tinte" },
  { staffId: "valeria", time: "11:30", client: "Fiorella C.", serviceId: "balayage" },
  { staffId: "valeria", time: "16:00", client: "Lucero R.", serviceId: "corte-dama" },
  { staffId: "diego", time: "09:30", client: "Renzo T.", serviceId: "corte-caballero" },
  { staffId: "diego", time: "10:30", client: "Jorge A.", serviceId: "corte-caballero" },
  { staffId: "diego", time: "12:00", client: "Sofía V.", serviceId: "corte-dama" },
  { staffId: "diego", time: "15:00", client: "Ana L.", serviceId: "brushing" },
  { staffId: "diego", time: "18:00", client: "Marco P.", serviceId: "corte-caballero" },
  { staffId: "camila", time: "10:00", client: "Paola G.", serviceId: "manicure" },
  { staffId: "camila", time: "13:00", client: "Daniela Q.", serviceId: "acrilicas" },
  { staffId: "camila", time: "17:00", client: "Katia S.", serviceId: "lifting" },
  { staffId: "rosa", time: "14:00", client: "Mariela P.", serviceId: "keratina" },
];

/** Tomorrow's appointments, whose reminders went out today. */
const TOMORROW: SampleBooking[] = [
  { staffId: "diego", time: "09:00", client: "Brenda O.", serviceId: "corte-dama", reminder: "confirmed" },
  { staffId: "diego", time: "10:00", client: "Luis E.", serviceId: "corte-caballero", reminder: "confirmed" },
  { staffId: "valeria", time: "11:00", client: "Rocío A.", serviceId: "balayage", reminder: "no-reply" },
  { staffId: "camila", time: "13:30", client: "Vanessa T.", serviceId: "manicure", reminder: "confirmed" },
  { staffId: "rosa", time: "15:00", client: "Claudia N.", serviceId: "keratina", reminder: "cancelled" },
  { staffId: "camila", time: "17:30", client: "Ximena B.", serviceId: "lifting", reminder: "confirmed" },
];

/** Clients highlighted in "Te extrañamos" (from the design). */
const FEATURED_LAPSED = [
  { name: "Andrea Salazar", days: 52, serviceId: "balayage", staffId: "valeria", phone: "945112870" },
  { name: "Gabriela Ríos", days: 61, serviceId: "keratina", staffId: "rosa", phone: "961304552" },
  { name: "Patricia Vega", days: 47, serviceId: "acrilicas", staffId: "camila", phone: "978220116" },
  { name: "Milagros Chávez", days: 73, serviceId: "tinte", staffId: "valeria", phone: "949870331" },
  { name: "Karen Ugaz", days: 58, serviceId: "lifting", staffId: "camila", phone: "953667204" },
];

const FIRST_NAMES = [
  "Alessandra", "Bianca", "Camila", "Diana", "Elena", "Fabiola", "Giuliana", "Hilda", "Isabel", "Jimena",
  "Kiara", "Lorena", "Mónica", "Natalia", "Olga", "Pamela", "Rebeca", "Silvia", "Tatiana", "Úrsula",
  "Valentina", "Wendy", "Yesenia", "Zoila", "Andrés", "Bruno", "César", "Daniel", "Eduardo", "Gonzalo",
];
const INITIALS = "ABCDEFGHIJLMNOPQRSTVZ";

/** Weekly revenue for the previous 7 weeks, oldest first (soles). */
const PAST_WEEKS = [3480, 3720, 3610, 3950, 4020, 3890, 4120];
/** Revenue of the last 6 days; today's agenda completes the current week. */
const CURRENT_WEEK_PAST_DAYS = 3950;

/** How often each service is sold, for sample sales and future bookings. */
const POPULARITY: Record<string, number> = {
  "corte-dama": 42,
  manicure: 36,
  brushing: 29,
  tinte: 18,
  balayage: 12,
  "corte-caballero": 10,
  pedicure: 8,
  acrilicas: 7,
  hidratante: 6,
  lifting: 6,
  keratina: 5,
};

function service(id: string) {
  const found = config.services.find((s) => s.id === id);
  if (!found) throw new Error(`Unknown service ${id}`);
  return found;
}

function toAppointment(booking: SampleBooking, date: string, index: number): Appointment {
  const s = service(booking.serviceId);
  return {
    id: `sample-${date}-${index}`,
    code: `CB-${2000 + index}`,
    clientName: booking.client,
    phone: "",
    serviceId: s.id,
    staffId: booking.staffId,
    date,
    start: parseTime(booking.time),
    duration: s.duration,
    status: booking.reminder === "cancelled" ? "cancelled" : "confirmed",
    source: "sample",
    reminder: booking.reminder ?? null,
  };
}

/** Keeps sample bookings inside the opening hours of their day (e.g. shorter Sundays). */
function withinHours(date: string) {
  const hours = hoursFor(config, date);
  return (booking: SampleBooking) => {
    if (!hours) return false;
    const start = parseTime(booking.time);
    return start >= hours.open && start + service(booking.serviceId).duration <= hours.close;
  };
}

function sampleClientName(random: ReturnType<typeof createRandom>) {
  return `${random.pick(FIRST_NAMES)} ${random.pick(INITIALS.split(""))}.`;
}

/** Fills the coming days with a realistic share of busy slots. */
function upcomingAppointments(today: string): Appointment[] {
  const result: Appointment[] = [];
  for (let offset = 2; offset < config.booking.daysAhead + 1; offset++) {
    const date = addDays(today, offset);
    const hours = hoursFor(config, date);
    if (!hours) continue;

    for (const member of config.staff) {
      const random = createRandom(`${date}-${member.id}`);
      const options = config.services
        .filter((s) => canPerform(member, s))
        .map((s) => ({ value: s, weight: POPULARITY[s.id] ?? 1 }));
      let cursor = hours.open + random.int(0, 2) * 30;
      while (cursor < hours.close) {
        if (random.next() < 0.45) {
          cursor += 30 * random.int(1, 3);
          continue;
        }
        const s = random.weighted(options);
        if (cursor + s.duration > hours.close) break;
        result.push({
          id: `sample-${date}-${member.id}-${cursor}`,
          code: `CB-${3000 + result.length}`,
          clientName: sampleClientName(random),
          phone: "",
          serviceId: s.id,
          staffId: member.id,
          date,
          start: cursor,
          duration: s.duration,
          status: "confirmed",
          source: "sample",
          reminder: null,
        });
        cursor += Math.ceil(s.duration / 30) * 30;
      }
    }
  }
  return result;
}

/** Sales of the past 8 weeks, adding up to the weekly totals above. */
function sampleSales(today: string): Sale[] {
  const random = createRandom(`sales-${today}`);
  const options = config.services.map((s) => ({ value: s, weight: POPULARITY[s.id] ?? 1 }));
  const sales: Sale[] = [];

  const windows = [
    ...PAST_WEEKS.map((target, i) => {
      const weeksAgo = PAST_WEEKS.length - i;
      const end = addDays(today, -7 * weeksAgo);
      return { target, from: addDays(end, -6), days: 7 };
    }),
    { target: CURRENT_WEEK_PAST_DAYS, from: addDays(today, -6), days: 6 },
  ];

  for (const window of windows) {
    let total = 0;
    while (total < window.target - 20) {
      const s = random.weighted(options);
      const amount = s.from ? s.price + random.int(0, 4) * 10 : s.price;
      if (total + amount > window.target + 15) continue;
      sales.push({
        id: `sale-${sales.length}`,
        date: addDays(window.from, random.int(0, window.days - 1)),
        serviceId: s.id,
        amount,
      });
      total += amount;
    }
  }
  return sales;
}

function sampleClients(today: string): Client[] {
  const random = createRandom(`clients-${today}`);
  const featured: Client[] = FEATURED_LAPSED.map((c, i) => ({
    id: `client-featured-${i}`,
    name: c.name,
    phone: c.phone,
    lastVisit: addDays(today, -c.days),
    lastServiceId: c.serviceId,
    lastStaffId: c.staffId,
    featured: true,
  }));

  const others: Client[] = Array.from({ length: 40 }, (_, i) => {
    const s = random.weighted(config.services.map((x) => ({ value: x, weight: POPULARITY[x.id] ?? 1 })));
    const staff = config.staff.find((m) => canPerform(m, s)) ?? config.staff[0];
    // 22 clients over 45 days away (27 with the featured ones), the rest recent.
    const daysAway = i < 22 ? random.int(46, 140) : random.int(3, 40);
    return {
      id: `client-${i}`,
      name: sampleClientName(random),
      phone: `9${String(random.int(10_000_000, 99_999_999))}`,
      lastVisit: addDays(today, -daysAway),
      lastServiceId: s.id,
      lastStaffId: staff.id,
    };
  });

  return [...featured, ...others];
}

export function createSalonSeed(today: string): DemoData {
  const tomorrow = addDays(today, 1);
  return {
    seededOn: today,
    appointments: [
      ...TODAY.filter(withinHours(today)).map((b, i) => toAppointment(b, today, i)),
      ...TOMORROW.filter(withinHours(tomorrow)).map((b, i) => toAppointment(b, tomorrow, 100 + i)),
      ...upcomingAppointments(today),
    ],
    clients: sampleClients(today),
    sales: sampleSales(today),
    stats: { noShowRate: 3, noShowRateBefore: 14 },
    contacted: [],
    lastBookingId: null,
  };
}
