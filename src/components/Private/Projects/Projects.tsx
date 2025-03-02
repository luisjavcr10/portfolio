import styles from './Projects.module.scss';
import { FaLaptopCode } from "react-icons/fa";
import { SectionTitle } from '@/components/Shared/SectionTitle';
import { FirstProject } from '@/components/Shared/projectsCard/FirstProject';

export const Projects = () =>{
    return (
        <div className={styles.Projects}>
            <SectionTitle title='Proyectos'>
                <FaLaptopCode className={styles.Projects__Icon} />
            </SectionTitle>     
            {/*<div>
                <FirstProject/>
            </div>*/}
        </div>
    );
};