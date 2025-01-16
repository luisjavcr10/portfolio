"use client";
import styles from "./Title.module.scss";
import TiltedCard from "@/components/ReactBits/TiltedCard/TiltedCard";

//import { SpecialButton } from "@/components/Shared/SpecialButton";

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
      {/**<Image
          className={styles.Home__Profile__Image}
          src="/images/profile/mainprofile.jpeg"
          width={180}
          height={180}
          alt="profile"
          priority
        />
        <SpecialButton
          href="https://www.linkedin.com/in/luisjaviercastillorabanal/"
          message="Disponible para trabajar"
        />*/}
    </div>
  );
};
