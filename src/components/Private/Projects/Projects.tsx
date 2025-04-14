import styles from './Projects.module.scss';
import { SectionTitle } from '@/components/Shared/SectionTitle';
import { DescriptionProjectCard } from '@/components/Shared/projectsCard/DescriptionProjectCard';
import { VideoApiRuc } from './VideoApiRuc';
import { ImageCarousel } from './ImageCarousel';

import { ReactIcon } from '@/utils/Icons/Frontend/ReactJsIcon';
import { TailwindCSSIcon } from '@/utils/Icons/Frontend/TailwindCSSIcon/TailwindCSSIcon';
import { NodeJsIcon } from '@/utils/Icons/BackEnd/NodeJsIcon';
import { ExpressJsIcon } from '@/utils/Icons/BackEnd/ExpressJsIcon';
import { NextjsIcon } from '@/utils/Icons/Frontend/NextJsIcon';
import { SassIcon } from '@/utils/Icons/Languages/SassIcon';

import { BiSolidPurchaseTagAlt } from "react-icons/bi";
import { PiDetectiveFill } from "react-icons/pi";
import { FaLaptopCode } from "react-icons/fa";

const cardsDamarisSalon = [
    {
        devSide:'FRONTEND',
        techs:[
            {title:'React', icon:<ReactIcon/>},
            {title:'TailwindCSS', icon:<TailwindCSSIcon />}
        ],
        description:'Sistema que ofrece una navegación ágil y responsiva, con un dashboard interactivo, gestión de ventas e inventario, e integración segura de pagos con PayPal.',
        linkGithub:'https://github.com/luisjavcr10/frontEnd_peluqueria'
    },
    {
        devSide:'BACKEND',
        techs:[
            {title:'Node.js', icon:<NodeJsIcon/>},
            {title:'Express.js', icon:<ExpressJsIcon/>}
        ],
        description: 'API REST escalable y segura para gestionar información de forma eficiente. Implementa autenticación JWT y se integra con PayPal y ExchangeRate para pagos y conversiones en tiempo real.',
        linkGithub:'https://github.com/luisjavcr10/backEnd_peluqueria'
    }
]

const cardsApiSunat = [
    {
        devSide:'BACKEND',
        techs:[
            {title:'Node.js', icon:<NodeJsIcon/>},
            {title:'Express.js', icon:<ExpressJsIcon/>}
        ],
        description:'API REST para automatizar la obtención de datos de clientes (DNI/RUC) en un sistema de ventas. Extrae información de SUNAT con Puppeteer, agilizando el proceso y evitando el ingreso manual.',
        linkGithub:'https://github.com/luisjavcr10/api-consulta-sunat'
    }
]

const cardsAuditAi = [
    {
        devSide:'FRONTEND',
        techs:[
            {title:'Next.js', icon:<NextjsIcon/>},
            {title:'Sass', icon:<SassIcon/>}
        ],
        description:'API REST para automatizar la obtención de datos de clientes (DNI/RUC) en un sistema de ventas. Extrae información de SUNAT con Puppeteer, agilizando el proceso y evitando el ingreso manual.',
        linkGithub:'https://github.com/luisjavcr10/front-audit-ai',
        linkPreview:'https://front-audit-ai.vercel.app/'
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
                    <BiSolidPurchaseTagAlt className={styles.Projects__ProjectTitle__Icon}/> 
                    <h1 className={styles.Projects__ProjectTitle__Text}>AuditAI - Smart Auditing with AI.</h1>
                </div>
                
                <ImageCarousel 
                    images={[
                        '/images/projects/AuditAi/home.png',
                        '/images/projects/AuditAi/load-file.png',
                        '/images/projects/AuditAi/config.png',
                        '/images/projects/AuditAi/dashboard.png',
                        '/images/projects/AuditAi/register.png',
                        '/images/projects/AuditAi/login.png',
                    ]}
                    alt='AuditAI - Smart Auditing with AI'
                />
               
                <div className={styles.Projects__ProjectsList__Description}>
                    {cardsAuditAi.map((card, index) => (
                        <DescriptionProjectCard
                            key={index}
                            devSide={card.devSide}
                            techs={card.techs}
                            description={card.description}
                            linkGithub={card.linkGithub}
                            linkPreview={card.linkPreview}
                        />
                    ))}
                </div>

            </div>    
            <div className={styles.Projects__ProjectsList} >
                <div className={styles.Projects__ProjectTitle}> 
                    <BiSolidPurchaseTagAlt className={styles.Projects__ProjectTitle__Icon}/> 
                    <h1 className={styles.Projects__ProjectTitle__Text}>Damaris Salón - Inventario y ventas con integración de PayPal.</h1>
                </div>

                <ImageCarousel 
                    images={[
                        '/images/projects/prototipo2.jpg',
                    ]}
                    alt='Damaris Salón - Sistema de ventas e inventario'
                />

                <div className={styles.Projects__ProjectsList__Description}>
                    {cardsDamarisSalon.map((card, index) => (
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
            <div className={styles.Projects__ProjectsList} >
                <div className={styles.Projects__ProjectTitle}> 
                    <PiDetectiveFill className={styles.Projects__ProjectTitle__Icon}/> 
                    <h1 className={styles.Projects__ProjectTitle__Text}>FastSunat – Consulta RUC y DNI sin esfuerzo.</h1>
                </div>
                <div className={styles.Projects__ProjectsList__Description}>
                    <VideoApiRuc />
                    {cardsApiSunat.map((card, index) => (
                        <DescriptionProjectCard
                            key={index}
                            devSide={card.devSide}
                            techs={card.techs}
                            description={card.description}
                            linkGithub={card.linkGithub}/>
                    ))}
                </div>

            </div>

        </div>
    );
};