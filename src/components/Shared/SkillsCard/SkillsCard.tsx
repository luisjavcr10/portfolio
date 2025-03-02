import styles from './SkillsCard.module.scss';
import { SkillIcon } from '../SkillIcon';

interface iconsInterface {
    svg: React.ReactElement;
    name: string;
}

export const SkillsCard = ({title,icons, numGrid}: Readonly<{title:string;icons:iconsInterface[]; numGrid:number}>) => {
    return(
        <div className={`${styles.SkillsCard} ${styles[`SkillsCard--${numGrid}`]}`}>
            <h1 className={styles.SkillsCard__Title}>{title}</h1>
            <div className={`${styles.SkillsCard__Icons} ${styles[`SkillsCard__Icons--${numGrid}`]}`}>
                {icons.map((i)=>(
                    <SkillIcon key={i.name} icon={i.svg} name={i.name}/>
                ))}
            </div>
        </div>
    )
};