import styles from './FirstProject.module.scss';
import { LeftImageProject } from '../LeftImageProject';

export const FirstProject = () =>{
    return(
        <div className={styles.FirstProject}>
            <LeftImageProject/>
            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id nulla corporis ipsa blanditiis molestiae dicta optio aperiam laboriosam, provident sequi eos praesentium quo pariatur cumque et voluptatibus sed cupiditate similique.
            </div>
        </div>
    );
}