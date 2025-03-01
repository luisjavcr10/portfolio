import styles from './Skills.module.scss';
import { SectionTitle } from '@/components/Shared/SectionTitle';
import { SkillsCard } from '@/components/Shared/SkillsCard';
import { FaTools } from "react-icons/fa";

import { NextjsIcon } from '@/utils/icons/NextJsIcon';
import { ReactIcon } from '@/utils/icons/ReactJsIcon';
import { TailwindCSSIcon } from '@/utils/icons/TailwindCSSIcon/TailwindCSSIcon';
import { BootstrapIcon } from '@/utils/icons/BootStrapIcon';
import { NodeJsIcon } from '@/utils/icons/NodeJsIcon';
import { ExpressJsIcon } from '@/utils/icons/ExpressJsIcon';
import { SpringIcon } from '@/utils/icons/SpringIcon';
import { GraphQLIcon } from '@/utils/icons/GraphQLIcon';
import { RestAPIIcon } from '@/utils/icons/RestAPIIcon';


const iconsFrontend = [
    { svg: <NextjsIcon className={styles.Skills__IconList}/> , name: 'Next.js'},
    { svg: <ReactIcon className={styles.Skills__IconList}/> , name: 'React.js'},
    { svg: <TailwindCSSIcon className={styles.Skills__IconList}/> , name: 'TailwindCSS'},
    { svg: <BootstrapIcon className={styles.Skills__IconList}/> , name: 'Bootstrap'},
];

const iconsBackend = [
    { svg: <NodeJsIcon className={styles.Skills__IconList}/> , name: 'Node.js'},
    { svg: <ExpressJsIcon className={styles.Skills__IconList}/> , name: 'Express.js'},
    { svg: <SpringIcon className={styles.Skills__IconList}/> , name: 'Spring'},
    { svg: <GraphQLIcon className={styles.Skills__IconList}/> , name: 'GraphQL'},
    { svg: <RestAPIIcon /> , name: 'RestAPI'},
];

export const Skills = () =>{
    return(
        <div className={styles.Skills}>
            <SectionTitle title='Habilidades'>
                <FaTools className={styles.Skills__Icon}/>
            </SectionTitle>
            <div className={styles.Skills__GridCards}>
                <SkillsCard title='Frontend' icons={iconsFrontend} numGrid={1}/>
                <SkillsCard title='Backend' icons={iconsBackend} numGrid={2}/>
                <SkillsCard title='Languajes' icons={iconsBackend} numGrid={3}/>
                <SkillsCard title='Base de datos' icons={iconsFrontend} numGrid={4}/>
            </div>
        </div>
    )
};