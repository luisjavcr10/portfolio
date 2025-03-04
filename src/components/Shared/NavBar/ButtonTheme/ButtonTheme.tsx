"use client";
import { useState, useEffect } from "react";
import styles from './ButtonTheme.module.scss';
import { CiLight, CiDark } from "react-icons/ci";

export const ButtonTheme = () => {
    const [theme, setTheme] = useState("dark"); // Estado inicial sin depender de `window`

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        const initialTheme = savedTheme || systemTheme;
        
        setTheme(initialTheme); // Ahora sí, actualizamos el estado con el tema correcto
        document.documentElement.setAttribute("data-theme", initialTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <button onClick={toggleTheme} className={styles.Button}>
            {theme === "light" ? <CiLight className={styles.Button__Icon}/> : <CiDark className={styles.Button__Icon}/> }
        </button>
    );
};
