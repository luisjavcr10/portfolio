import type { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  external?: boolean;
  download?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
  download = false,
  className,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={[styles.button, styles[variant], styles[size], className].filter(Boolean).join(" ")}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      {...(download && { download: true })}
    >
      {children}
    </a>
  );
}
