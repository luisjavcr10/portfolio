"use client";

import { useEffect, useState } from "react";
import styles from "./CvSections.module.css";

type CopyEmailProps = {
  email: string;
  labels: { copy: string; copied: string; aria: string };
};

/** The email as a button that copies it; falls back to opening the mail client if copying is blocked. */
export function CopyEmail({ email, labels }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button type="button" className={styles.email} onClick={copy} aria-label={`${labels.aria}: ${email}`}>
      <span className={styles.emailAddress}>{email}</span>
      <span className={styles.emailBadge} aria-live="polite">
        {copied ? labels.copied : labels.copy}
      </span>
    </button>
  );
}
