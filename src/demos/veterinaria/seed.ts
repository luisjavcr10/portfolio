import { addDays, parseTime, weekday } from "@/demos/core/dates";
import { createRandom } from "@/demos/core/random";
import { canPerform, getService, hoursFor } from "@/demos/core/schedule";
import type { Appointment } from "@/demos/core/types";
import { vetConfig as config } from "./config";
import type { HealthEvent, Patient, Payment, PaymentMethod, Species, VetData } from "./types";

/* Sample data for KusiVet. Every date is relative to `today`, so the demo never looks old. */

type Random = ReturnType<typeof createRandom>;

/** Days from `today` to the next given weekday, at least `min` days ahead. */
function daysToWeekday(today: string, dow: number, min = 2): number {
  let n = (dow - weekday(today) + 7) % 7;
  if (n < min) n += 7;
  return n;
}

const event = (id: string, label: string, kind: HealthEvent["kind"], date: string, done = true): HealthEvent => ({
  id,
  label,
  kind,
  date,
  done,
});

/* ------------------------------------------------------------------ */
/* Featured patients (from the design, with photos)                    */
/* ------------------------------------------------------------------ */

function featuredPatients(today: string): Patient[] {
  const d = (days: number) => addDays(today, days);
  // Upcoming items that feed the reminders list (all within the next 7 days).
  const ottoNext = daysToWeekday(today, 5, 4);
  const nalaNext = Math.min(daysToWeekday(today, 6), 6);

  return [
    {
      id: "otto",
      name: "Otto",
      species: "perro",
      breed: "Pastor alemán",
      sex: "Macho",
      age: "3 años",
      record: "00482",
      owner: { name: "Lucía Fernández", phone: "987214563" },
      weights: [30.1, 30.8, 31.4, 31.9, 32.1, 32.4],
      photo: "/demos/veterinaria/pet-otto.webp",
      events: [
        event("e1", "Séxtuple · 1.ª dosis", "vacuna", d(-1032)),
        event("e2", "Séxtuple · refuerzo", "vacuna", d(-1004)),
        event("e3", "Antirrábica", "vacuna", d(-358)),
        event("e4", "Desparasitación interna", "desparasitacion", d(-44)),
        event("e5", "Antirrábica", "vacuna", d(Math.min(ottoNext, 7)), false),
        event("e6", "Desparasitación interna", "desparasitacion", d(48), false),
      ],
      notes: [
        {
          date: d(-39),
          reason: "Control general",
          staffId: "fiorella",
          text: "Buen estado general. Subió 300 g desde el último control: bajar premios y mantener dos paseos al día.",
        },
        {
          date: d(-119),
          reason: "Dermatitis leve",
          staffId: "mauricio",
          text: "Enrojecimiento entre los dedos. Champú medicado dos veces por semana durante tres semanas. Mejoró en el control.",
        },
      ],
    },
    {
      id: "michi",
      name: "Michi",
      species: "gato",
      breed: "Persa",
      sex: "Macho",
      age: "5 años",
      record: "00317",
      owner: { name: "Carlos Rojas", phone: "956330128" },
      weights: [4.9, 4.8, 4.8, 4.7, 4.6, 4.6],
      photo: "/demos/veterinaria/pet-michi.webp",
      events: [
        event("e1", "Triple felina", "vacuna", d(-213)),
        event("e2", "Antirrábica", "vacuna", d(-213)),
        event("e3", "Desparasitación interna", "desparasitacion", d(19), false),
      ],
      notes: [
        {
          date: d(-3),
          reason: "Ecografía abdominal",
          staffId: "mauricio",
          text: "Riñones de tamaño normal. Mantener dieta renal y agua fresca en dos puntos de la casa.",
        },
      ],
    },
    {
      id: "luna",
      name: "Luna",
      species: "perro",
      breed: "Beagle",
      sex: "Hembra",
      age: "2 años",
      record: "00655",
      owner: { name: "Andrea Castillo", phone: "912447905" },
      weights: [10.6, 10.9, 11.1, 11.2, 11.4, 11.4],
      photo: "/demos/veterinaria/pet-luna.webp",
      events: [
        event("e1", "Séxtuple anual", "vacuna", d(-361)),
        event("e2", "Desparasitación externa", "desparasitacion", d(-11)),
        event("e3", "Séxtuple anual", "vacuna", d(4), false),
      ],
      notes: [
        { date: d(-14), reason: "Baño y corte", staffId: "rosa", text: "Baño antipulgas. Piel y oídos en buen estado." },
      ],
    },
    {
      id: "rocky",
      name: "Rocky",
      species: "perro",
      breed: "Golden retriever",
      sex: "Macho",
      age: "7 años",
      record: "00128",
      owner: { name: "Jorge Vega", phone: "948120377" },
      weights: [32.4, 32.1, 31.9, 31.8, 31.6, 31.5],
      photo: "/demos/veterinaria/pet-rocky.webp",
      events: [
        event("e1", "Antirrábica", "vacuna", d(-161)),
        event("e2", "Desparasitación interna", "desparasitacion", d(2), false),
      ],
      notes: [
        {
          date: today,
          reason: "Consulta general",
          staffId: "fiorella",
          text: "Leve rigidez al levantarse. Se indica suplemento articular y control en un mes.",
        },
      ],
    },
    {
      id: "nala",
      name: "Nala",
      species: "gato",
      breed: "Mestiza atigrada",
      sex: "Hembra",
      age: "1 año",
      record: "00871",
      owner: { name: "Valeria Chávez", phone: "965802114" },
      weights: [2.6, 2.9, 3.1, 3.2, 3.3, 3.4],
      photo: "/demos/veterinaria/pet-nala.webp",
      events: [
        event("e1", "Triple felina · 1.ª dosis", "vacuna", d(-305)),
        event("e2", "Triple felina · refuerzo", "vacuna", d(nalaNext), false),
      ],
      notes: [
        {
          date: today,
          reason: "Vacunación",
          staffId: "fiorella",
          text: "Sin reacciones. Lista para esterilización a partir del próximo mes.",
        },
      ],
    },
    {
      id: "coco",
      name: "Coco",
      species: "perro",
      breed: "Shih tzu",
      sex: "Macho",
      age: "9 años",
      record: "00094",
      owner: { name: "Patricia Salazar", phone: "934615290" },
      weights: [8.4, 8.2, 8.1, 7.9, 7.8, 7.8],
      photo: "/demos/veterinaria/pet-coco.webp",
      events: [
        event("e1", "Antirrábica", "vacuna", d(-262)),
        event("e2", "Control dermatológico", "control", d(3), false),
      ],
      notes: [
        {
          date: today,
          reason: "Dermatología",
          staffId: "mauricio",
          text: "Alergia ambiental. Se cambia a champú con avena y se revisa en una semana.",
        },
      ],
    },
    {
      id: "toby",
      name: "Toby",
      species: "perro",
      breed: "Mestizo",
      sex: "Macho",
      age: "4 años",
      record: "00533",
      owner: { name: "Milagros Paz", phone: "951208744" },
      weights: [14.2, 14.5, 14.4, 14.8, 15.0, 15.1],
      photo: "/demos/veterinaria/pet-toby.webp",
      events: [
        event("e1", "Séxtuple anual", "vacuna", d(-365)),
        event("e2", "Desparasitación interna", "desparasitacion", d(-88)),
        event("e3", "Séxtuple anual", "vacuna", today, false),
      ],
      notes: [
        { date: d(-88), reason: "Desparasitación", staffId: "fiorella", text: "Peso estable. Próxima vacuna en su fecha." },
      ],
    },
    {
      id: "kira",
      name: "Kira",
      species: "perro",
      breed: "Pastor alemán",
      sex: "Hembra",
      age: "3 meses",
      record: "00927",
      owner: { name: "Sofía Mendoza", phone: "973410285" },
      weights: [4.1, 5.6, 7.2, 8.9, 10.4, 11.8],
      photo: "/demos/veterinaria/pet-kira.webp",
      events: [
        event("e1", "Séxtuple · 1.ª dosis", "vacuna", d(-35)),
        event("e2", "Desparasitación interna", "desparasitacion", d(-35)),
        event("e3", "Séxtuple · 2.ª dosis", "vacuna", d(-7)),
        event("e4", "Séxtuple · 3.ª dosis", "vacuna", d(21), false),
      ],
      notes: [
        {
          date: d(-7),
          reason: "Control de cachorro",
          staffId: "fiorella",
          text: "Crece bien. Socializar con otros perros vacunados y seguir con alimento de cachorro.",
        },
      ],
    },
    {
      id: "bruno",
      name: "Bruno",
      species: "perro",
      breed: "Mestizo",
      sex: "Macho",
      age: "6 años",
      record: "00702",
      owner: { name: "Rocío Gutiérrez", phone: "944870312" },
      weights: [18.9, 19.1, 19.0, 19.4, 19.3, 19.5],
      photo: "/demos/veterinaria/pet-bruno.webp",
      events: [
        event("e1", "Antirrábica", "vacuna", d(-140)),
        event("e2", "Desparasitación interna", "desparasitacion", d(5), false),
      ],
      notes: [
        {
          date: d(-30),
          reason: "Consulta general",
          staffId: "mauricio",
          text: "Sarro moderado en molares. Se agenda limpieza dental con sedación.",
        },
      ],
    },
    {
      id: "max",
      name: "Max",
      species: "perro",
      breed: "Mestizo",
      sex: "Macho",
      age: "2 años",
      record: "00811",
      owner: { name: "Diego Ruiz", phone: "962015873" },
      weights: [21.0, 21.4, 21.9, 22.1, 22.0, 22.3],
      photo: "/demos/veterinaria/pet-max.webp",
      events: [
        event("e1", "Séxtuple anual", "vacuna", d(-120)),
        event("e2", "Antirrábica", "vacuna", d(-120)),
        event("e3", "Control posoperatorio", "control", d(10), false),
      ],
      notes: [
        {
          date: d(-6),
          reason: "Evaluación prequirúrgica",
          staffId: "fiorella",
          text: "Análisis normales. Ayuno de 8 horas antes de la esterilización.",
        },
      ],
    },
    {
      id: "simba",
      name: "Simba",
      species: "gato",
      breed: "Mestizo naranja",
      sex: "Macho",
      age: "4 años",
      record: "00590",
      owner: { name: "Gabriela León", phone: "981336420" },
      weights: [5.4, 5.5, 5.5, 5.6, 5.7, 5.7],
      photo: "/demos/veterinaria/pet-simba.webp",
      events: [
        event("e1", "Triple felina", "vacuna", d(-300)),
        event("e2", "Triple felina anual", "vacuna", d(6), false),
      ],
      notes: [],
    },
    {
      id: "lola",
      name: "Lola",
      species: "perro",
      breed: "Mestiza",
      sex: "Hembra",
      age: "8 años",
      record: "00241",
      owner: { name: "Miguel Torres", phone: "939402761" },
      weights: [16.0, 15.8, 15.6, 15.5, 15.3, 15.2],
      photo: "/demos/veterinaria/pet-lola.webp",
      events: [
        event("e1", "Antirrábica", "vacuna", d(-200)),
        event("e2", "Desparasitación interna", "desparasitacion", d(1), false),
      ],
      notes: [
        {
          date: d(-21),
          reason: "Consulta general",
          staffId: "mauricio",
          text: "Bajó de peso y toma más agua. Se pide ecografía abdominal.",
        },
      ],
    },
  ];
}

/* ------------------------------------------------------------------ */
/* Generated patients                                                  */
/* ------------------------------------------------------------------ */

const DOG_NAMES = [
  "Pelusa", "Chispa", "Canela", "Paco", "Bella", "Thor", "Maya", "Rocco", "Sasha", "Zeus", "Molly",
  "Cookie", "Manchas", "Tito", "Princesa", "Bobby", "Lucas", "Nina", "Milo", "Hachi", "Firulais", "Oso",
];
const CAT_NAMES = ["Garfield", "Mishi", "Sol", "Tom", "Pirata", "Luna Gris", "Copito", "Salem"];
const DOG_BREEDS: { breed: string; kg: [number, number] }[] = [
  { breed: "Mestizo", kg: [8, 22] },
  { breed: "Shih tzu", kg: [5, 8] },
  { breed: "Schnauzer", kg: [6, 9] },
  { breed: "Labrador", kg: [26, 34] },
  { breed: "Poodle", kg: [4, 8] },
  { breed: "Pomerania", kg: [2, 4] },
  { breed: "Bulldog francés", kg: [9, 13] },
  { breed: "Cocker spaniel", kg: [11, 15] },
  { breed: "Chihuahua", kg: [1.8, 3] },
  { breed: "Maltés", kg: [3, 5] },
];
const CAT_BREEDS = ["Mestizo", "Siamés", "Angora", "Mestizo atigrado"];
const FIRST_NAMES = [
  "Mariela", "Renzo", "Fernando", "Karina", "Luis", "Claudia", "Javier", "Rosa", "Pedro", "Elena", "César",
  "Vanessa", "Raúl", "Daniela", "Óscar", "Silvia", "Hugo", "Paola", "Martín", "Liliana", "Alonso", "Teresa",
  "Gustavo", "Natalia", "Iván", "Beatriz", "Walter", "Mónica", "Andrés", "Pilar",
];
const LAST_NAMES = [
  "Díaz", "Alva", "Ríos", "Quispe", "Cabrera", "Huamán", "Mendoza", "Paredes", "Silva", "Burgos", "Cueva",
  "Narváez", "Polo", "Rodríguez", "Sánchez", "Vásquez", "Zavaleta", "Gamboa", "Ramos", "León",
];
const NOTE_TEMPLATES = [
  { reason: "Consulta general", staffId: "fiorella", text: "Buen estado general. Mantener su alimentación y paseos diarios." },
  { reason: "Otitis", staffId: "mauricio", text: "Oído derecho irritado. Gotas cada 12 horas por 7 días y control." },
  { reason: "Vacunación", staffId: "fiorella", text: "Sin reacciones. Próxima dosis registrada en su carnet." },
  { reason: "Baño y corte", staffId: "rosa", text: "Se portó tranquilo. Uñas cortadas y oídos limpios." },
  { reason: "Alergia en la piel", staffId: "mauricio", text: "Picazón por pulgas. Pipeta mensual y champú medicado." },
];

const ageLabel = (rand: Random) => {
  const years = rand.int(0, 11);
  return years === 0 ? `${rand.int(3, 11)} meses` : years === 1 ? "1 año" : `${years} años`;
};

function weightSeries(rand: Random, [min, max]: [number, number]): number[] {
  let w = min + rand.next() * (max - min);
  return Array.from({ length: 6 }, () => {
    w = Math.max(1, w + (rand.next() - 0.45) * w * 0.03);
    return Math.round(w * 10) / 10;
  });
}

function generatedPatients(rand: Random, today: string, count: number): Patient[] {
  const dogs = [...DOG_NAMES];
  const cats = [...CAT_NAMES];
  const patients: Patient[] = [];
  for (let i = 0; i < count; i++) {
    // The first four are today's grooming clients (dogs).
    const species: Species = i < 4 || cats.length === 0 || rand.next() < 0.72 ? "perro" : "gato";
    const name = species === "perro" ? dogs.shift()! : cats.splice(rand.int(0, cats.length - 1), 1)[0];
    const dog = rand.pick(DOG_BREEDS);
    const breed = species === "perro" ? dog.breed : rand.pick(CAT_BREEDS);
    const vaccine = species === "perro" ? "Séxtuple anual" : "Triple felina anual";
    // About a fifth are due this week; the rest later on.
    const nextIn = rand.next() < 0.2 ? rand.int(1, 7) : rand.int(9, 120);
    const nextKind = rand.next() < 0.6 ? "vacuna" : "desparasitacion";
    const events: HealthEvent[] = [
      event("e1", vaccine, "vacuna", addDays(today, -rand.int(200, 400))),
      event("e2", "Desparasitación interna", "desparasitacion", addDays(today, -rand.int(20, 120))),
      event(
        "e3",
        nextKind === "vacuna" ? vaccine : species === "perro" ? "Desparasitación interna" : "Desparasitación",
        nextKind,
        addDays(today, nextIn),
        false,
      ),
    ];
    const notes = rand.next() < 0.7 ? [{ ...rand.pick(NOTE_TEMPLATES), date: addDays(today, -rand.int(5, 150)) }] : [];
    patients.push({
      id: `p${i + 1}`,
      name,
      species,
      breed,
      sex: rand.next() < 0.5 ? "Macho" : "Hembra",
      age: ageLabel(rand),
      record: String(150 + i * 23).padStart(5, "0"),
      owner: {
        name: `${FIRST_NAMES[i % FIRST_NAMES.length]} ${rand.pick(LAST_NAMES)}`,
        phone: `9${rand.int(10_000_000, 99_999_999)}`,
      },
      weights: weightSeries(rand, species === "perro" ? dog.kg : [3, 6]),
      events,
      notes,
    });
  }
  return patients;
}

/* ------------------------------------------------------------------ */
/* Appointments                                                        */
/* ------------------------------------------------------------------ */

/** Today's agenda (from the design). [staff, time, patient, service] */
const TODAY: [string, string, string, string][] = [
  ["fiorella", "09:00", "rocky", "consulta"],
  ["fiorella", "10:00", "nala", "vacuna"],
  ["fiorella", "11:30", "max", "esterilizacion"],
  ["fiorella", "16:00", "toby", "vacuna"],
  ["fiorella", "18:30", "kira", "cachorro"],
  ["mauricio", "09:30", "coco", "consulta"],
  ["mauricio", "11:00", "lola", "eco"],
  ["mauricio", "15:00", "michi", "eco"],
  ["mauricio", "17:30", "bruno", "dental"],
  ["rosa", "09:00", "luna", "bano"],
  ["rosa", "10:30", "p1", "bano"],
  ["rosa", "12:00", "p2", "bano"],
  ["rosa", "15:30", "p3", "bano"],
  ["rosa", "17:00", "p4", "bano"],
];

/** Appointments before this time are already attended (and paid) in the sample day. */
const ATTENDED_UNTIL = parseTime("11:00");

/** How often each service is booked with the vets (Rosa only does grooming). */
const VET_SERVICES = [
  { value: "consulta", weight: 34 },
  { value: "vacuna", weight: 26 },
  { value: "desparasitacion", weight: 12 },
  { value: "eco", weight: 10 },
  { value: "cachorro", weight: 8 },
  { value: "dental", weight: 5 },
  { value: "esterilizacion", weight: 3 },
];

function appointmentFor(patient: Patient, serviceId: string, staffId: string, date: string, start: number, id: string): Appointment {
  const service = getService(config, serviceId)!;
  return {
    id,
    code: `KV-${id.replace(/\D/g, "").padStart(4, "0").slice(-4)}`,
    clientName: patient.owner.name,
    phone: patient.owner.phone,
    serviceId,
    staffId,
    date,
    start,
    duration: service.duration,
    status: "confirmed",
    source: "sample",
    reminder: null,
    pet: { species: patient.species, name: patient.name, age: patient.age },
    petId: patient.id,
  };
}

function futureAppointments(rand: Random, today: string, patients: Patient[]): Appointment[] {
  const appointments: Appointment[] = [];
  let n = 0;
  for (let offset = 1; offset < config.booking.daysAhead; offset++) {
    const date = addDays(today, offset);
    const hours = hoursFor(config, date);
    if (!hours) continue;
    const short = hours.close - hours.open < 6 * 60;
    for (const member of config.staff) {
      let surgery = false;
      for (let start = hours.open; start < hours.close; ) {
        const serviceId =
          member.id === "rosa" ? "bano" : rand.weighted(VET_SERVICES.filter((s) => s.value !== "esterilizacion" || !surgery));
        const service = getService(config, serviceId)!;
        const fits = start + service.duration <= hours.close && canPerform(member, service);
        if (fits && rand.next() < (short ? 0.35 : 0.42)) {
          const patient = rand.pick(patients.filter((p) => serviceId !== "bano" || p.species === "perro"));
          appointments.push(appointmentFor(patient, serviceId, member.id, date, start, `s${++n}`));
          if (serviceId === "esterilizacion") surgery = true;
          start += Math.ceil(service.duration / 30) * 30;
        } else {
          start += 30;
        }
      }
    }
  }
  return appointments;
}

/* ------------------------------------------------------------------ */
/* Money                                                               */
/* ------------------------------------------------------------------ */

const METHODS: { value: PaymentMethod; weight: number }[] = [
  { value: "yape", weight: 40 },
  { value: "plin", weight: 18 },
  { value: "tarjeta", weight: 20 },
  { value: "efectivo", weight: 22 },
];

/** Past daily revenue for ~2 months; the current month runs ~9% above the previous one. */
function pastRevenue(rand: Random, today: string): Record<string, number> {
  const month = today.slice(0, 7);
  const revenue: Record<string, number> = {};
  for (let offset = 1; offset <= 62; offset++) {
    const date = addDays(today, -offset);
    const sunday = weekday(date) === 0;
    const base = sunday ? rand.int(180, 320) : rand.int(560, 860);
    revenue[date] = Math.round(base * (date.startsWith(month) ? 1.09 : 1));
  }
  return revenue;
}

/* ------------------------------------------------------------------ */

export function createVetSeed(today: string): VetData {
  const rand = createRandom(`kusivet-${today}`);
  const patients = [...featuredPatients(today), ...generatedPatients(rand, today, 28)];
  const byId = new Map(patients.map((p) => [p.id, p]));

  const todays = hoursFor(config, today)
    ? TODAY.filter(
        ([, time, , serviceId]) =>
          parseTime(time) + getService(config, serviceId)!.duration <= hoursFor(config, today)!.close,
      ).map(([staffId, time, patientId, serviceId], i) =>
        appointmentFor(byId.get(patientId)!, serviceId, staffId, today, parseTime(time), `t${i + 1}`),
      )
    : [];

  const payments: Payment[] = todays
    .filter((a) => a.start < ATTENDED_UNTIL)
    .map((a, i) => ({
      id: `pay${i + 1}`,
      time: a.start + a.duration,
      patientId: a.petId!,
      serviceId: a.serviceId,
      amount: getService(config, a.serviceId)!.price,
      method: rand.weighted(METHODS),
      appointmentId: a.id,
    }));

  const groomingStatus = ["listo", "bano", "recibido", "recibido"] as const;
  const grooming = todays
    .filter((a) => a.staffId === "rosa")
    .slice(0, groomingStatus.length)
    .map((a, i) => ({
      id: `g${i + 1}`,
      patientId: a.petId!,
      serviceName: getService(config, a.serviceId)!.name,
      time: a.start,
      status: groomingStatus[i],
      notified: false,
    }));

  return {
    seededOn: today,
    appointments: [...todays, ...futureAppointments(rand, today, patients)],
    lastBookingId: null,
    patients,
    grooming,
    payments,
    revenueByDay: pastRevenue(rand, today),
    remindersSent: [],
    stats: { remindersSentMonth: 186, remindersBooked: 121, returnRate: 68 },
  };
}

/** A new online booking creates (or links) the patient record. */
export function onVetBook(data: VetData, appointment: Appointment): VetData {
  const pet = appointment.pet;
  if (!pet) return data;
  const existing = data.patients.find(
    (p) => p.owner.phone === appointment.phone && p.name.toLowerCase() === pet.name.toLowerCase(),
  );
  const copy = config.site.panel.patients;
  const service = getService(config, appointment.serviceId);
  const patient: Patient = existing ?? {
    id: `nuevo-${appointment.id}`,
    name: pet.name,
    species: pet.species === "gato" ? "gato" : "perro",
    breed: "",
    sex: null,
    age: pet.age,
    record: String(932 + data.patients.filter((p) => p.isNew).length).padStart(5, "0"),
    owner: { name: appointment.clientName, phone: appointment.phone },
    weights: null,
    events: [],
    notes: [
      {
        date: appointment.date,
        reason: copy.firstVisit.replace("{service}", service?.name ?? ""),
        staffId: appointment.staffId,
        text: copy.newNote,
      },
    ],
    isNew: true,
  };
  return {
    ...data,
    patients: existing ? data.patients : [...data.patients, patient],
    appointments: data.appointments.map((a) => (a.id === appointment.id ? { ...a, petId: patient.id } : a)),
  };
}
