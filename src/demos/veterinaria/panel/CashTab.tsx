import { formatTime } from "@/demos/core/dates";
import { fill, money } from "@/demos/core/format";
import { getService } from "@/demos/core/schedule";
import type { VetConfig } from "../config";
import { Icon, type IconName } from "../icons";
import { patientById } from "../selectors";
import type { PaymentMethod, VetData } from "../types";
import styles from "./VetPanel.module.css";

const METHOD_ICONS: Record<PaymentMethod, IconName> = {
  yape: "qr",
  plin: "qr",
  tarjeta: "card",
  efectivo: "cash",
};

type CashTabProps = { config: VetConfig; data: VetData; today: string };

/** Today's payments by method, plus online bookings still to be charged. */
export function CashTab({ config, data, today }: CashTabProps) {
  const copy = config.site.panel.cash;
  const total = data.payments.reduce((sum, p) => sum + p.amount, 0);
  const toCharge = data.appointments.filter((a) => a.source === "online" && a.date === today && a.status !== "cancelled");
  const methods = (Object.keys(copy.methods) as PaymentMethod[]).map((method) => {
    const items = data.payments.filter((p) => p.method === method);
    const amount = items.reduce((sum, p) => sum + p.amount, 0);
    return { method, amount, count: items.length, pct: total ? Math.round((amount / total) * 100) : 0 };
  });
  const payments = [...data.payments].sort((a, b) => b.time - a.time);

  return (
    <>
      <div className={styles.cashTotal}>
        <div>
          <span>{copy.total}</span>
          <strong>{money(config.currency, total)}</strong>
        </div>
        <span>
          {fill(copy.summary, { count: String(data.payments.length), pending: String(toCharge.length) })}
        </span>
      </div>

      <div className={styles.methods}>
        {methods.map((m) => (
          <div key={m.method} className={styles.card} data-method={m.method}>
            <span className={styles.methodName}>
              <span className={styles.methodIcon} aria-hidden>
                <Icon name={METHOD_ICONS[m.method]} size={18} />
              </span>
              {copy.methods[m.method]}
            </span>
            <strong className={styles.methodAmount}>{money(config.currency, m.amount)}</strong>
            <span className={styles.methodBar} aria-hidden>
              <span style={{ width: `${m.pct}%` }} />
            </span>
            <span className={styles.muted}>{fill(copy.methodNote, { count: String(m.count), pct: `${m.pct}%` })}</span>
          </div>
        ))}
      </div>

      <ul className={`${styles.card} ${styles.payments}`}>
        {toCharge.map((a) => {
          const service = getService(config, a.serviceId);
          return (
            <li key={a.id}>
              <span className={styles.payTime}>{formatTime(a.start)}</span>
              <span className={styles.payText}>
                <strong>
                  {a.pet?.name ?? a.clientName} · {service?.name}
                </strong>
                <span>{copy.webMethod}</span>
              </span>
              <span className={styles.payAmount}>
                <strong>
                  {service?.from ? "desde " : ""}
                  {money(config.currency, service?.price ?? 0)}
                </strong>
                <span className={styles.pendingBadge}>{copy.pendingBadge}</span>
              </span>
            </li>
          );
        })}
        {payments.map((p) => (
          <li key={p.id}>
            <span className={styles.payTime}>{formatTime(p.time)}</span>
            <span className={styles.payText}>
              <strong>
                {patientById(data, p.patientId)?.name} · {getService(config, p.serviceId)?.name}
              </strong>
              <span>{copy.methods[p.method]}</span>
            </span>
            <span className={styles.payAmount}>
              <strong>{money(config.currency, p.amount)}</strong>
            </span>
          </li>
        ))}
        {payments.length === 0 && toCharge.length === 0 && <li className={styles.muted}>{copy.empty}</li>}
      </ul>
    </>
  );
}
