import { Fraunces } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});
