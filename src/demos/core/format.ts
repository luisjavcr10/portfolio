import type { Service, TenantConfig } from "./types";

type Currency = TenantConfig["currency"];

export function money(currency: Currency, amount: number): string {
  return `${currency.symbol} ${Math.round(amount).toLocaleString("en-US")}`;
}

export function priceLabel(currency: Currency, service: Service): string {
  return `${service.from ? "desde " : ""}${money(currency, service.price)}`;
}

export function durationLabel(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} h ${rest} min` : `${hours} h`;
}

/** "987654321" → "987 654 321" */
export function formatPhone(digits: string): string {
  return digits.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
}

export function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] ?? name;
}

/** Replaces {key} placeholders in config copy. */
export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

export function whatsappLink(text: string, number?: string): string {
  const recipient = number ? number.replace(/\D/g, "") : "";
  return `https://wa.me/${recipient}?text=${encodeURIComponent(text)}`;
}
