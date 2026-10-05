import type { ReactNode } from "react";
import styles from "./Chip.module.css";

type ChipProps = {
  children: ReactNode;
  /** "outline" for inline tags, "filled" for the stack grid. */
  variant?: "outline" | "filled";
  size?: "sm" | "md";
};

export function Chip({ children, variant = "outline", size = "md" }: ChipProps) {
  return <span className={`${styles.chip} ${styles[variant]} ${styles[size]}`}>{children}</span>;
}

export function ChipList({ items, ...chipProps }: { items: string[] } & Omit<ChipProps, "children">) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <Chip key={item} {...chipProps}>
          {item}
        </Chip>
      ))}
    </div>
  );
}
