import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { ContactPanelProvider } from "@/components/contact/ContactPanel";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Solutions } from "@/components/sections/solutions/Solutions";
import { Includes } from "@/components/sections/Includes";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/contact/Contact";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <ContactPanelProvider lang={lang} t={t.contactPanel}>
      <Header lang={lang} t={t.nav} />
      <main>
        <Hero t={t.hero} />
        <Solutions t={t.solutions} />
        <Includes t={t.includes} />
        <HowWeWork t={t.how} />
        <Projects t={t.projects} />
        <About t={t.about} />
        <Contact t={t.contact} />
      </main>
      <Footer lang={lang} t={t.footer} />
    </ContactPanelProvider>
  );
}
