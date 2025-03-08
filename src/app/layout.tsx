import { Navbar } from "@/components/Shared/NavBar";
import { Footer } from "@/components/Shared/Footer";
import { Onest } from "next/font/google";
import styles from "./layout.module.scss";
import "@/sass/main.scss";
import "@/styles/tailwind/tailwind.css";
import { ThemeProvider } from "@/context/ThemeContext";

const onest = Onest({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: "normal",
  subsets: ["latin"],
});

export const metadata = {
  title: "Portafolio | Luis Castillo - Desarrollador Web Full Stack",
  description: "Portafolio de Luis Castillo, desarrollador web full stack. Descubre mis proyectos y habilidades en desarrollo web.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${onest.className} ${styles.layout}`}>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
