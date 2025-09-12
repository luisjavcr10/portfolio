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
              <strong>Soy un desarrollador web full stack de Perú,</strong> con
              interés en construir experiencias digitales que combinan
              funcionalidad, diseño y eficiencia. Me enfoco en crear soluciones
              que no solo se vean bien, sino que también estén bien
              estructuradas a nivel técnico.{" "}
              <strong>
                Actualmente, busco mi primera experiencia laboral para aplicar
                mis habilidades en un entorno profesional.
              </strong>
            </p>
            <p>
              A lo largo de mi formación y práctica personal,{" "}
              <strong>
                he aprendido a comunicarme de forma clara, trabajar en equipo y
                adaptarme fácilmente a nuevos entornos.
              </strong>{" "}
              Me gusta organizar mi trabajo, buscar siempre mejorar, y mantener
              una mentalidad abierta al aprendizaje continuo.
            </p>
            <p>
              Fuera del mundo del código, me gusta mantenerme activo.{" "}
              <strong>
                Disfruto entrenar en el gimnasio, jugar fútbol y en general,
                mantener un equilibrio entre la vida profesional y personal.
              </strong>
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
