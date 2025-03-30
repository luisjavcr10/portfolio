import styles from './Footer.module.scss';
import { FaGithub } from "react-icons/fa";
import { CiLinkedin, CiMail } from "react-icons/ci";

export const Footer = () => {
    return(
        <div className={styles.Footer}>
            <div className={styles.Footer__Framework}>
            Este sitio fue desarrollado con Next.js, un poco de ChatGPT y, por supuesto, mi toque personal. Jajaja 😅   !
            </div>
            <div className={styles.Footer__Contact}>
                <a 
                    className={styles.Footer__Contact__IconContainer}
                    href='mailto:ing.castillorabanal@gmail.com'
                    target='_blank'
                    rel='noopener noreferrer  '
                >
                    <CiMail className={styles.Footer__Contact__IconContainer__Icon}/>
                    ing.castillorabanal@gmail.com
                </a>
                <div className={styles.Footer__Contact__Social}>
                    <a 
                        className={styles.Footer__Contact__IconContainer}
                        href='https://www.linkedin.com/in/luis-javier-castillo-rabanal-897b542a4/'
                        aria-label='LinkedIn'
                        target='_blank'
                        rel='noopener noreferrer  '
                    >
                        <CiLinkedin className={styles.Footer__Contact__IconContainer__Icon}/>
                    </a>
                    <a 
                        className={styles.Footer__Contact__IconContainer}
                        href='https://github.com/luisjavcr10'
                        aria-label='GitHub'
                        target='_blank'
                        rel='noopener noreferrer  '
                    >
                        <FaGithub className={styles.Footer__Contact__IconContainer__Icon}/>
                    </a>
                </div>
                
            </div>
            
            
        </div>
    )
};
