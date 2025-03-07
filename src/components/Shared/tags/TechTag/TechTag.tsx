import styles from './TechTag.module.scss';

export const TechTag = ({title, icon}: Readonly<{title:string; icon:React.ReactElement;}>) =>{
    return(
        <div className={styles.TechTag}>
            {icon}
            {title}
        </div>
    );
};