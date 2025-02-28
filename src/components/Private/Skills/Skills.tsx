import styles from './Skills.module.scss';
import { SectionTitle } from '@/components/Shared/SectionTitle';
import { FaTools } from "react-icons/fa";

export const Skills = () =>{
    return(
        <div className={styles.Skills}>
            <SectionTitle title='Habilidades'>
                <FaTools className={styles.Skills__Icon}/>
            </SectionTitle>
        </div>
    )
};