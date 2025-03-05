import styles from './Projects.module.scss';
import { FaLaptopCode } from "react-icons/fa";
import { SectionTitle } from '@/components/Shared/SectionTitle';
import { FirstProject } from '@/components/Shared/projectsCard/FirstProject';
import { SecondProject } from '@/components/Shared/projectsCard/SecondProject';

export const Projects = () =>{
    return (
        <div className={styles.Projects}>
            <SectionTitle title='Proyectos'>
                <FaLaptopCode className={styles.Projects__Icon} />
            </SectionTitle>     
            <div className={styles.Projects__ProjectsList} >
                <FirstProject/>
                <SecondProject/>
            </div>
        </div>
    );
};