import Link from "next/link";
import { locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { site } from "@/data/site";
import { ContactTrigger } from "@/components/contact/ContactPanel";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.css";

type HeaderProps = {
  lang: Locale;
  t: Dictionary["nav"];
  /** Current page below the locale, e.g. "/legal", so the language switch stays on it. */
  path?: string;
};

export function Header({ lang, t, path = "" }: HeaderProps) {
  // Section links include the home path so they also work from other pages.
  const home = `/${lang}`;
  const links = [
    { href: `${home}#soluciones`, label: t.solutions },
    { href: `${home}#incluye`, label: t.includes },
    { href: `${home}#como`, label: t.how },
    { href: `${home}#proyectos`, label: t.projects },
    { href: `${home}#sobre-mi`, label: t.about },
  ];

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href={`${home}#inicio`} className={styles.brand}>
          <span className={styles.logo}>{site.initials}</span>
          <span>{site.name}</span>
        </a>

        <nav className={styles.nav}>
          {links.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <div className={styles.langSwitch} role="group" aria-label={t.language}>
            {locales.map((locale) => (
              <Link
                key={locale}
                href={`/${locale}${path}`}
                hrefLang={locale}
                aria-current={locale === lang ? "true" : undefined}
                className={styles.langOption}
              >
                {locale.toUpperCase()}
              </Link>
            ))}
          </div>
          <ThemeToggle label={t.theme} />
          <ContactTrigger className={styles.cta}>{t.cta}</ContactTrigger>
        </div>
      </div>
    </header>
  );
}
