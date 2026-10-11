import Image from "next/image";
import type { CSSProperties } from "react";
import type { Photo as PhotoData } from "../types";
import styles from "./Photo.module.css";

type PhotoProps = {
  photo: PhotoData;
  /** CSS aspect-ratio, e.g. "4 / 5". */
  ratio?: string;
  radius?: string;
  sizes: string;
  /** Striped placeholder tint when there is no photo yet. */
  tone?: "muted" | "accent" | "base";
  /** Placement of the placeholder label. */
  labelAlign?: "start" | "center" | "end";
  priority?: boolean;
  className?: string;
};

/** Renders a tenant photo with next/image, or a labelled placeholder until one is provided. */
export function Photo({
  photo,
  ratio,
  radius,
  sizes,
  tone = "muted",
  labelAlign = "start",
  priority = false,
  className,
}: PhotoProps) {
  const style = { aspectRatio: ratio, borderRadius: radius } as CSSProperties;
  const imageStyle = photo.position ? { objectPosition: photo.position } : undefined;

  return (
    <div
      className={[styles.frame, styles[tone], styles[labelAlign], className].filter(Boolean).join(" ")}
      style={style}
    >
      {photo.src && photo.srcMobile ? (
        // Art direction: lazy loading means only the visible version is fetched.
        <>
          <Image
            src={photo.srcMobile}
            alt={photo.alt}
            fill
            sizes={sizes}
            fetchPriority={priority ? "high" : undefined}
            className={`${styles.image} ${styles.mobileOnly}`}
            style={imageStyle}
          />
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={sizes}
            fetchPriority={priority ? "high" : undefined}
            className={`${styles.image} ${styles.desktopOnly}`}
            style={imageStyle}
          />
        </>
      ) : photo.src ? (
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} preload={priority} className={styles.image} style={imageStyle} />
      ) : (
        <span className={styles.label} role="img" aria-label={photo.alt}>
          {photo.hint}
        </span>
      )}
    </div>
  );
}
