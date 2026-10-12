import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { site } from "@/data/site";
import { ContactPanelProvider } from "@/components/contact/ContactPanel";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import styles from "./legal.module.css";

export async function generateMetadata({ params }: PageProps<"/[lang]/legal">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang).legal;

  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${lang}/legal`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/legal`])),
    },
    openGraph: { title: t.meta.title, description: t.meta.description },
  };
}

/** Swaps the {email} token in a paragraph for a mail link. */
function withEmail(text: string) {
  const [before, after] = text.split("{email}");
  if (after === undefined) return text;
  return (
    <>
      {before}
      <a href={`mailto:${site.email}`}>{site.email}</a>
      {after}
    </>
  );
}

export default async function LegalPage({ params }: PageProps<"/[lang]/legal">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.legal;

  return (
    <ContactPanelProvider lang={lang} t={dict.contactPanel}>
      <Header lang={lang} t={dict.nav} path="/legal" />
      <main className={`container ${styles.page}`}>
        <header className={styles.intro}>
          <span className={styles.eyebrow}>{t.eyebrow}</span>
          <h1 className={styles.title}>{t.title}</h1>
          <p className={styles.updated}>
            {t.updatedLabel} {t.updated}
          </p>
          <p className={styles.summary}>{t.summary}</p>
        </header>

        <nav className={styles.toc} aria-label={t.title}>
          <ol>
            {t.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ol>
        </nav>

        <div className={styles.sections}>
          {t.sections.map((section) => (
            <section key={section.id} id={section.id} className={styles.section}>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{withEmail(paragraph)}</p>
              ))}
            </section>
          ))}
        </div>

        <Link href={`/${lang}`} className={styles.back}>
          ← {t.back}
        </Link>
      </main>
      <Footer lang={lang} t={dict.footer} />
    </ContactPanelProvider>
  );
}
