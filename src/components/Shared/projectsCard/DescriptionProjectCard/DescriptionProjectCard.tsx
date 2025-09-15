import styles from "./DescriptionProjectCard.module.scss";

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
  description: React.ReactNode;
  linkGithub?: string;
  linkPreview?: string;
}>) => {
  return (
    <div className={styles.descriptionProjectCard}>
      <div className={styles.titleContainer}>
        <h1 className={styles.titleText}>{title}</h1>

        <div className={styles.repositoriesContainer}>
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

        {description}

      <div className={styles.techContainer}>
        {techs.map((tech, index) => (
          <TechTag key={index} title={tech.title} icon={tech.icon} />
        ))}
      </div>
    </div>
  );
};
