"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { addDays, dayLabels, formatTime } from "../dates";
import { durationLabel, fill, firstName, formatPhone, priceLabel } from "../format";
import { ANY_STAFF, canPerform, eligibleStaff, getService, getStaff, hoursFor, slotsFor } from "../schedule";
import { useDemoStore } from "../store";
import type { Appointment, TenantConfig } from "../types";
import ui from "../ui.module.css";
import styles from "./BookingFlow.module.css";

export type BookingRequest = { serviceId: string | null; staffId: string | null };

type BookingFlowProps = {
  config: TenantConfig;
  request: BookingRequest;
  onClose: () => void;
  /** "See your booking in the business system" — receives the new appointment id. */
  onGoToPanel: (appointmentId: string) => void;
};

type Step = 1 | 2 | 3 | 4 | 5;

/**
 * Four-step booking (service → staff → day and time → contact details) plus a
 * confirmation. Mount it when the visitor opens booking; unmount to close.
 */
export function BookingFlow({ config, request, onClose, onGoToPanel }: BookingFlowProps) {
  const { data, today, book } = useDemoStore();
  const copy = config.booking.copy;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const presetService = getService(config, request.serviceId);
  const presetStaff = getStaff(config, request.staffId);
  const [step, setStep] = useState<Step>(presetService ? 2 : 1);
  const [serviceId, setServiceId] = useState<string | null>(presetService?.id ?? null);
  const [staffId, setStaffId] = useState<string | null>(
    presetStaff && (!presetService || canPerform(presetStaff, presetService)) ? presetStaff.id : null,
  );
  const [date, setDate] = useState<string | null>(null);
  const [start, setStart] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<{ field: "name" | "phone" | "slot"; message: string } | null>(null);
  const [booked, setBooked] = useState<Appointment | null>(null);

  const service = getService(config, serviceId);
  const staff = getStaff(config, staffId);

  // Open as a modal (focus trap, Escape, inert page) and restore focus on close.
  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement as HTMLElement | null;
    dialog?.showModal();
    return () => {
      dialog?.close();
      opener?.focus();
    };
  }, []);

  // Move focus to the step heading so screen readers announce the new step.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const days = useMemo(
    () => (today ? Array.from({ length: config.booking.daysAhead }, (_, i) => addDays(today, i)) : []),
    [today, config.booking.daysAhead],
  );

  const slotsByDay = useMemo(() => {
    if (!data || !service || !staffId) return new Map<string, ReturnType<typeof slotsFor>>();
    return new Map(
      days.map((day) => [day, slotsFor({ config, appointments: data.appointments, date: day, today, service, staffId })]),
    );
  }, [data, service, staffId, days, config, today]);

  const activeDate = date ?? days.find((day) => slotsByDay.get(day)?.some((s) => s.free)) ?? days[0] ?? today;
  const slots = slotsByDay.get(activeDate) ?? [];
  const freeCount = slots.filter((slot) => slot.free).length;
  const activeDay = activeDate ? dayLabels(activeDate, today) : null;

  const canContinue = step === 1 ? Boolean(service) : step === 2 ? Boolean(staffId) : step === 3 ? start !== null : true;
  const staffSummary = staffId === ANY_STAFF ? copy.anyStaffSummary : (staff?.name ?? "");
  const recap = [
    service?.name,
    staffId ? (staff?.name ?? copy.anyStaff.name) : null,
    step >= 3 && start !== null && activeDay ? `${activeDay.short}, ${formatTime(start)}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  function chooseService(id: string) {
    const next = getService(config, id);
    setServiceId(id);
    setStart(null);
    if (staff && next && !canPerform(staff, next)) setStaffId(null);
  }

  function confirmBooking() {
    if (!service || !staffId || start === null || !data) return;
    const digits = phone.replace(/\D/g, "");
    if (name.trim().length < 2) return setError({ field: "name", message: copy.errors.name });
    if (!new RegExp(config.booking.phone.pattern).test(digits)) {
      return setError({ field: "phone", message: copy.errors.phone });
    }

    // Re-check against the store in case the slot was taken meanwhile.
    const slot = slotsFor({ config, appointments: data.appointments, date: activeDate, today, service, staffId }).find(
      (s) => s.start === start,
    );
    if (!slot?.free || !slot.staffId) {
      setStart(null);
      setStep(3);
      return setError({ field: "slot", message: copy.errors.slotTaken });
    }

    const appointment: Appointment = {
      id: `online-${Date.now()}`,
      code: `${config.booking.codePrefix}-${1000 + Math.floor(Math.random() * 9000)}`,
      clientName: name.trim(),
      phone: digits,
      serviceId: service.id,
      staffId: slot.staffId,
      date: activeDate,
      start,
      duration: service.duration,
      status: "booked",
      source: "online",
      reminder: "scheduled",
    };
    book(appointment);
    setBooked(appointment);
    setError(null);
    setStep(5);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!canContinue) return;
    if (step < 4) setStep((step + 1) as Step);
    else if (step === 4) confirmBooking();
  }

  const bookedStaff = booked ? getStaff(config, booked.staffId) : undefined;
  const bookedDay = booked ? dayLabels(booked.date, today) : null;

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="booking-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        // Clicks on the backdrop land on the dialog element itself.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <header className={styles.header}>
          <span className={styles.grabber} aria-hidden />
          <div className={styles.titleRow}>
            <h2 id="booking-title" className={styles.title}>
              {step === 5 ? copy.confirmedTitle : copy.title}
            </h2>
            <button type="button" className={styles.close} onClick={onClose} aria-label={copy.close}>
              ×
            </button>
          </div>
          {step <= 4 && (
            <div className={styles.progressWrap}>
              <div
                className={styles.progress}
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={4}
                aria-valuenow={step}
                aria-label={`Paso ${step} de 4`}
              >
                {[1, 2, 3, 4].map((i) => (
                  <span key={i} className={i <= step ? styles.progressOn : undefined} />
                ))}
              </div>
              <div className={styles.stepInfo}>
                <span>
                  Paso {step} de 4 · <strong>{copy.steps[step - 1]}</strong>
                </span>
                <span className={styles.recap}>{recap}</span>
              </div>
            </div>
          )}
        </header>

        <div className={styles.body}>
          {step === 1 && (
            <>
              <h3 ref={headingRef} tabIndex={-1} className={ui.visuallyHidden}>
                {copy.steps[0]}
              </h3>
              {config.categories.map((category) => (
                <fieldset key={category.id} className={styles.group}>
                  <legend className={styles.groupLabel}>{category.name}</legend>
                  {config.services
                    .filter((s) => s.categoryId === category.id)
                    .map((s) => (
                      <label key={s.id} className={styles.option}>
                        <input
                          type="radio"
                          name="service"
                          value={s.id}
                          checked={serviceId === s.id}
                          onChange={() => chooseService(s.id)}
                          className={ui.visuallyHidden}
                        />
                        <span className={styles.optionText}>
                          <strong>{s.name}</strong>
                          <span>{durationLabel(s.duration)}</span>
                        </span>
                        <span className={styles.price}>{priceLabel(config.currency, s)}</span>
                      </label>
                    ))}
                </fieldset>
              ))}
            </>
          )}

          {step === 2 && service && (
            <fieldset className={styles.group}>
              <legend className={styles.intro}>
                <h3 ref={headingRef} tabIndex={-1} className={styles.introHeading}>
                  {fill(copy.staffIntro, { service: service.name })}
                </h3>
              </legend>
              {[
                { id: ANY_STAFF, name: copy.anyStaff.name, role: copy.anyStaff.role, note: copy.anyStaff.note, initial: "·" },
                ...eligibleStaff(config, service).map((m) => ({ ...m, note: "", initial: m.name.charAt(0) })),
              ].map((option) => (
                <label key={option.id} className={styles.option}>
                  <input
                    type="radio"
                    name="staff"
                    value={option.id}
                    checked={staffId === option.id}
                    onChange={() => {
                      setStaffId(option.id);
                      setStart(null);
                    }}
                    className={ui.visuallyHidden}
                  />
                  <span className={styles.person}>
                    <span className={styles.avatar} aria-hidden>
                      {option.initial}
                    </span>
                    <span className={styles.optionText}>
                      <strong>{option.name}</strong>
                      <span>{option.role}</span>
                    </span>
                  </span>
                  {option.note && <span className={styles.note}>{option.note}</span>}
                </label>
              ))}
            </fieldset>
          )}

          {step === 3 && service && (
            <>
              <h3 ref={headingRef} tabIndex={-1} className={ui.visuallyHidden}>
                {copy.steps[2]}
              </h3>
              <fieldset className={styles.group}>
                <legend className={styles.sectionLabel}>{activeDay?.month}</legend>
                <div className={styles.days}>
                  {days.map((day) => {
                    const labels = dayLabels(day, today);
                    const closed = !hoursFor(config, day);
                    return (
                      <label key={day} className={styles.day} aria-label={labels.long}>
                        <input
                          type="radio"
                          name="day"
                          value={day}
                          checked={activeDate === day}
                          disabled={closed}
                          onChange={() => {
                            setDate(day);
                            setStart(null);
                          }}
                          className={ui.visuallyHidden}
                        />
                        <span className={styles.dayName}>{labels.chip}</span>
                        <span className={styles.dayNumber}>{labels.dayNumber}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className={styles.group}>
                <legend className={styles.slotsHead}>
                  <span className={styles.sectionLabel}>Horarios · {activeDay?.long}</span>
                  <span className={styles.freeCount}>{freeCount} libres</span>
                </legend>
                {error?.field === "slot" && (
                  <p role="alert" className={styles.error}>
                    {error.message}
                  </p>
                )}
                {!data ? (
                  <div className={styles.slots} aria-busy="true">
                    {Array.from({ length: 8 }, (_, i) => (
                      <span key={i} className={`${ui.skeleton} ${styles.slotSkeleton}`} />
                    ))}
                  </div>
                ) : freeCount > 0 ? (
                  <div className={styles.slots}>
                    {slots.map((slot) => (
                      <label
                        key={slot.start}
                        className={`${styles.slot} ${slot.free ? "" : styles.busy}`}
                        aria-label={`${slot.label}, ${slot.free ? "libre" : "ocupado"}`}
                      >
                        <input
                          type="radio"
                          name="time"
                          value={slot.start}
                          checked={start === slot.start}
                          disabled={!slot.free}
                          onChange={() => {
                            setStart(slot.start);
                            setError(null);
                          }}
                          className={ui.visuallyHidden}
                        />
                        {slot.label}
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className={styles.empty}>
                    <strong>{copy.noSlots.title}</strong>
                    <span>{copy.noSlots.text}</span>
                  </div>
                )}
              </fieldset>
            </>
          )}

          {step === 4 && service && start !== null && (
            <div className={styles.details}>
              <h3 ref={headingRef} tabIndex={-1} className={ui.visuallyHidden}>
                {copy.steps[3]}
              </h3>
              <div className={styles.summary}>
                <strong>{service.name}</strong>
                <span>
                  {activeDay?.long} · {formatTime(start)} · con {staffSummary}
                </span>
              </div>
              <label className={styles.field}>
                {copy.nameLabel}
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError(null);
                  }}
                  autoComplete="name"
                  placeholder={copy.namePlaceholder}
                  required
                  aria-invalid={error?.field === "name"}
                  aria-describedby={error?.field === "name" ? "booking-error" : undefined}
                  className={styles.input}
                />
              </label>
              <label className={styles.field}>
                {copy.phoneLabel}
                <span className={styles.phone}>
                  <span className={styles.prefix}>+{config.booking.phone.countryCode}</span>
                  <input
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setError(null);
                    }}
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder={copy.phonePlaceholder}
                    required
                    aria-invalid={error?.field === "phone"}
                    aria-describedby={error?.field === "phone" ? "booking-error" : "booking-privacy"}
                    className={styles.phoneInput}
                  />
                </span>
              </label>
              {error && error.field !== "slot" && (
                <p id="booking-error" role="alert" className={styles.error}>
                  {error.message}
                </p>
              )}
              <p id="booking-privacy" className={styles.privacy}>
                {copy.privacyNote}
              </p>
            </div>
          )}

          {step === 5 && booked && service && (
            <div className={styles.done}>
              <div className={styles.doneHead}>
                <span className={styles.doneIcon} aria-hidden>
                  ✓
                </span>
                <h3 ref={headingRef} tabIndex={-1} className={styles.doneTitle}>
                  {fill(copy.doneTitle, { name: firstName(booked.clientName) })}
                </h3>
                <p className={styles.doneText}>{copy.doneText}</p>
              </div>
              <dl className={styles.receipt}>
                <div>
                  <dt>Servicio</dt>
                  <dd>{service.name}</dd>
                </div>
                <div>
                  <dt>Con</dt>
                  <dd>{bookedStaff?.name}</dd>
                </div>
                <div>
                  <dt>Día y hora</dt>
                  <dd>
                    {bookedDay?.short} · {formatTime(booked.start)}
                  </dd>
                </div>
                <div>
                  <dt>Precio</dt>
                  <dd>{priceLabel(config.currency, service)}</dd>
                </div>
                <div>
                  <dt>Dónde</dt>
                  <dd>
                    {config.contact.address}, {config.contact.area}
                  </dd>
                </div>
              </dl>
              <p className={styles.reminder}>
                <span aria-hidden />
                {fill(copy.reminderNote, { phone: formatPhone(booked.phone) })}
              </p>
            </div>
          )}

          {/* Announces the confirmation even if focus is elsewhere. */}
          <p className={ui.visuallyHidden} aria-live="polite">
            {booked && bookedDay
              ? `${copy.confirmedTitle}: ${service?.name}, ${bookedDay.long} a las ${formatTime(booked.start)}.`
              : ""}
          </p>
        </div>

        <footer className={styles.footer}>
          {step <= 4 ? (
            <div className={styles.footerRow}>
              {step > 1 && (
                <button
                  type="button"
                  className={`${ui.btn} ${ui.md} ${ui.outline}`}
                  onClick={() => {
                    setError(null);
                    setStep((step - 1) as Step);
                  }}
                >
                  {copy.back}
                </button>
              )}
              <button type="submit" className={`${ui.btn} ${ui.md} ${ui.primary} ${styles.next}`} disabled={!canContinue}>
                {step === 4 ? copy.confirm : copy.next}
              </button>
            </div>
          ) : (
            <div className={styles.footerColumn}>
              <button
                type="button"
                className={`${ui.btn} ${ui.accent} ${styles.goPanel}`}
                onClick={() => booked && onGoToPanel(booked.id)}
              >
                {copy.goToPanel}
              </button>
              <button type="button" className={styles.backToSite} onClick={onClose}>
                {copy.backToSite}
              </button>
            </div>
          )}
        </footer>
      </form>
    </dialog>
  );
}
