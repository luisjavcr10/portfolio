"use client";
import styles from "./Title.module.scss";
import TiltedCard from "@/components/ReactBits/TiltedCard/TiltedCard";


export const Title = () => {
  return (
    <div className={styles.Home}>
      <TiltedCard
        imageSrc="/images/profile/inhco.jpeg"
        altText="Perfil Luis Castillo"
        captionText="Soy Luis Castillo, desarrollador de software."
        containerHeight="300px"
        containerWidth="300px"
        imageHeight="280px"
        imageWidth="280px"
        rotateAmplitude={12}
        scaleOnHover={1.2}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={true}

      />
    </div>
  );
};
