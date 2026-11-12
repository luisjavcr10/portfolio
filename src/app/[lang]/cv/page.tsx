import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getCvDictionary } from "@/i18n/get-cv-dictionary";
import { site } from "@/data/site";
import { Footer } from "@/components/layout/Footer";
import { CvHeader } from "@/components/cv/CvHeader";
import { CvHero } from "@/components/cv/CvHero";
import { Career } from "@/components/cv/Career";
import { Approach, CvContact, CvProjects, Figures, Marquee } from "@/components/cv/CvSections";

export async function generateMetadata({ params }: PageProps<"/[lang]/cv">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getCvDictionary(lang).meta;

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `/${lang}/cv`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/cv`])),
    },
    // openGraph replaces the layout's object instead of merging, so repeat what it set.
    openGraph: {
      title: t.title,
      description: t.description,
      type: "profile",
      locale: lang === "es" ? "es_PE" : "en_US",
      url: `/${lang}/cv`,
      siteName: site.name,
      images: [{ url: `/og/cv-${lang}.jpg`, width: 1200, height: 630, alt: t.title }],
    },
  };
}

/** Professional portfolio for employers; the business site lives at /[lang]. */
export default async function CvPage({ params }: PageProps<"/[lang]/cv">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = getCvDictionary(lang);

  return (
    <>
      <CvHeader lang={lang} t={t.nav} labels={{ theme: dict.nav.theme, language: dict.nav.language }} />
      <main>
        <CvHero t={t.hero} />
        <Figures items={t.figures} />
        <Career t={t.career} />
        <Marquee />
        <CvProjects t={t.projects} shared={dict.projects} />
        <Approach t={t.approach} />
        <CvContact t={t.contact} />
      </main>
      <Footer lang={lang} t={dict.footer} />
    </>
  );
}
