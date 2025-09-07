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

/**
 * Función para leer cookies en el cliente
 */
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

/**
 * Función para establecer cookies
 */
function setCookie(name: string, value: string, days: number = 365) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [actualTheme, setActualTheme] = useState<ActualTheme>("dark");

  // Función para obtener el tema del sistema
  const getSystemTheme = (): ActualTheme => {
    if (typeof window === 'undefined') return 'dark';
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  // Función para aplicar el tema actual
  const applyTheme = (currentTheme: Theme) => {
    let themeToApply: ActualTheme;
    
    if (currentTheme === "system") {
      themeToApply = getSystemTheme();
    } else {
      themeToApply = currentTheme;
    }
    
    setActualTheme(themeToApply);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute("data-theme", themeToApply);
    }
  };

  useEffect(() => {
    // Leer la preferencia desde cookies
    const savedTheme = getCookie('theme') as Theme | null;
    const initialTheme = savedTheme || "dark";
    
    setTheme(initialTheme);
    applyTheme(initialTheme);

    // Escuchar cambios en la preferencia del sistema
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleSystemThemeChange = () => {
        if (theme === "system") {
          applyTheme("system");
        }
      };

      mediaQuery.addEventListener("change", handleSystemThemeChange);
      return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
    }
  }, []);

  useEffect(() => {
    // Guardar en cookies cuando cambie el tema
    setCookie('theme', theme);
    applyTheme(theme);
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
