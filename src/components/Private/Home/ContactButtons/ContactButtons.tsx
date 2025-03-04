import styles from './ContactButtons.module.scss';
import { FaGithub } from "react-icons/fa";
import { CiLinkedin, CiMail } from "react-icons/ci";

export const ContactButtons = () =>{
    return(
    <div className={styles.ContactButtons}>
        <div className={styles.ContactButtons__SocialContact}>
            <a
                className={styles.ContactButtons__SocialButton} 
                href='https://www.linkedin.com/in/luis-javier-castillo-rabanal-897b542a4/'
                target='_blank'
                rel='noopener noreferrer  '
            >
                <CiLinkedin className={styles.ContactButtons__Icon} />
                <h1>LinkedIn</h1> 
            </a>
            <a 
                className={styles.ContactButtons__SocialButton} 
                href='https://github.com/luisjavcr10'
                target='_blank'
                rel='noopener noreferrer  '
            >
                <FaGithub className={styles.ContactButtons__Icon} />
                <h1>Github</h1> 
            </a>
        </div> 
        <a 
            className={styles.ContactButtons__Correo} 
            href='mailto:ing.castillorabanal@gmail.com'
            target='_blank'
            rel='noopener noreferrer  '
        >
            <CiMail className={styles.ContactButtons__Icon} />
            <h1>ing.castillorabanal@gmail.com</h1> 
        </a>
    </div>
    );
};