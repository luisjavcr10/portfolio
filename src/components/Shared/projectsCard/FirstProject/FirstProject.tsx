import styles from './FirstProject.module.scss';
import Image from 'next/image';

export const FirstProject = () =>{
    return(
        <div className={styles.FirstProject}>
            <div className={styles.FirstProject__ImageContainer}>
                <Image
                    src='/images/projects/prototipo2.jpg'
                    fill
                    alt='imageproject'
                    className={styles.FirstProject__ImageContainer__Image}
                />
            </div>
            <div>
                holaaa
            </div>
            
        </div>
    );
}