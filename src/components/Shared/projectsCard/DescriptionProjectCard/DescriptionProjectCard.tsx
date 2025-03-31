import styles from './DescriptionProjectCard.module.scss';

import { SpecialTag } from '@/components/Shared/tags/SpecialTag';
import { TechTag } from '@/components/Shared/tags/TechTag';
import { GithubButton } from '@/components/Shared/tags/CodeTag';

interface TechTagProps{
    title: string;
    icon: React.ReactElement;
}

export const DescriptionProjectCard = ({ children,devSide, techs, description, linkGithub}: Readonly<{children:React.ReactNode;devSide:string; techs: TechTagProps[]; description: string; linkGithub:string }>) => {
    return(
        <div className={styles.DescriptionProjectCard}>
            <div className={styles.DescriptionProjectCard__TagsSection}>
                <div className={styles.SpecialTag} >
                    <SpecialTag 
                        message={devSide}
                    />
                </div>
                <div className={styles.DescriptionProjectCard__Techs}>
                    {techs.map((tech, index) => (
                        <TechTag key={index} title={tech.title} icon={tech.icon} />
                    ))}
                </div>
            </div>
            
            <p className={styles.DescriptionProjectCard__Description}>
                {children}
            </p>
            <div className={styles.DescriptionProjectCard__LinkSection}>
                <GithubButton href={linkGithub}/>
            </div>                
        </div>
    );
};