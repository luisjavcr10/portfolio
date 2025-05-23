import { Title } from "@/components/Private/Home/Title";
import {ContactButtons} from "@/components/Private/Home/ContactButtons";
import { Projects } from "@/components/Private/Projects";
import { Skills } from "@/components/Private/Skills";
import { AboutMe } from "@/components/Private/AboutMe";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.Main_Container}>
      <section id="home">
        <Title />
        <ContactButtons/>
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="aboutme">
        <AboutMe />
      </section>
      
    </div>
  );
}
