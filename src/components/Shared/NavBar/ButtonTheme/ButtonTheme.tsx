"use client";
import styles from './ButtonTheme.module.scss';
import { MdDarkMode, MdLightMode, MdComputer } from "react-icons/md";
import { useTheme } from '@/context/ThemeContext';

export const ButtonTheme = () => {
    const { theme, toggleTheme } = useTheme();

    /**
     * Obtiene el icono correspondiente según el tema actual
     */
    const getThemeIcon = () => {
        switch (theme) {
            case "light":
                return <MdLightMode className={styles.Button__Icon} />;
            case "dark":
                return <MdDarkMode className={styles.Button__Icon} />;
            case "system":
                return <MdComputer className={styles.Button__Icon} />;
            default:
                return <MdComputer className={styles.Button__Icon} />;
        }
    };

    /**
     * Obtiene la etiqueta de accesibilidad según el tema actual
     */
    const getAriaLabel = () => {
        switch (theme) {
            case "light":
                return "Cambiar a modo oscuro";
            case "dark":
                return "Cambiar a modo automático (sistema)";
            case "system":
                return "Cambiar a modo claro";
            default:
                return "Cambiar tema";
        }
    };

    return (
        <button 
            onClick={toggleTheme} 
            className={styles.Button} 
            aria-label={getAriaLabel()}
            title={getAriaLabel()}
        >
            {getThemeIcon()}
        </button>
    );
};
