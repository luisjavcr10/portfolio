"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark" | "system";
type ActualTheme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  actualTheme: ActualTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme | undefined>(undefined);
  const [actualTheme, setActualTheme] = useState<ActualTheme>("light");

  // Función para obtener el tema del sistema
  const getSystemTheme = (): ActualTheme => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  // Función para aplicar el tema actual
  const applyTheme = (currentTheme: Theme) => {
    let actualThemeToSet: ActualTheme;
    
    if (currentTheme === "system") {
      actualThemeToSet = getSystemTheme();
    } else {
      actualThemeToSet = currentTheme;
    }
    
    setActualTheme(actualThemeToSet);
    // Siempre establecer el tema seleccionado por el usuario, no el detectado
    document.documentElement.setAttribute("data-theme", currentTheme);
  };

  useEffect(() => {
    // Obtener la preferencia guardada del usuario o usar 'system' por defecto
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const initialTheme = savedTheme ?? "system"; // 'system' es el valor por defecto
    
    setTheme(initialTheme);
    applyTheme(initialTheme);

    // Escuchar cambios en la preferencia del sistema
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme);
      applyTheme(theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === "light") return "dark";
      if (prevTheme === "dark") return "system";
      return "light"; // system -> light
    });
  };

  if (theme === undefined) return null; // Evita errores en la carga inicial

  return (
    <ThemeContext.Provider value={{ theme, actualTheme, toggleTheme }}>
        {children}
    </ThemeContext.Provider>
    );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
