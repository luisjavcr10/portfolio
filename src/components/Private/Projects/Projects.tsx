import styles from './Projects.module.scss';
import Image from 'next/image';

import { FaLaptopCode } from "react-icons/fa";

import { SectionTitle } from '@/components/Shared/SectionTitle';
import { DescriptionProjectCard } from '@/components/Shared/projectsCard/DescriptionProjectCard';

import { ReactIcon } from '@/utils/Icons/Frontend/ReactJsIcon';
import { TailwindCSSIcon } from '@/utils/Icons/Frontend/TailwindCSSIcon/TailwindCSSIcon';
import { NodeJsIcon } from '@/utils/Icons/BackEnd/NodeJsIcon';
import { ExpressJsIcon } from '@/utils/Icons/BackEnd/ExpressJsIcon';

import { BiSolidPurchaseTagAlt } from "react-icons/bi";

const cards = [
    {
        devSide:'FRONTEND',
        techs:[
            {title:'React', icon:<ReactIcon/>},
            {title:'TailwindCSS', icon:<TailwindCSSIcon />}
        ],
        description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem vitae est consequuntur ad nostrum tempora, veniam sed obcaecati vero esse sunt eligendi nisi nemo fugiat, odio aliquid minus dignissimos iste!',
        linkGithub:'https://github.com/luisjavcr10/frontEnd_peluqueria'
    },
    {
        devSide:'BACKEND',
        techs:[
            {title:'Node.js', icon:<NodeJsIcon/>},
            {title:'Express.js', icon:<ExpressJsIcon/>}
        ],
        description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem vitae est consequuntur ad nostrum tempora, veniam sed obcaecati vero esse sunt eligendi nisi nemo fugiat, odio aliquid minus dignissimos iste!',
        linkGithub:'https://github.com/luisjavcr10/backEnd_peluqueria'
    }
]

export const Projects = () =>{
    return (
        <div className={styles.Projects}>
            <SectionTitle title='Proyectos'>
                <FaLaptopCode className={styles.Projects__Icon} />
            </SectionTitle>     
            <div className={styles.Projects__ProjectsList} >
                <div className={styles.Projects__ProjectTitle}> 
                    <BiSolidPurchaseTagAlt/> 
                    <h1>Damaris Salón - Sistema de ventas e inventario</h1>
                </div>
                <div className={styles.Projects__ProjectsList__Image}>
                    <Image
                        className={styles.Projects__ProjectsList__Image__Component}
                        src={'/images/projects/prototipo2.jpg'}
                        alt='Damaris Salón - Sistema de ventas e inventario'
                        fill
                    />
                </div>
                <div className={styles.Projects__ProjectsList__Description}>
                    {cards.map((card, index) => (
                        <DescriptionProjectCard
                            key={index}
                            devSide={card.devSide}
                            techs={card.techs}
                            description={card.description}
                            linkGithub={card.linkGithub}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};