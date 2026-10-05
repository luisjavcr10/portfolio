import type { Dictionary } from "@/i18n/dictionaries/es";
import { site } from "@/data/site";
import styles from "./Footer.module.css";

export function Footer({ t }: { t: Dictionary["footer"] }) {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span>
          © {new Date().getFullYear()} {site.name} · {t.madeIn}
        </span>
        <div className={styles.links}>
          <a href={site.github.url} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={site.linkedin.url} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`}>Email</a>
        </div>
      </div>
    </footer>
  );
}
