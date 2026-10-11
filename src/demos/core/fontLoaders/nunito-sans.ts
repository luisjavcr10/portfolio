import localFont from "next/font/local";

// Self-hosted (latin, variable weight) for the same reason as Nunito.
export const nunitoSans = localFont({
  src: "./files/nunito-sans-latin-var.woff2",
  weight: "200 1000",
  variable: "--font-nunito-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
