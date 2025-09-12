import styles from "./DescriptionProjectCard.module.scss";

import { SpecialTag } from "@/components/Shared/tags/SpecialTag";
import { TechTag } from "@/components/Shared/tags/TechTag";
import { CodeTag } from "@/components/Shared/tags/CodeTag";

import { FiGithub } from "react-icons/fi";
import { FaEye } from "react-icons/fa";

interface TechTagProps {
  title: string;
  icon: React.ReactElement;
}

export const DescriptionProjectCard = ({
  title,
  techs,
  description,
  linkGithub,
  linkPreview,
}: Readonly<{
  devSide: string;
  title: string;
  techs: TechTagProps[];
  description: string;
  linkGithub?: string;
  linkPreview?: string;
}>) => {
  return (
    <div className={styles.DescriptionProjectCard}>
      <div className={styles.DescriptionProjectCard__TagsSection}>
        <h1 style={{ margin: "0px", flex: 1 }}>{title}</h1>

        <div className={styles.DescriptionProjectCard__LinkSection}>
          {linkGithub && (
            <CodeTag message="CODIGO" href={linkGithub}>
              <FiGithub />
            </CodeTag>
          )}
          {linkPreview && (
            <CodeTag message="PREVIEW" href={linkPreview}>
              <FaEye />
            </CodeTag>
          )}
        </div>
      </div>

      <p className={styles.DescriptionProjectCard__Description}>
        {description}
      </p>

      <div className={styles.DescriptionProjectCard__Techs}>
        {techs.map((tech, index) => (
          <TechTag key={index} title={tech.title} icon={tech.icon} />
        ))}
      </div>
    </div>
  );
};
