import styles from './SecondProject.module.scss';
import { RightImageProject } from '../RightImageProject';

export const SecondProject = () =>{
    return(
        <div className={styles.FirstProject}>
            <RightImageProject/>
            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id nulla corporis ipsa blanditiis molestiae dicta optio aperiam laboriosam, provident sequi eos praesentium quo pariatur cumque et voluptatibus sed cupiditate similique.
            </div>
        </div>
    );
}