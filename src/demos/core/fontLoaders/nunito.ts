import localFont from "next/font/local";

// Self-hosted (latin, variable weight): next/font/google failed on Vercel for Nunito.
export const nunito = localFont({
  src: "./files/nunito-latin-var.woff2",
  weight: "200 1000",
  variable: "--font-nunito",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
