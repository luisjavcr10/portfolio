import styles from './FirstProject.module.scss';
import { LeftImageProject } from '../LeftImageProject';

export const FirstProject = () =>{
    return(
        <div className={styles.FirstProject}>
            <LeftImageProject/>
            {/*<div>
                <h1>Frontend</h1>
                <p>Descripcion</p>
                🥶tailwind 🙏react
            </div>*/}
        </div>
    );
}