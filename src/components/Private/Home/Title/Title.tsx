import styles from "./Title.module.scss";
import Image from "next/image";

import { SpecialButton } from "@/components/Shared/SpecialButton";

export const Title = () => {
  return (
    <div className={styles.Home}>
      <div className={styles.Home__Profile}>
        <Image
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
        />
      </div>
    </div>
  );
};
