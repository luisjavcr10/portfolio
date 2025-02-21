"use client"
import styles from "./ContactButtons.module.scss";
import { FaGithub } from "react-icons/fa";
import { CiLinkedin, CiMail } from "react-icons/ci";
import SplitText from "../../../ReactBits/SplitText/SplitText";

export const ContactButtons = () => {
  const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

  return (
    <div className={styles.ContactButtons}>
      <div>
        <SplitText
        tag="h1"
          text="Hola 👋, soy Luis Castillo"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        />
        <p className={styles.Home__Presentation__Text} style={{fontWeight: 'bold'}}>Desarrollador de software</p>
        <p className={styles.Home__Presentation__Text}>+ 1 año de experiencia</p>
        <p className={styles.Home__Presentation__Text}>
          Me apasiona crear soluciones web escalables y eficientes que optimicen procesos. Trabajo principalmente con TypeScript y frameworks modernos como React, Next.js y NestJS.
        </p>
      </div>

      <div className={styles.ContactButtons__Social}>
        <div className={styles.ContactButtons__SocialContact}>
          <a
            className={styles.ContactButtons__SocialButton}
            href="https://www.linkedin.com/in/luisjaviercastillorabanal/"
            target="_blank"
            rel="noopener noreferrer  "
          >
            <CiLinkedin className={styles.ContactButtons__Icon} />
            <h1 className={styles.ContactButtons__correo}>LinkedIn</h1>
          </a>
          <a
            className={styles.ContactButtons__SocialButton}
            href="https://github.com/luisjavcr10"
            target="_blank"
            rel="noopener noreferrer  "
          >
            <FaGithub className={styles.ContactButtons__Icon} />
            <h1 className={styles.ContactButtons__correo}>Github</h1>
          </a>
        </div>
        <a
          className={styles.ContactButtons__Correo}
          href="mailto:lcastillorabanal@icloud.com"
        >
          <CiMail className={styles.ContactButtons__Icon} />
          <h1 className={styles.ContactButtons__correo}>lcastillorabanal@icloud.com</h1>
        </a>
      </div>
    </div>
  );
};
