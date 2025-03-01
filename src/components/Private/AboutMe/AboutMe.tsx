import styles from './AboutMe.module.scss';
import { SectionTitle } from '@/components/Shared/SectionTitle';
import { FaUserAstronaut } from "react-icons/fa6";

export const AboutMe = () =>{
    return(
        <div className={styles.AboutMe}>
            <SectionTitle title='Sobre mí'>
                <FaUserAstronaut className={styles.AboutMe__Icon}/>
            </SectionTitle>
        </div>
    )
};