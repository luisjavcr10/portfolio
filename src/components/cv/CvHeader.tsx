import Link from "next/link";
import { locales, type Locale } from "@/i18n/config";
import type { CvDictionary } from "@/i18n/dictionaries/cv/es";
import { site } from "@/data/site";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import styles from "@/components/layout/Header.module.css";
import { DownloadIcon } from "./icons";
import own from "./CvSections.module.css";

type CvHeaderProps = {
  lang: Locale;
  t: CvDictionary["nav"];
  /** Labels shared with the business site's header. */
  labels: { theme: string; language: string };
};

/** Same header as the business site, with the professional page's sections and the CV as its action. */
export function CvHeader({ lang, t, labels }: CvHeaderProps) {
  const links = [
    { href: "#trayectoria", label: t.career },
    { href: "#proyectos", label: t.projects },
    { href: "#enfoque", label: t.approach },
    { href: "#contacto", label: t.contact },
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
          <div className={styles.langSwitch} role="group" aria-label={labels.language}>
            {locales.map((locale) => (
              <Link
                key={locale}
                href={`/${locale}/cv`}
                hrefLang={locale}
                aria-current={locale === lang ? "true" : undefined}
                className={styles.langOption}
              >
                {locale.toUpperCase()}
              </Link>
            ))}
          </div>
          <ThemeToggle label={labels.theme} />
          <a href={encodeURI(site.cvPath)} target="_blank" rel="noopener noreferrer" className={`${styles.cta} ${own.headerCta}`}>
            <DownloadIcon /> {t.cv}
          </a>
        </div>
      </div>
    </header>
  );
}
