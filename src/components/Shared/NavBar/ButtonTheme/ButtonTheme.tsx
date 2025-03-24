"use client";
import styles from './ButtonTheme.module.scss';
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from '@/context/ThemeContext';

export const ButtonTheme = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button 
            onClick={toggleTheme} 
            className={styles.Button} 
            aria-label={`Change to ${theme === "light" ? "dark" : "light"} mode`}
        >
            {theme === "light" ? <MdDarkMode className={styles.Button__Icon}/> : <MdLightMode className={styles.Button__Icon}/> }
        </button>
    );
};
