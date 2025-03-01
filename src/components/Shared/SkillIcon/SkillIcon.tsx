import styles from './SkillIcon.module.scss';

export const SkillIcon = ({ icon, name }: Readonly<{ icon: React.ReactElement; name:string }>) => {
    return (
        <div className={styles.SkillIcon}>
            {icon} 
            <h3 className={styles.SkillIcon__Name}>{name}</h3>
        </div>
    );
};