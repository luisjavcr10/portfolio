"use client";
import { useEffect, useState } from "react";
import styles from "./Projects.module.scss";
import Carousel from "@/components/ReactBits/Carousel/Carousel";
import { SectionTitle } from "@/components/Shared/SectionTitle";
import { DescriptionProjectCard } from "@/components/Shared/projectsCard/DescriptionProjectCard";
import {
  digenioImages,
  damarisSalonImages,
  smarttalentImages,
  coplacontImages,
  auditaiImages,
} from "@/components/Private/Projects/images";
import { 
  NodeJsIcon, 
  ExpressJsIcon, 
  NestJsIcon, 
  GraphQLIcon,
  ReactIcon,
  TailwindCSSIcon,
  NextjsIcon,
  SassIcon, 
  PostgreSQLIcon,
  MongoDBIcon
} from "@/components/Shared/Icons";
import { FaLaptopCode } from "react-icons/fa";

const cardsCoplacont = [
  {
    devSide: "FULLSTACK",
    title: "Coplacont - Sistema contable experto",
    techs: [
      { title: "React", icon: <ReactIcon /> },
      { title: "Sass", icon: <SassIcon /> },
      { title: "NestJs", icon: <NestJsIcon /> },
      { title: "PSQL", icon:<PostgreSQLIcon/> }
    ],
    description:
      "Sistema que ofrece una navegación ágil y responsiva, con un dashboard interactivo, gestión de ventas e inventario, e integración segura de pagos con PayPal.",
  },
];

const cardsSmartTalent = [
  {
    devSide: "BACKEND",
    title: "Sistema de Gestión de Solicitudes y Reclutamiento para SmartTalent",
    techs: [
      { title: "React", icon: <ReactIcon /> },
      {title:"TailwindCSS", icon: <TailwindCSSIcon />},
      { title: "Express.js", icon: <ExpressJsIcon inTag={true} /> },
      { title: "PSQL", icon:<PostgreSQLIcon/> }
    ],
    description:
      "API REST para automatizar la obtención de datos de clientes (DNI/RUC) en un sistema de ventas. Extrae información de SUNAT con Puppeteer, agilizando el proceso y evitando el ingreso manual.",
  },
];

const cardsDigenio = [
  {
    devSide: "FULLSTACK",
    title: "Sistema de gestión de OKRs y Startups para Digenio",
    techs: [
      { title: "Next.js", icon: <NextjsIcon /> },
      { title: "TailwindCSS", icon: <TailwindCSSIcon /> },
      { title: "GraphQL", icon: <GraphQLIcon/> },
      { title: "MongoDB", icon: <MongoDBIcon /> }
    ],
    description:
      "Sistema que ofrece una navegación ágil y responsiva, con un dashboard interactivo, gestión de ventas e inventario, e integración segura de pagos con PayPal.",
    linkGithub: "https://github.com/luisjavcr10/app-crm-digenio.git",
  },
];

const cardsDamarisSalon = [
  {
    devSide: "FULLSTACK",
    title: "Sistema de gestión de ventas e inventario para Damaris Salón",
    techs: [
      { title: "React", icon: <ReactIcon /> },
      { title: "TailwindCSS", icon: <TailwindCSSIcon /> },
      { title: "Node.js", icon: <NodeJsIcon /> },
      { title: "Express.js", icon: <ExpressJsIcon inTag={true}/> },
    ],
    description:
      "Sistema que ofrece una navegación ágil y responsiva, con un dashboard interactivo, gestión de ventas e inventario, e integración segura de pagos con PayPal.",
    linkGithub: "https://github.com/luisjavcr10/frontEnd_peluqueria",
  },
];

const cardsAuditAi = [
  {
    devSide: "FRONTEND",
    title: "Audit AI - Sistema de auditoria automatizada con IA",
    techs: [
      { title: "Next.js", icon: <NextjsIcon /> },
      { title: "Sass", icon: <SassIcon /> },
    ],
    description:
      "Sistema web que automatiza análisis de auditorías mediante IA (DeepSeek). Procesa datos, evalúa con normativas (SOX, GDPR, etc.) y genera dashboards interactivos con hallazgos clave. Como desarrollador frontend, lideré la creación de la interfaz de esta plataforma de auditoría inteligente",
    linkGithub: "https://github.com/luisjavcr10/front-audit-ai",
    linkPreview: "https://front-audit-ai.vercel.app/",
  },
];

export const Projects = () => {
   const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const baseWidth = isMobile? 300 : 480;


  return (
    <div className={styles.Projects}>
      <SectionTitle title="Proyectos">
        <FaLaptopCode className={styles.sectionIcon} />
      </SectionTitle>

      {/** Coplacont */}
      <div className={styles.projectList}>
        <div className={styles.projectCardContainer}>
          <Carousel
            items={coplacontImages}
            baseWidth={baseWidth}
            autoplay={true}
            autoplayDelay={6000}
            pauseOnHover={true}
            loop={true}
            round={false}
          />
          {cardsCoplacont.map((card, index) => (
            <DescriptionProjectCard
              title={card.title}
              key={index}
              devSide={card.devSide}
              techs={card.techs}
              description={card.description}
            />
          ))}
        </div>
      </div>

      {/** Smarttalent */}
      <div className={styles.projectList}>
        <div className={styles.projectCardContainer}>
          <Carousel
            items={smarttalentImages}
            baseWidth={baseWidth}
            autoplay={true}
            autoplayDelay={6000}
            pauseOnHover={true}
            loop={true}
            round={false}
          />
          {cardsSmartTalent.map((card, index) => (
            <DescriptionProjectCard
              title={card.title}
              key={index}
              devSide={card.devSide}
              techs={card.techs}
              description={card.description}
            />
          ))}
        </div>
      </div>
      {/** Digenio */}
      <div className={styles.projectList}>
        <div className={styles.projectCardContainer}>
          <Carousel
            items={digenioImages}
            baseWidth={baseWidth}
            autoplay={true}
            autoplayDelay={6000}
            pauseOnHover={true}
            loop={true}
            round={false}
          />
          {cardsDigenio.map((card, index) => (
            <DescriptionProjectCard
              title={card.title}
              key={index}
              devSide={card.devSide}
              techs={card.techs}
              description={card.description}
              linkGithub={card.linkGithub}
            />
          ))}
        </div>
      </div>
      {/** Damaris Salon */}
      <div className={styles.projectList}>
        <div className={styles.projectCardContainer}>
          <Carousel
            items={damarisSalonImages}
            baseWidth={baseWidth}
            autoplay={true}
            autoplayDelay={6000}
            pauseOnHover={true}
            loop={true}
            round={false}
          />
          {cardsDamarisSalon.map((card, index) => (
            <DescriptionProjectCard
              title={card.title}
              key={index}
              devSide={card.devSide}
              techs={card.techs}
              description={card.description}
              linkGithub={card.linkGithub}
            />
          ))}
        </div>
      </div>
      {/** AuditAi */}
      <div className={styles.projectList}>
        <div className={styles.projectCardContainer}>
          <Carousel
            items={auditaiImages}
            baseWidth={baseWidth}
            autoplay={true}
            autoplayDelay={6000}
            pauseOnHover={true}
            loop={true}
            round={false}
          />
          {cardsAuditAi.map((card, index) => (
            <DescriptionProjectCard
              title={card.title}
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
