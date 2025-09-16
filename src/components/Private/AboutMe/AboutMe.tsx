import styles from "./AboutMe.module.scss";
import Image from "next/image";

import { SectionTitle } from "@/components/Shared/SectionTitle";
import { SpecialButton } from "@/components/Shared/SpecialButton";
import PixelTransition from "@/components/ReactBits/PixelTransition/PixelTransition";
import { FaUserAstronaut } from "react-icons/fa6";

export const AboutMe = () => {
  return (
    <div className={styles.AboutMe}>
      <SectionTitle title="Sobre mí">
        <FaUserAstronaut className={styles.AboutMe__Icon} />
      </SectionTitle>
      <div className={styles.AboutMe__Container}>
        <div className={styles.AboutMe__Container__ProfileContainer}>
          <PixelTransition
            firstContent={
              <Image
                src="/images/profile/profile.jpg"
                alt="with nena in a beach"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                fill
              />
            }
            secondContent={
              <Image
                src="/images/profile/gildhi.jpg"
                alt="with nena gildhi"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                fill
              />
            }
            gridSize={24}
            pixelColor="#E5E5CB"
            animationStepDuration={0.4}
            className="custom-pixel-card"
          />
        </div>
        <div className={styles.AboutMe__Container__Info}>
          <div>
            <p>
              ¡Hola otra vez! Mi nombre es Luis Javier y te agradezco por llegar
              hasta este punto.{" "}
              <strong>Soy desarrollador de software en Trujillo, Perú</strong>,
              y me gustaría contarte un poco más sobre mí.{" "}
              <strong>
                Actualmente, estoy en búsqueda de nuevos retos profesionales
              </strong>{" "}
              que me permitan crecer y aportar valor con mis habilidades.
            </p>

            <p>
              A lo largo de mi formación y práctica profesional,{" "}
              <strong>
                he desarrollado la capacidad de comunicarme con claridad,
                trabajar en equipo y adaptarme con facilidad a nuevos entornos
              </strong>
              . Me gusta organizar mi trabajo, buscar siempre la mejora continua
              y mantener una mentalidad abierta al aprendizaje.
            </p>

            <p>
              Fuera del mundo del código, me gusta mantenerme activo.{" "}
              <strong>
                Disfruto entrenar en el gimnasio, jugar fútbol y mantener un
                equilibrio entre mi vida profesional y personal
              </strong>
              .
            </p>
          </div>

          <div className={styles.AboutMe__Container__DivButton}>
            <SpecialButton
              href="/docs/Full Stack Developer - Castillo R. Luis J..pdf"
              message="⬇️ Descarga mi CV"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
