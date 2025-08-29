"use client";
import styles from "./Title.module.scss";
import TiltedCard from "@/components/ReactBits/TiltedCard/TiltedCard";
import { useEffect, useState } from "react";

export const Title = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Función para verificar si es un dispositivo móvil
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Verificar al cargar
    checkIfMobile();
    
    // Agregar listener para cambios de tamaño
    window.addEventListener("resize", checkIfMobile);
    
    // Limpiar listener
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Tamaños condicionales basados en si es móvil o no
  const cardSize = isMobile ? "200px" : "280px";

  return (
    <div className={styles.Home}>
      <TiltedCard
        imageSrc="/images/profile/inhco.jpeg"
        altText="Perfil Luis Castillo"
        captionText="Soy Luis Castillo, desarrollador de software."
        containerHeight={cardSize}
        containerWidth={cardSize}
        imageHeight={cardSize}
        imageWidth={cardSize}
        rotateAmplitude={12}
        scaleOnHover={1.2}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={true}
      />
    </div>
  );
};
