"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/dictionaries/es";
import styles from "./Contact.module.css";

type ContactFormProps = {
  t: Dictionary["contact"]["form"];
  email: string;
};

/** No backend: the form composes an email in the visitor's mail app. */
export function ContactForm({ t, email }: ContactFormProps) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const from = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const body = `${message}\n\n— ${name} (${from})`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form className={`${styles.card} ${styles.form}`} onSubmit={handleSubmit}>
      <label className={styles.field}>
        <span>{t.name}</span>
        <input name="name" type="text" autoComplete="name" required className={styles.input} />
      </label>
      <label className={styles.field}>
        <span>{t.email}</span>
        <input name="email" type="email" autoComplete="email" required className={styles.input} />
      </label>
      <label className={`${styles.field} ${styles.grow}`}>
        <span>{t.message}</span>
        <textarea name="message" rows={5} required className={`${styles.input} ${styles.textarea}`} />
      </label>
      <button type="submit" className={styles.submit}>
        {sent ? t.sent : t.submit}
      </button>
    </form>
  );
}
