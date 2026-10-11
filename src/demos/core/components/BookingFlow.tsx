"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { addDays, dayLabels, formatTime } from "../dates";
import { durationLabel, fill, firstName, formatPhone, priceLabel } from "../format";
import { ANY_STAFF, canPerform, eligibleStaff, getService, getStaff, hoursFor, slotsFor } from "../schedule";
import { useDemoStore } from "../store";
import type { AnyTenantConfig, Appointment, PetDetails } from "../types";
import ui from "../ui.module.css";
import styles from "./BookingFlow.module.css";

export type BookingRequest = { serviceId: string | null; staffId: string | null };

type BookingFlowProps = {
  config: AnyTenantConfig;
  request: BookingRequest;
  onClose: () => void;
  /** "See your booking in the business system" — receives the new appointment id. */
  onGoToPanel: (appointmentId: string) => void;
};

type Step = "pet" | "service" | "staff" | "time" | "details" | "done";

/**
 * Booking in four steps (service → staff → day and time → contact details) plus a
 * confirmation. Tenants with `booking.pet` get a first "your pet" step. Mount it
 * when the visitor opens booking; unmount to close.
 */
export function BookingFlow({ config, request, onClose, onGoToPanel }: BookingFlowProps) {
  const { data, today, book } = useDemoStore();
  const copy = config.booking.copy;
  const petStep = config.booking.pet;
  const flow: Step[] = petStep ? ["pet", "service", "staff", "time", "details"] : ["service", "staff", "time", "details"];
  const stepLabels = petStep ? [petStep.stepLabel, ...copy.steps] : copy.steps;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const presetService = getService(config, request.serviceId);
  const presetStaff = getStaff(config, request.staffId);
  const [step, setStep] = useState<Step>(petStep ? "pet" : presetService ? "staff" : "service");
  const [pet, setPet] = useState<PetDetails>({ species: "", name: "", age: "" });
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

  const stepIndex = flow.indexOf(step);
  const stepNumber = stepIndex + 1;
  const goTo = (offset: 1 | -1) => setStep(flow[stepIndex + offset] ?? step);
  const petName = pet.name.trim();
  const canContinue =
    step === "pet"
      ? Boolean(pet.species && petName && pet.age)
      : step === "service"
        ? Boolean(service)
        : step === "staff"
          ? Boolean(staffId)
          : step === "time"
            ? start !== null
            : true;
  const staffSummary = staffId === ANY_STAFF ? copy.anyStaffSummary : (staff?.name ?? "");
  const recap = [
    petStep && stepIndex > 0 ? petName : null,
    step !== "pet" ? service?.name : null,
    staffId ? (staff?.name ?? copy.anyStaff.name) : null,
    (step === "time" || step === "details") && start !== null && activeDay
      ? `${activeDay.short}, ${formatTime(start)}`
      : null,
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
      setStep("time");
      return setError({ field: "slot", message: copy.errors.slotTaken });
    }

    const appointment: Appointment = {
      ...newBookingIds(config.booking.codePrefix),
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
      ...(petStep && { pet: { ...pet, name: petName } }),
    };
    book(appointment);
    setBooked(appointment);
    setError(null);
    setStep("done");
  }

  function fillExample() {
    const example = petStep?.example;
    if (!example) return;
    setPet(example.pet);
    setName(example.clientName);
    setPhone(example.phone);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!canContinue) return;
    if (step === "details") confirmBooking();
    else if (step !== "done") goTo(1);
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
              {step === "done" ? copy.confirmedTitle : copy.title}
            </h2>
            <button type="button" className={styles.close} onClick={onClose} aria-label={copy.close}>
              ×
            </button>
          </div>
          {step !== "done" && (
            <div className={styles.progressWrap}>
              <div
                className={styles.progress}
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={flow.length}
                aria-valuenow={stepNumber}
                aria-label={`Paso ${stepNumber} de ${flow.length}`}
              >
                {flow.map((id, i) => (
                  <span key={id} className={i < stepNumber ? styles.progressOn : undefined} />
                ))}
              </div>
              <div className={styles.stepInfo}>
                <span>
                  Paso {stepNumber} de {flow.length} · <strong>{stepLabels[stepIndex]}</strong>
                </span>
                <span className={styles.recap}>{recap}</span>
              </div>
            </div>
          )}
        </header>

        <div className={styles.body}>
          {step === "pet" && petStep && (
            <>
              <div className={styles.petHead}>
                <h3 ref={headingRef} tabIndex={-1} className={styles.stepHeading}>
                  {petStep.title}
                </h3>
                {petStep.example && (
                  <button type="button" className={styles.example} onClick={fillExample}>
                    {petStep.example.label}
                  </button>
                )}
              </div>
              <fieldset className={styles.group}>
                <legend className={ui.visuallyHidden}>{petStep.title}</legend>
                <div className={styles.species}>
                  {petStep.species.map((option) => (
                    <label key={option.id} className={styles.speciesOption}>
                      <input
                        type="radio"
                        name="species"
                        value={option.id}
                        checked={pet.species === option.id}
                        onChange={() => setPet({ ...pet, species: option.id })}
                        className={ui.visuallyHidden}
                      />
                      <SpeciesFace species={option.id} />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className={styles.field}>
                {petStep.nameLabel}
                <input
                  value={pet.name}
                  onChange={(e) => setPet({ ...pet, name: e.target.value.slice(0, 24) })}
                  autoComplete="off"
                  placeholder={petStep.namePlaceholder}
                  className={styles.input}
                />
              </label>
              <fieldset className={styles.group}>
                <legend className={styles.fieldLegend}>{petStep.ageLabel}</legend>
                <div className={styles.chips}>
                  {petStep.ages.map((age) => (
                    <label key={age} className={styles.chip}>
                      <input
                        type="radio"
                        name="age"
                        value={age}
                        checked={pet.age === age}
                        onChange={() => setPet({ ...pet, age })}
                        className={ui.visuallyHidden}
                      />
                      {age}
                    </label>
                  ))}
                </div>
              </fieldset>
            </>
          )}

          {step === "service" && (
            <>
              <h3
                ref={headingRef}
                tabIndex={-1}
                className={petStep ? styles.stepHeading : ui.visuallyHidden}
              >
                {petStep ? fill(petStep.serviceIntro, { pet: petName || petStep.petFallback }) : copy.steps[0]}
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

          {step === "staff" && service && (
            <fieldset className={styles.group}>
              <legend className={styles.intro}>
                <h3 ref={headingRef} tabIndex={-1} className={styles.introHeading}>
                  {fill(copy.staffIntro, { service: service.name })}
                </h3>
              </legend>
              {[
                {
                  id: ANY_STAFF,
                  name: copy.anyStaff.name,
                  role: copy.anyStaff.role,
                  note: copy.anyStaff.note,
                  initial: "·",
                  avatar: undefined,
                },
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
                      {option.avatar ? (
                        <Image src={option.avatar} alt="" width={48} height={48} className={styles.avatarImage} />
                      ) : (
                        option.initial
                      )}
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

          {step === "time" && service && (
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

          {step === "details" && service && start !== null && (
            <div className={styles.details}>
              <h3 ref={headingRef} tabIndex={-1} className={ui.visuallyHidden}>
                {copy.steps[3]}
              </h3>
              <div className={styles.summary}>
                <strong>{petStep && petName ? `${petName} · ${service.name}` : service.name}</strong>
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

          {step === "done" && booked && service && (
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
                {booked.pet && petStep && (
                  <div>
                    <dt>{petStep.summaryLabel}</dt>
                    <dd>
                      {booked.pet.name} · {petStep.species.find((o) => o.id === booked.pet?.species)?.label}
                    </dd>
                  </div>
                )}
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
          {step !== "done" ? (
            <div className={styles.footerRow}>
              {stepIndex > 0 && (
                <button
                  type="button"
                  className={`${ui.btn} ${ui.md} ${ui.outline}`}
                  onClick={() => {
                    setError(null);
                    goTo(-1);
                  }}
                >
                  {copy.back}
                </button>
              )}
              <button type="submit" className={`${ui.btn} ${ui.md} ${ui.primary} ${styles.next}`} disabled={!canContinue}>
                {step === "details" ? copy.confirm : copy.next}
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

/** Unique id and a short human-friendly code for a new online booking. */
function newBookingIds(prefix: string) {
  return { id: `online-${Date.now()}`, code: `${prefix}-${1000 + Math.floor(Math.random() * 9000)}` };
}

/** Simple line drawing for the species picker (dog, cat or a paw for anything else). */
function SpeciesFace({ species }: { species: string }) {
  const common = { width: 64, height: 56, viewBox: "0 0 64 56", fill: "none", stroke: "currentColor", strokeWidth: 3 } as const;
  if (species === "perro") {
    return (
      <svg {...common} aria-hidden className={styles.speciesFace}>
        <ellipse cx="13" cy="20" rx="8" ry="14" transform="rotate(18 13 20)" className={styles.faceSoft} />
        <ellipse cx="51" cy="20" rx="8" ry="14" transform="rotate(-18 51 20)" className={styles.faceSoft} />
        <path d="M14 22c0-11 8-18 18-18s18 7 18 18v8c0 12-8 22-18 22S14 42 14 30z" className={styles.faceFill} />
        <circle cx="25" cy="26" r="2.5" fill="currentColor" stroke="none" />
        <circle cx="39" cy="26" r="2.5" fill="currentColor" stroke="none" />
        <ellipse cx="32" cy="36" rx="5" ry="3.5" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (species === "gato") {
    return (
      <svg {...common} aria-hidden className={styles.speciesFace}>
        <path d="M12 26 14 4l14 12M52 26 50 4 36 16" className={styles.faceAccent} strokeLinejoin="round" />
        <ellipse cx="32" cy="32" rx="22" ry="20" className={styles.faceFill} />
        <ellipse cx="25" cy="30" rx="2.5" ry="3.5" fill="currentColor" stroke="none" />
        <ellipse cx="39" cy="30" rx="2.5" ry="3.5" fill="currentColor" stroke="none" />
        <ellipse cx="32" cy="39" rx="3.5" ry="2.5" className={styles.faceNose} stroke="none" />
      </svg>
    );
  }
  return (
    <svg {...common} aria-hidden className={styles.speciesFace}>
      <ellipse cx="32" cy="36" rx="12" ry="10" className={styles.faceFill} />
      <circle cx="17" cy="22" r="5" className={styles.faceFill} />
      <circle cx="27" cy="14" r="5" className={styles.faceFill} />
      <circle cx="37" cy="14" r="5" className={styles.faceFill} />
      <circle cx="47" cy="22" r="5" className={styles.faceFill} />
    </svg>
  );
}
