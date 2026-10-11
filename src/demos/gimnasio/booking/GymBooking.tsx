"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { fill, firstName } from "@/demos/core/format";
import { createRandom } from "@/demos/core/random";
import { bookableSessions, bookingDays, coachName, dayChip, getClass, shortTime, useGymStore, whenWords, type Lead } from "../data";
import { plateConfetti, prefersReducedMotion } from "../motion";
import type { BookRequest } from "../site/GymSite";
import type { GymConfig } from "../types";
import styles from "./GymBooking.module.css";

type Props = {
  config: GymConfig;
  request: BookRequest;
  onClose: () => void;
  onGoToPanel: (leadId: string) => void;
};

type Step = 1 | 2 | 3 | "done";
type Errors = { name?: boolean; phone?: boolean; goal?: boolean; full?: boolean };

/** "Pide tu clase gratis": class → day and time → details → pass with QR. */
export function GymBooking({ config, request, onClose, onGoToPanel }: Props) {
  const { data, dispatch } = useGymStore();
  const copy = config.site.flow;
  const dialog = useRef<HTMLDialogElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const pass = useRef<HTMLDivElement>(null);
  const today = data?.seededOn ?? "";
  const days = useMemo(() => (today ? bookingDays(config, today) : []), [config, today]);

  const firstDayWith = (classId: string) =>
    data ? days.find((d) => bookableSessions(config, data, d, classId).length) ?? days[0] : "";

  const preset = (() => {
    if (!request.classId || !data) return null;
    const date = request.date && days.includes(request.date) ? request.date : firstDayWith(request.classId);
    const valid = request.time && bookableSessions(config, data, date, request.classId).some((s) => s.time === request.time && s.free > 0);
    return { classId: request.classId, date, time: valid ? request.time! : null };
  })();

  const [step, setStep] = useState<Step>(preset ? 2 : 1);
  const [classId, setClassId] = useState<string | null>(preset?.classId ?? null);
  const [date, setDate] = useState<string>(preset?.date ?? "");
  const [time, setTime] = useState<string | null>(preset?.time ?? null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [lead, setLead] = useState<Lead | null>(null);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    el.showModal();
    if (!prefersReducedMotion()) {
      const desktop = window.matchMedia("(min-width: 700px)").matches;
      el.animate(
        desktop ? [{ transform: "scale(.94)", opacity: 0 }, { transform: "none", opacity: 1 }] : [{ transform: "translateY(100%)" }, { transform: "none" }],
        { duration: 420, easing: "cubic-bezier(.16,1,.3,1)" },
      );
    }
  }, []);

  // Each step slides in; the first field of the form takes focus.
  useEffect(() => {
    const el = body.current;
    if (!el) return;
    const reduced = prefersReducedMotion();
    el.animate(reduced ? [{ opacity: 0 }, { opacity: 1 }] : [{ transform: "translateX(24px)", opacity: 0 }, { transform: "none", opacity: 1 }], {
      duration: reduced ? 400 : 320,
      easing: "cubic-bezier(.16,1,.3,1)",
    });
    if (step === 3) el.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true });
    if (step === "done") {
      plateConfetti();
      if (!reduced)
        pass.current?.animate(
          [{ transform: "perspective(800px) rotateX(30deg) scale(.8)", opacity: 0 }, { transform: "none", opacity: 1 }],
          { duration: 800, easing: "cubic-bezier(.34,1.56,.64,1)" },
        );
      el.querySelector<HTMLElement>("[data-done-focus]")?.focus({ preventScroll: true });
    }
  }, [step]);

  if (!data) return null;

  const chosen = classId ? getClass(config, classId) : null;
  const sessions = classId && date ? bookableSessions(config, data, date, classId) : [];
  const stepNumber = step === "done" ? 3 : step;
  const stepTitle = step === "done" ? fill(copy.doneTitle, { name: firstName(lead?.name ?? "") }) : copy.steps[step - 1];
  const summary =
    chosen && date && time
      ? fill(copy.summary, { class: chosen.name, coach: coachName(config, chosen.coachId), when: whenWords(date, today), time: shortTime(time) })
      : "";

  function chooseClass(id: string) {
    setClassId(id);
    setDate(firstDayWith(id));
    setTime(null);
    setErrors({});
  }

  function next(event?: FormEvent) {
    event?.preventDefault();
    if (step === 1 && classId) return setStep(2);
    if (step === 2 && time) return setStep(3);
    if (step !== 3 || !chosen || !time || !data) return;

    const digits = phone.replace(/\D/g, "");
    const nextErrors: Errors = {
      name: name.trim().length < 2,
      phone: !new RegExp(config.booking.phone.pattern).test(digits),
      goal: !goal,
    };
    // Re-check the seat: the store may have changed since the time was picked.
    const session = bookableSessions(config, data, date, chosen.id).find((s) => s.time === time);
    if (!session || session.free <= 0) {
      setErrors({ full: true });
      setTime(null);
      setStep(2);
      return;
    }
    if (nextErrors.name || nextErrors.phone || nextErrors.goal) {
      setErrors(nextErrors);
      const field = nextErrors.name ? "name" : nextErrors.phone ? "phone" : "goal";
      body.current?.querySelector<HTMLElement>(`[data-field="${field}"]`)?.focus();
      return;
    }

    const created: Lead = {
      ...newLeadIds(config.booking.codePrefix),
      name: name.trim(),
      phone: digits,
      goal: goal!,
      classId: chosen.id,
      date,
      time,
      status: "new",
      source: "online",
    };
    dispatch({ type: "book", lead: created });
    setLead(created);
    setStep("done");
  }

  function back() {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
  }

  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-labelledby="gym-flow-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialog.current) dialog.current.close();
      }}
    >
      <form className={styles.sheet} onSubmit={next} noValidate>
        <span aria-hidden className={styles.grabber} />
        <div className={styles.top}>
          <div>
            <span className={styles.stepLabel}>
              {step === "done" ? copy.doneLabel.toUpperCase() : fill(copy.stepLabel, { n: String(step) }).toUpperCase()}
            </span>
            <h2 id="gym-flow-title" className={styles.title}>
              {stepTitle}
            </h2>
          </div>
          <button type="button" className={styles.close} aria-label={copy.close} onClick={() => dialog.current?.close()}>
            ✕
          </button>
        </div>
        <div className={styles.progress} role="progressbar" aria-label={copy.title} aria-valuemin={0} aria-valuemax={3} aria-valuenow={stepNumber}>
          <span style={{ width: `${(stepNumber / 3) * 100}%` }} />
        </div>

        <div ref={body} className={styles.body}>
          {step === 1 && (
            <fieldset className={styles.fieldset}>
              <legend className={styles.srOnly}>{copy.steps[0]}</legend>
              <div className={styles.classGrid}>
                {config.classes.map((c) => (
                  <label key={c.id} className={styles.choice}>
                    <input type="radio" name="clase" value={c.id} checked={classId === c.id} onChange={() => chooseClass(c.id)} />
                    <span className={styles.choiceName}>{c.name}</span>
                    <span className={styles.choiceMeta}>
                      {coachName(config, c.coachId)} · {c.duration} min
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {step === 2 && classId && (
            <>
              {errors.full && (
                <p className={styles.error} role="alert">
                  {copy.errors.full}
                </p>
              )}
              <fieldset className={styles.fieldset}>
                <legend className={styles.question}>{copy.dayQuestion}</legend>
                <div className={styles.days}>
                  {days.map((d) => {
                    const count = bookableSessions(config, data, d, classId).length;
                    return (
                      <label key={d} className={`${styles.choice} ${styles.dayChoice}`} data-disabled={!count ? "" : undefined}>
                        <input
                          type="radio"
                          name="dia"
                          value={d}
                          checked={date === d}
                          disabled={!count}
                          onChange={() => {
                            setDate(d);
                            setTime(null);
                          }}
                        />
                        <strong>{dayChip(d, today)}</strong>
                        <span>{count ? `${count} ${count === 1 ? "horario" : "horarios"}` : "Sin clases"}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              <fieldset className={styles.fieldset}>
                <legend className={styles.question}>{copy.timeQuestion}</legend>
                <div className={styles.times}>
                  {sessions.map((s) => {
                    const full = s.free === 0;
                    const seats = full ? "Lleno" : s.free === 1 ? "Queda 1 cupo" : `Quedan ${s.free} cupos`;
                    return (
                      <label key={s.key} className={`${styles.choice} ${styles.timeChoice}`} data-few={!full && s.free <= 5 ? "" : undefined} data-disabled={full ? "" : undefined}>
                        <input
                          type="radio"
                          name="hora"
                          value={s.time}
                          checked={time === s.time}
                          disabled={full}
                          onChange={() => {
                            setTime(s.time);
                            setErrors({});
                          }}
                        />
                        <strong>{shortTime(s.time)}</strong>
                        <span>{seats}</span>
                      </label>
                    );
                  })}
                </div>
                {!sessions.length && <p className={styles.muted}>{copy.noTimes}</p>}
              </fieldset>
            </>
          )}

          {step === 3 && (
            <div className={styles.form}>
              <label className={styles.field}>
                {copy.nameLabel}
                <input
                  data-field="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  placeholder={copy.namePlaceholder}
                  aria-invalid={errors.name || undefined}
                  aria-describedby={errors.name ? "err-name" : undefined}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors((er) => ({ ...er, name: false }));
                  }}
                />
                {errors.name && (
                  <span id="err-name" className={styles.error}>
                    {copy.errors.name}
                  </span>
                )}
              </label>
              <label className={styles.field}>
                {copy.phoneLabel}
                <span className={styles.phone} data-invalid={errors.phone ? "" : undefined}>
                  <span aria-hidden>{config.booking.phone.countryCode}</span>
                  <input
                    data-field="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    value={phone}
                    placeholder={copy.phonePlaceholder}
                    aria-invalid={errors.phone || undefined}
                    aria-describedby={errors.phone ? "err-phone" : undefined}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/[^\d ]/g, "").slice(0, 11));
                      setErrors((er) => ({ ...er, phone: false }));
                    }}
                  />
                </span>
                {errors.phone && (
                  <span id="err-phone" className={styles.error}>
                    {copy.errors.phone}
                  </span>
                )}
              </label>
              <fieldset className={styles.fieldset}>
                <legend className={styles.fieldLegend}>{copy.goalLabel}</legend>
                <div className={styles.goals}>
                  {config.booking.goals.map((g, i) => (
                    <label key={g} className={`${styles.choice} ${styles.goalChoice}`}>
                      <input
                        type="radio"
                        name="objetivo"
                        value={g}
                        data-field={i === 0 ? "goal" : undefined}
                        checked={goal === g}
                        aria-describedby={errors.goal ? "err-goal" : undefined}
                        onChange={() => {
                          setGoal(g);
                          setErrors((er) => ({ ...er, goal: false }));
                        }}
                      />
                      {g}
                    </label>
                  ))}
                </div>
                {errors.goal && (
                  <span id="err-goal" className={styles.error}>
                    {copy.errors.goal}
                  </span>
                )}
              </fieldset>
              {summary && <p className={styles.summary}>{summary}</p>}
            </div>
          )}

          {step === "done" && lead && chosen && (
            <div className={styles.done}>
              <p className={styles.doneText}>{copy.doneText}</p>
              <div ref={pass} className={styles.pass}>
                <div className={styles.passTop}>
                  <div className={styles.passBrand}>
                    <span>{copy.pass.brand}</span>
                    <span>{copy.pass.label.toUpperCase()}</span>
                  </div>
                  <span className={styles.passClass}>{chosen.name}</span>
                  <dl className={styles.passGrid}>
                    <div>
                      <dt>{copy.pass.name.toUpperCase()}</dt>
                      <dd>{lead.name}</dd>
                    </div>
                    <div>
                      <dt>{copy.pass.when.toUpperCase()}</dt>
                      <dd>
                        {dayChip(lead.date, today)} · {shortTime(lead.time)}
                      </dd>
                    </div>
                    <div>
                      <dt>{copy.pass.coach.toUpperCase()}</dt>
                      <dd>{coachName(config, chosen.coachId)}</dd>
                    </div>
                    <div>
                      <dt>{copy.pass.code.toUpperCase()}</dt>
                      <dd>{lead.code}</dd>
                    </div>
                  </dl>
                </div>
                <div aria-hidden className={styles.perforation} />
                <div className={styles.passBottom}>
                  <QrCode code={lead.code} />
                  <div>
                    <strong>{copy.pass.show}</strong>
                    <span>
                      {config.contact.address}, {config.contact.city}
                    </span>
                    <span className={styles.admits}>{copy.pass.admits.toUpperCase()}</span>
                  </div>
                </div>
              </div>
              <button type="button" data-done-focus="" className={styles.goPanel} onClick={() => onGoToPanel(lead.id)}>
                {copy.goToPanel}
              </button>
            </div>
          )}
        </div>

        {step !== "done" && (
          <div className={styles.footer}>
            {step !== 1 ? (
              <button type="button" className={styles.back} onClick={back}>
                {copy.back}
              </button>
            ) : (
              <span />
            )}
            <button type="submit" className={styles.next} disabled={(step === 1 && !classId) || (step === 2 && !time)}>
              {step === 3 ? copy.confirm : copy.next}
            </button>
          </div>
        )}
      </form>
    </dialog>
  );
}

/** Unique id and a short human code for a new web lead. */
function newLeadIds(prefix: string) {
  return { id: `web-${Date.now()}`, code: `${prefix}-${1000 + Math.floor(Math.random() * 9000)}` };
}

/** Decorative 25×25 QR-like grid derived from the booking code. */
function QrCode({ code }: { code: string }) {
  const cells = useMemo(() => {
    const random = createRandom(code);
    const N = 25;
    const finder = (x: number, y: number): number | null => {
      for (const [fx, fy] of [
        [0, 0],
        [N - 7, 0],
        [0, N - 7],
      ]) {
        const dx = x - fx;
        const dy = y - fy;
        if (dx >= 0 && dx < 7 && dy >= 0 && dy < 7)
          return dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4) ? 1 : 0;
        if (dx >= -1 && dx < 8 && dy >= -1 && dy < 8) return 0;
      }
      return null;
    };
    const out: boolean[] = [];
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) out.push((finder(x, y) ?? (random.next() < 0.5 ? 1 : 0)) === 1);
    return out;
  }, [code]);

  return (
    <div role="img" aria-label={`Código QR del pase ${code}`} className={styles.qr}>
      {cells.map((on, i) => (
        <span key={i} data-on={on ? "" : undefined} />
      ))}
    </div>
  );
}
