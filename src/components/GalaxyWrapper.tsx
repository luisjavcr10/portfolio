"use client";

import Galaxy from "@/components/ReactBits/Galaxy/Galaxy";
import { useTheme } from "@/context/ThemeContext";

/**
 * Wrapper component for Galaxy that adapts background color based on theme
 */
export default function GalaxyWrapper() {
  const { actualTheme } = useTheme();
  
  // Define background colors for light and dark themes
  // Light theme: #D5CEA3 (213, 206, 163)
  // Dark theme: #212121 (33, 33, 33)
  const backgroundColor: [number, number, number] = actualTheme === 'dark' 
    ? [33/255, 33/255, 33/255]  // Dark theme background
    : [213/255, 206/255, 163/255]; // Light theme background
  
  return (
    <Galaxy 
      mouseRepulsion={false}
      mouseInteraction={false}
      density={1}
      glowIntensity={actualTheme==='dark'?0.3:0.1}
      saturation={0.0}  // Cambiar de 0.8 a 0.0 para eliminar colores
      hueShift={0}      // Cambiar de 80 a 0 para eliminar el desplazamiento de color
      transparent={false}  // Cambiar a true para evitar la mezcla con backgroundColor
      backgroundColor={backgroundColor}
    />
  );
}