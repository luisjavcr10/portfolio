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
  MongoDBIcon,
} from "@/components/Shared/Icons";
import { FaLaptopCode } from "react-icons/fa";

const cardCoplacont = {
  devSide: "FULLSTACK",
  title: "Coplacont - Sistema contable experto",
  techs: [
    { title: "React", icon: <ReactIcon /> },
    { title: "Sass", icon: <SassIcon /> },
    { title: "NestJs", icon: <NestJsIcon /> },
    { title: "PSQL", icon: <PostgreSQLIcon /> },
  ],
  description:
      <p>
        <strong>Software diseñado para estudios contables:</strong> gestiona compras, ventas, planillas, activos fijos y genera automáticamente asientos, libros contables y reportes financieros. <strong>Participé como full stack,</strong> desde la definición de requerimientos hasta el desarrollo frontend y backend. El mayor desafío fue <strong>dominar la lógica contable y sus tecnicismos,</strong> logrando traducir procesos financieros complejos en una herramienta digital usable.
      </p>
};
const cardSmartTalent = {
  devSide: "BACKEND",
  title: "Sistema de Gestión de Solicitudes y Reclutamiento para SmartTalent",
  techs: [
    { title: "React", icon: <ReactIcon /> },
    { title: "TailwindCSS", icon: <TailwindCSSIcon /> },
    { title: "Express.js", icon: <ExpressJsIcon inTag={true} /> },
    { title: "PSQL", icon: <PostgreSQLIcon /> },
  ],
  description:
    <p><strong>Plataforma para digitalizar procesos de RRHH:</strong>  permite a clientes registrar solicitudes de verificación (laboral, académica, crediticia, etc.) y gestionar procesos de reclutamiento.<strong>Trabajé como desarrollador full stack en todas las etapas del proyecto.</strong>  El reto clave fue cumplir un deadline exigente: entregamos una versión funcional en menos tiempo del previsto y luego hicimos un ciclo de pruebas y mejoras con el cliente.

    </p>
};
const cardDigenio = {
  devSide: "FULLSTACK",
  title: "Sistema de gestión de OKRs y Startups para Digenio",
  techs: [
    { title: "Next.js", icon: <NextjsIcon /> },
    { title: "TailwindCSS", icon: <TailwindCSSIcon /> },
    { title: "GraphQL", icon: <GraphQLIcon /> },
    { title: "MongoDB", icon: <MongoDBIcon /> },
  ],
  description:
    <p> <strong>Sistema interno para gestionar OKRs, startups y equipos,</strong> con módulos de seguimiento de sprints, tareas y empleados. Como full stack, participé en el desarrollo de la solución junto a un compañero diseñador,<strong>desde el modelado de datos hasta la implementación de la interfaz.</strong> La experiencia se centró en estructurar objetivos medibles y escalables en una plataforma intuitiva.
    </p>,
  linkGithub: "https://github.com/luisjavcr10/app-crm-digenio.git",
};

const cardDamarisSalon = {
  devSide: "FULLSTACK",
  title: "Sistema de gestión de ventas e inventario para Damaris Salón",
  techs: [
    { title: "React", icon: <ReactIcon /> },
    { title: "TailwindCSS", icon: <TailwindCSSIcon /> },
    { title: "Node.js", icon: <NodeJsIcon /> },
    { title: "Express.js", icon: <ExpressJsIcon inTag={true} /> },
  ],
  description:
    <p> <strong>Mi primer proyecto freelance y en solitario:</strong> un sistema para administrar ventas e inventario en una peluquería. Me encargué de todo el ciclo de desarrollo, desde el análisis de necesidades del cliente hasta la implementación final. Supuso un reto especial al ser <strong>mi primera experiencia completa como responsable único del producto.</strong>

    </p>,
  linkGithub: "https://github.com/luisjavcr10/frontEnd_peluqueria",
};

const cardAuditAi = {
  devSide: "FRONTEND",
  title: "Audit AI - Sistema de auditoria automatizada con IA",
  techs: [
    { title: "Next.js", icon: <NextjsIcon /> },
    { title: "Sass", icon: <SassIcon /> },
  ],
  description:
    <p><strong>Sistema web que automatiza análisis de auditorías mediante IA (DeepSeek).</strong> Procesa datos, evalúa con normativas (SOX, GDPR, etc.) y genera dashboards interactivos con hallazgos clave. Como desarrollador frontend,<strong> lideré la creación de la interfaz de esta plataforma de auditoría inteligente.</strong>
    </p>,
  linkGithub: "https://github.com/luisjavcr10/front-audit-ai",
  linkPreview: "https://front-audit-ai.vercel.app/",
};

export const Projects = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const baseWidth = isMobile ? 320 : 480;

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
          <DescriptionProjectCard
            title={cardCoplacont.title}
            devSide={cardCoplacont.devSide}
            techs={cardCoplacont.techs}
            description={cardCoplacont.description}
          />
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
          <DescriptionProjectCard
            title={cardSmartTalent.title}
            devSide={cardSmartTalent.devSide}
            techs={cardSmartTalent.techs}
            description={cardSmartTalent.description}
          />
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
          <DescriptionProjectCard
            title={cardDigenio.title}
            devSide={cardDigenio.devSide}
            techs={cardDigenio.techs}
            description={cardDigenio.description}
            linkGithub={cardDigenio.linkGithub}
          />
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
          <DescriptionProjectCard
            title={cardDamarisSalon.title}
            devSide={cardDamarisSalon.devSide}
            techs={cardDamarisSalon.techs}
            description={cardDamarisSalon.description}
            linkGithub={cardDamarisSalon.linkGithub}
          />
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
          <DescriptionProjectCard
            title={cardAuditAi.title}
            devSide={cardAuditAi.devSide}
            techs={cardAuditAi.techs}
            description={cardAuditAi.description}
            linkGithub={cardAuditAi.linkGithub}
          />
        </div>
      </div>
    </div>
  );
};
