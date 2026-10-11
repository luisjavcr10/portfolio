import { addDays, daysBetween, parseTime } from "./dates";
import { appointmentsOn, getService, hoursFor } from "./schedule";
import type { Client, DemoData, Service, TenantConfig } from "./types";

function inRange(date: string, from: string, to: string) {
  return date >= from && date <= to;
}

/**
 * Revenue for the 7-day window ending `weeksAgo` weeks before today.
 * Past days come from sales; today counts the value of today's appointments.
 */
export function weekRevenue(config: TenantConfig, data: DemoData, today: string, weeksAgo = 0): number {
  const end = addDays(today, -7 * weeksAgo);
  const start = addDays(end, -6);
  const sales = data.sales
    .filter((sale) => sale.date < today && inRange(sale.date, start, end))
    .reduce((sum, sale) => sum + sale.amount, 0);
  if (weeksAgo > 0) return sales;

  const todayValue = appointmentsOn(data.appointments, today).reduce(
    (sum, a) => sum + (getService(config, a.serviceId)?.price ?? 0),
    0,
  );
  return sales + todayValue;
}

export function weeklySeries(config: TenantConfig, data: DemoData, today: string, weeks = 8) {
  return Array.from({ length: weeks }, (_, i) => {
    const weeksAgo = weeks - 1 - i;
    const end = addDays(today, -7 * weeksAgo);
    return { start: addDays(end, -6), total: weekRevenue(config, data, today, weeksAgo), current: weeksAgo === 0 };
  });
}

export function topServices(config: TenantConfig, data: DemoData, today: string, days = 30, limit = 5) {
  const from = addDays(today, -days);
  const totals = new Map<string, { service: Service; count: number; revenue: number }>();
  for (const sale of data.sales) {
    if (sale.date < from) continue;
    const service = getService(config, sale.serviceId);
    if (!service) continue;
    const entry = totals.get(service.id) ?? { service, count: 0, revenue: 0 };
    entry.count += 1;
    entry.revenue += sale.amount;
    totals.set(service.id, entry);
  }
  return [...totals.values()].sort((a, b) => b.count - a.count).slice(0, limit);
}

export type LapsedClient = Client & { daysAway: number; contacted: boolean };

/** Clients who have not come back in more than `minDays` days. */
export function lapsedClients(data: DemoData, today: string, minDays = 45): LapsedClient[] {
  return data.clients
    .map((client) => ({
      ...client,
      daysAway: daysBetween(client.lastVisit, today),
      contacted: data.contacted.includes(client.id),
    }))
    .filter((client) => client.daysAway > minDays);
}

/** One-hour gaps (per staff member) left this afternoon. */
export function afternoonGaps(config: TenantConfig, data: DemoData, today: string, from = "14:00"): number {
  const hours = hoursFor(config, today);
  if (!hours) return 0;
  const dayAppointments = appointmentsOn(data.appointments, today);
  let gaps = 0;
  for (const member of config.staff) {
    for (let start = Math.max(parseTime(from), hours.open); start + 60 <= hours.close; start += 60) {
      const busy = dayAppointments.some(
        (a) => a.staffId === member.id && a.start < start + 60 && start < a.start + a.duration,
      );
      if (!busy) gaps += 1;
    }
  }
  return gaps;
}

export function percentChange(current: number, previous: number): number {
  return previous ? Math.round(((current - previous) / previous) * 100) : 0;
}
