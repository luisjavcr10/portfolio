import Link from "next/link";
import { locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.css";

type HeaderProps = {
  lang: Locale;
  t: Dictionary["nav"];
};

export function Header({ lang, t }: HeaderProps) {
  const links = [
    { href: "#soluciones", label: t.solutions },
    { href: "#proyectos", label: t.projects },
    { href: "#experiencia", label: t.experience },
    { href: "#stack", label: t.stack },
    { href: "#sobre-mi", label: t.about },
  ];

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#inicio" className={styles.brand}>
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
                href={`/${locale}`}
                hrefLang={locale}
                aria-current={locale === lang ? "true" : undefined}
                className={styles.langOption}
              >
                {locale.toUpperCase()}
              </Link>
            ))}
          </div>
          <ThemeToggle label={t.theme} />
          <a href="#contacto" className={styles.cta}>
            {t.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
