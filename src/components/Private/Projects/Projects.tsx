import styles from './Projects.module.scss';
import Image from 'next/image';

import { SectionTitle } from '@/components/Shared/SectionTitle';
import { DescriptionProjectCard } from '@/components/Shared/projectsCard/DescriptionProjectCard';
import { VideoApiRuc } from './VideoApiRuc';

import { ReactIcon } from '@/utils/Icons/Frontend/ReactJsIcon';
import { TailwindCSSIcon } from '@/utils/Icons/Frontend/TailwindCSSIcon/TailwindCSSIcon';
import { NodeJsIcon } from '@/utils/Icons/BackEnd/NodeJsIcon';
import { ExpressJsIcon } from '@/utils/Icons/BackEnd/ExpressJsIcon';

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
        description:'Diseñado para brindar una navegación fluida y optimizada, este sistema ofrece una experiencia moderna, ágil y responsiva. Incorpora un dashboard interactivo con gráficos en tiempo real, un módulo de gestión de ventas e inventario, y una integración segura de pagos con PayPal, permitiendo a los usuarios realizar transacciones sin complicaciones.',
        linkGithub:'https://github.com/luisjavcr10/frontEnd_peluqueria'
    },
    {
        devSide:'BACKEND',
        techs:[
            {title:'Node.js', icon:<NodeJsIcon/>},
            {title:'Express.js', icon:<ExpressJsIcon/>}
        ],
        description: 'Construido para garantizar un rendimiento óptimo, este backend proporciona una API escalable y segura, permitiendo una gestión eficiente de la información. Implementa autenticación y autorización con JWT, asegurando un acceso protegido a los datos. Además, cuenta con integraciones que facilitan pagos en línea con PayPal y conversiones monetarias en tiempo real.',
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
        description:'Este proyecto fue desarrollado para automatizar la obtención de datos de clientes a través de su DNI o RUC dentro de un sistema de ventas. Utilizando Puppeteer, se extrajo automáticamente la información desde el portal oficial de SUNAT, agilizando el proceso y eliminando la necesidad de ingreso manual.',
        linkGithub:'https://github.com/luisjavcr10/api-consulta-sunat'
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
                    <h1>Damaris Salón - Control de inventario y ventas con integración de PayPal.</h1>
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
                    <h1>FastSunat – Consulta RUC y DNI sin esfuerzo.</h1>
                </div>
                <div className={styles.Projects__ProjectsList__Description}>
                    <VideoApiRuc />
                    {cardsApiSunat.map((card, index) => (
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