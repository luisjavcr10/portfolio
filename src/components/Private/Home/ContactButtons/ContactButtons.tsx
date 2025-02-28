import styles from './ContactButtons.module.scss';
import { FaGithub } from "react-icons/fa";
import { CiLinkedin, CiMail } from "react-icons/ci";

export const ContactButtons = () =>{
    return(
    <div className={styles.ContactButtons}>
        <a 
            href='mailto:ing.castillorabanal@gmail.com'
            target='_blank'
            rel='noopener noreferrer  '
        >
            <CiMail />
            <h1>Contacto</h1> 
        </a>
        <a 
            href='https://www.linkedin.com/in/luis-javier-castillo-rabanal-897b542a4/'
            target='_blank'
            rel='noopener noreferrer  '
        >
            <CiLinkedin className={styles.ContactButtons__Icon} />
            <h1>LinkedIn</h1> 
        </a>
        <a 
            href='https://github.com/luisjavcr10'
            target='_blank'
            rel='noopener noreferrer  '
        >
            <FaGithub />
            <h1>Github</h1> 
        </a>
    </div>
    );
};