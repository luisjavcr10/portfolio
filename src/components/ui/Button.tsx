import type { ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary";
type Size = "md" | "sm" | "lg";

/** Class names of the button look, for elements that are not links (e.g. ContactTrigger). */
export function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string): string {
  return [styles.button, styles[variant], styles[size], className].filter(Boolean).join(" ");
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
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
      className={buttonClass(variant, size, className)}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      {...(download && { download: true })}
    >
      {children}
    </a>
  );
}
