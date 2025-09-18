"use client";
import styles from "./Title.module.scss";
import TiltedCard from "@/components/ReactBits/TiltedCard/TiltedCard";
import { useEffect, useState } from "react";
import { SpecialButton } from "@/components/Shared/SpecialButton";

export const Title = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

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
      <div className={styles.cvButton}>
        <SpecialButton
          href="/docs/Full Stack Developer - Castillo R. Luis J..pdf"
          message="⬇️ Descarga mi CV"
        />
      </div>
    </div>
  );
};
