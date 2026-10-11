"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { site } from "@/data/site";
import styles from "./ContactPanel.module.css";

type ContactPanelApi = { open: (business?: string) => void };

const ContactPanelContext = createContext<ContactPanelApi | null>(null);

function useContactPanel(): ContactPanelApi {
  const api = useContext(ContactPanelContext);
  if (!api) throw new Error("useContactPanel must be used inside <ContactPanelProvider>");
  return api;
}

/**
 * Side panel (bottom sheet on phones) that prepares a WhatsApp message. Every
 * "Let's work together" button on the page opens it through ContactTrigger.
 */
export function ContactPanelProvider({ t, children }: { t: Dictionary["contactPanel"]; children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [business, setBusiness] = useState<string | null>(null);

  const open = useCallback((preset?: string) => {
    setBusiness(preset ?? null);
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  // Clicking the backdrop (the dialog element itself, outside the panel) closes it.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClick = (event: MouseEvent) => {
      if (event.target === dialog) dialog.close();
    };
    dialog.addEventListener("click", onClick);
    return () => dialog.removeEventListener("click", onClick);
  }, []);

  const chosen = t.businesses.find((b) => b.id === business);
  const message = chosen?.phrase ? t.messageWithBusiness.replace("{business}", chosen.phrase) : t.message;
  const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
  const mailHref = `mailto:${site.email}?subject=${encodeURIComponent(t.emailSubject)}&body=${encodeURIComponent(message)}`;

  return (
    <ContactPanelContext.Provider value={{ open }}>
      {children}
      <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="contact-panel-title">
        <div className={styles.top}>
          <div className={styles.fret} aria-hidden />
          <span className={styles.grabber} aria-hidden />
          <div className={styles.topRow}>
            <span className={styles.eyebrow}>{t.eyebrow}</span>
            <button type="button" className={styles.close} aria-label={t.close} onClick={() => dialogRef.current?.close()}>
              ×
            </button>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.intro}>
            <h2 id="contact-panel-title" className={styles.title}>
              {t.title}
            </h2>
            <p className={styles.lead}>{t.lead}</p>
          </div>

          <fieldset className={styles.fieldset}>
            <legend className={styles.question}>
              <span>{t.businessQuestion}</span>
              <span className={styles.optional}>{t.optional}</span>
            </legend>
            <div className={styles.options}>
              {t.businesses.map((option) => {
                const selected = option.id === business;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={selected}
                    className={styles.option}
                    onClick={() => setBusiness(selected ? null : option.id)}
                  >
                    <span className={styles.optionMark} aria-hidden />
                    {option.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className={styles.preview}>
            <span className={styles.previewLabel}>{t.messageLabel}</span>
            <p className={styles.bubble} aria-live="polite">
              {message}
            </p>
          </div>

          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={styles.whatsapp}>
            <span>{t.whatsapp}</span>
            <span aria-hidden>→</span>
          </a>
          <a href={mailHref} className={styles.mail}>
            {t.email}
          </a>
        </div>
      </dialog>
    </ContactPanelContext.Provider>
  );
}

type ContactTriggerProps = {
  children: ReactNode;
  className?: string;
  /** Business type to preselect, e.g. "salon". */
  business?: string;
  /** Keep the click from reaching parents (carousel slides react to clicks). */
  stopPropagation?: boolean;
};

/** Button that opens the contact panel. Usable from server components. */
export function ContactTrigger({ children, className, business, stopPropagation = false }: ContactTriggerProps) {
  const { open } = useContactPanel();
  return (
    <button
      type="button"
      className={className}
      aria-haspopup="dialog"
      onClick={(event) => {
        if (stopPropagation) event.stopPropagation();
        open(business);
      }}
    >
      {children}
    </button>
  );
}
