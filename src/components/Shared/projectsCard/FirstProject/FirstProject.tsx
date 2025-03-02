import styles from './FirstProject.module.scss';
import Image from 'next/image';

export const FirstProject = () =>{
    return(
        <div className={styles.FirstProject}>
            <div className={styles.FirstProject__Image1}>
                <Image
                    src='/images/projects/example.jpg'
                    fill 
                    style={{ objectFit: "contain" }} 
                    alt='imageproject'
                />
            </div>
            <div className={styles.FirstProject__Image2}>
                <Image
                    src='/images/projects/example.jpg'
                    fill 
                    style={{ objectFit: "contain" }} 
                    alt='imageproject'
                />
            </div>
        </div>
    );
}