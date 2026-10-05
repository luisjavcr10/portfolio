import type { Dictionary } from "@/i18n/dictionaries/es";
import { site } from "@/data/site";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ContactForm } from "./ContactForm";
import styles from "./Contact.module.css";

export function Contact({ t }: { t: Dictionary["contact"] }) {
  const channels = [
    { label: "Email", value: site.email, href: `mailto:${site.email}`, external: false },
    { label: "LinkedIn", value: `${site.linkedin.handle} ↗`, href: site.linkedin.url, external: true },
    { label: "GitHub", value: `${site.github.handle} ↗`, href: site.github.url, external: true },
  ];

  const primary = site.whatsapp
    ? { href: `https://wa.me/${site.whatsapp}`, label: t.whatsapp, external: true }
    : { href: `mailto:${site.email}`, label: t.emailCta, external: false };

  return (
    <section id="contacto" className="section">
      <div className={`container ${styles.grid}`} data-reveal>
        <div className={`${styles.card} ${styles.info}`}>
          <div className={styles.glow} aria-hidden />
          <div className={styles.intro}>
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h2 className={styles.title}>{t.title}</h2>
            <p className={styles.lead}>{t.lead}</p>
          </div>

          <a
            href={primary.href}
            className={styles.primary}
            {...(primary.external && { target: "_blank", rel: "noopener noreferrer" })}
          >
            <span>{primary.label}</span>
            <span aria-hidden>→</span>
          </a>

          <ul className={styles.channels}>
            {channels.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  className={styles.channel}
                  {...(channel.external && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  <span className={styles.channelLabel}>{channel.label}</span>
                  <span className={styles.channelValue}>{channel.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <ContactForm t={t.form} email={site.email} />
      </div>
    </section>
  );
}
