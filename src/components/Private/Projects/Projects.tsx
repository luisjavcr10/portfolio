import styles from "./Projects.module.scss";
import { SectionTitle } from "@/components/Shared/SectionTitle";
import { DescriptionProjectCard } from "@/components/Shared/projectsCard/DescriptionProjectCard";
import Carousel from "@/components/ReactBits/Carousel/Carousel";
import {
  digenioImages,
  damarisSalonImages,
  smarttalentImages,
  coplacontImages,
  auditaiImages,
} from "@/components/Private/Projects/images";

import { ReactIcon } from "@/components/Shared/Icons/Frontend/ReactJsIcon";
import { TailwindCSSIcon } from "@/components/Shared/Icons/Frontend/TailwindCSSIcon/TailwindCSSIcon";
import { NodeJsIcon } from "@/components/Shared/Icons/BackEnd/NodeJsIcon";
import { ExpressJsIcon } from "@/components/Shared/Icons/BackEnd/ExpressJsIcon";
import { NextjsIcon } from "@/components/Shared/Icons/Frontend/NextJsIcon";
import { SassIcon } from "@/components/Shared/Icons/Languages/SassIcon";

import { BiSolidPurchaseTagAlt } from "react-icons/bi";
import { PiDetectiveFill } from "react-icons/pi";
import { FaLaptopCode } from "react-icons/fa";

const cardsDamarisSalon = [
  {
    devSide: "FULLSTACK",
    techs: [
      { title: "React", icon: <ReactIcon /> },
      { title: "TailwindCSS", icon: <TailwindCSSIcon /> },
      { title: "Node.js", icon: <NodeJsIcon /> },
      { title: "Express.js", icon: <ExpressJsIcon /> },
    ],
    description:
      "Sistema que ofrece una navegación ágil y responsiva, con un dashboard interactivo, gestión de ventas e inventario, e integración segura de pagos con PayPal.",
    linkGithub: "https://github.com/luisjavcr10/frontEnd_peluqueria",
  },
];

const cardsApiSunat = [
  {
    devSide: "BACKEND",
    techs: [
      { title: "Node.js", icon: <NodeJsIcon /> },
      { title: "Express.js", icon: <ExpressJsIcon /> },
    ],
    description:
      "API REST para automatizar la obtención de datos de clientes (DNI/RUC) en un sistema de ventas. Extrae información de SUNAT con Puppeteer, agilizando el proceso y evitando el ingreso manual.",
    linkGithub: "https://github.com/luisjavcr10/api-consulta-sunat",
  },
];

const cardsAuditAi = [
  {
    devSide: "FRONTEND",
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
  return (
    <div className={styles.Projects}>
      <SectionTitle title="Proyectos">
        <FaLaptopCode className={styles.sectionIcon} />
      </SectionTitle>

      {/** Coplacont */}
      <div className={styles.projectList}>
        <div className={styles.projectTitleContainer}>
          <PiDetectiveFill className={styles.projectIcon} />
          <h1 className={styles.projectTitleText}>
            Coplacont – Sistema contable experto
          </h1>
        </div>
        <div className={styles.projectDescription}>
          <Carousel
            items={coplacontImages}
            baseWidth={500}
            autoplay={true}
            autoplayDelay={3000}
            pauseOnHover={true}
            loop={true}
            round={false}
          />
          <div className={styles.projectDescription}>
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

      {/** Smarttalent */}
      <div className={styles.projectList}>
        <div className={styles.projectTitleContainer}>
          <PiDetectiveFill className={styles.projectIcon} />
          <h1 className={styles.projectTitleText}>
            Smarttalent – Sistema de solicitudes y reclutamientos
          </h1>
        </div>
        <div className={styles.projectDescription}>
          <Carousel
            items={smarttalentImages}
            baseWidth={500}
            autoplay={true}
            autoplayDelay={3000}
            pauseOnHover={true}
            loop={true}
            round={false}
          />
          <div className={styles.projectDescription}>
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
      {/** Digenio */}
      <div className={styles.projectList}>
        <div className={styles.projectTitleContainer}>
          <BiSolidPurchaseTagAlt className={styles.projectIcon} />
          <h1 className={styles.projectTitleText}>
            Digenio - CRM para gestión de proyectos
          </h1>
        </div>

        <div className={styles.projectCardContainer}>
          <Carousel
            items={digenioImages}
            baseWidth={500}
            autoplay={true}
            autoplayDelay={3000}
            pauseOnHover={true}
            loop={true}
            round={false}
          />

          <div className={styles.projectDescription}>
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
      </div>
      {/** Damaris Salon */}
      <div className={styles.projectList}>
        <div className={styles.projectTitleContainer}>
          <BiSolidPurchaseTagAlt className={styles.projectIcon} />
          <h1 className={styles.projectTitleText}>
            Damaris Salón - Inventario y ventas con integración de PayPal
          </h1>
        </div>
        <div className={styles.projectCardContainer}>
          <Carousel
            items={damarisSalonImages}
            baseWidth={500}
            autoplay={true}
            autoplayDelay={3000}
            pauseOnHover={true}
            loop={true}
            round={false}
          />
          <div className={styles.projectDescription}>
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
      </div>
      {/** AuditAi */}
      <div className={styles.projectList}>
        <div className={styles.projectTitleContainer}>
          <PiDetectiveFill className={styles.projectIcon} />
          <h1 className={styles.projectTitleText}>
            AuditAi – Auditoría inteligente con IA
          </h1>
        </div>
        <div className={styles.projectDescription}>
          <Carousel
            items={auditaiImages}
            baseWidth={500}
            autoplay={true}
            autoplayDelay={3000}
            pauseOnHover={true}
            loop={true}
            round={false}
          />
          <div className={styles.projectDescription}>
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
    </div>
  );
};
