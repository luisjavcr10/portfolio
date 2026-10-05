import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Solutions } from "@/components/sections/solutions/Solutions";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Stack } from "@/components/sections/Stack";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/contact/Contact";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <Header lang={lang} t={t.nav} />
      <main>
        <Hero t={t.hero} />
        <Solutions t={t.solutions} />
        <Projects t={t.projects} />
        <Experience t={t.experience} />
        <Stack t={t.stack} />
        <About t={t.about} />
        <Contact t={t.contact} />
      </main>
      <Footer t={t.footer} />
    </>
  );
}
