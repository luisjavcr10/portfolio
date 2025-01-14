import { Navbar } from "@/components/Shared/NavBar";
import { Footer } from "@/components/Shared/Footer";
//import { ParticlesBackground } from "@/components/Shared/ParticlesBackground";
//import Particles from "@/components/ReactBits/Particles/Particles";
//import LiquidEther from "@/components/ReactBits/LiquidEther/LiquidEther";

import { ThemeProvider } from "@/context/ThemeContext";
import { Onest } from "next/font/google";
import styles from "./layout.module.scss";
import "@/sass/main.scss";
import GalaxyWrapper from "@/components/GalaxyWrapper";

const onest = Onest({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: "normal",
  subsets: ["latin"],
});

export const metadata = {
  title: "Portafolio | Luis Castillo - Desarrollador Web Full Stack",
  description:
    "Portafolio de Luis Castillo, desarrollador web full stack. Descubre mis proyectos y habilidades en desarrollo web.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${onest.className} ${styles.layout}`}>
        <ThemeProvider>
          <GalaxyWrapper />

          {/** <ParticlesBackground /> */}
          {/*<LiquidEther
            colors={['#5227FF', '#FF9FFC', '#B19EEF']}
            mouseForce={20}
            cursorSize={120}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.3}
            autoIntensity={1.8}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />*/}
          {/** <Particles
            particleColors={["#697565", "#697565", "#697565"]} // Colores que contrastan con ambos temas
            particleCount={2000}
            particleSpread={15}
            speed={0.05}
            particleBaseSize={80}
            moveParticlesOnHover={true}
            alphaParticles={true} // Activar transparencia para mejor integración
            disableRotation={false}
            sizeRandomness={0.5}
          />} */}
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
