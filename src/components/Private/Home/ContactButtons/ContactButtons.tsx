import styles from "./ContactButtons.module.scss";
import { FaGithub } from "react-icons/fa";
import { CiLinkedin, CiMail } from "react-icons/ci";

export const ContactButtons = () => {
  return (
    <div className={styles.ContactButtons}>
      <div>
        <h1 className={styles.ContactButtons__title}>Hola 👋, soy Luis Castillo</h1>
        <p className={styles.Home__Presentation__Text}>
          Me apasiona crear experiencias web que sean tanto funcionales como
          estéticamente cuidadas. Trabajo con tecnologías como React, Next.js y
          Node.js, siempre buscando calidad y escalabilidad.
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
          target="_blank"
          rel="noopener noreferrer  "
        >
          <CiMail className={styles.ContactButtons__Icon} />
          <h1 className={styles.ContactButtons__correo}>lcastillorabanal@icloud.com</h1>
        </a>
      </div>
    </div>
  );
};
