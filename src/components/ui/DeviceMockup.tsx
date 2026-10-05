import Image from "next/image";
import styles from "./DeviceMockup.module.css";

type DeviceMockupProps = {
  label: string;
  laptopSrc?: string;
  phoneSrc?: string;
};

function Screen({ src, alt, placeholder }: { src?: string; alt: string; placeholder: string }) {
  if (src) {
    return <Image src={src} alt={alt} fill sizes="(max-width: 1000px) 60vw, 700px" className={styles.image} />;
  }
  return <span className={styles.placeholderLabel}>{placeholder}</span>;
}

/**
 * Laptop with a phone overlapping its bottom-right corner.
 * Below 1000px only the phone is shown, centered and larger.
 */
export function DeviceMockup({ label, laptopSrc, phoneSrc }: DeviceMockupProps) {
  return (
    <div className={styles.stage}>
      <div className={styles.pattern} aria-hidden />
      <div className={styles.devices}>
        <div className={styles.laptop}>
          <div className={styles.lid}>
            <div className={styles.screen}>
              <Screen src={laptopSrc} alt={`${label} dashboard`} placeholder={`${label} · dashboard`} />
            </div>
          </div>
          <div className={styles.base} />
        </div>
        <div className={styles.phone}>
          <div className={styles.phoneScreen}>
            <span className={styles.notch} aria-hidden />
            <Screen src={phoneSrc} alt={`${label} app`} placeholder="app" />
          </div>
        </div>
      </div>
    </div>
  );
}
