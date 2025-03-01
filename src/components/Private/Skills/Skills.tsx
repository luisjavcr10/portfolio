import styles from './Skills.module.scss';
import { SectionTitle } from '@/components/Shared/SectionTitle';
import { SkillsCard } from '@/components/Shared/SkillsCard';
import { FaTools } from "react-icons/fa";
import {iconTools,iconsBackend,iconsDataBases,iconsFrontend,iconsLanguages} from './IconsLists';

const skillsCards = [
    {title:'Frontend', icons:iconsFrontend, numGrid:1},
    {title:'Backend', icons:iconsBackend, numGrid:2},
    {title:'Lenguajes', icons:iconsLanguages, numGrid:3},
    {title:'Base de datos', icons:iconsDataBases, numGrid:4},
    {title:'Herramientas', icons:iconTools, numGrid:5},
]

export const Skills = () =>{
    return(
        <div className={styles.Skills}>
            <SectionTitle title='Habilidades'>
                <FaTools className={styles.Skills__Icon}/>
            </SectionTitle>
            <div className={styles.Skills__GridCards}>
                {skillsCards.map((c)=>(
                    <SkillsCard key={c.title} title={c.title} icons={c.icons} numGrid={c.numGrid}/>
                ))}
            </div>
        </div>
    )
};