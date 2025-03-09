"use client";
import styles from './ButtonTheme.module.scss';
import { CiLight, CiDark } from "react-icons/ci";
import { useTheme } from '@/context/ThemeContext';

export const ButtonTheme = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button 
            onClick={toggleTheme} 
            className={styles.Button} 
            aria-label={`Change to ${theme === "light" ? "dark" : "light"} mode`}
        >
            {theme === "light" ? <CiLight className={styles.Button__Icon}/> : <CiDark className={styles.Button__Icon}/> }
        </button>
    );
};
