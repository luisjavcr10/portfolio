"use client"
import { useState, useEffect } from "react";
import styles from './ButtonTheme.module.scss';
import { CiLight, CiDark } from "react-icons/ci";

export const ButtonTheme = () => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        console.log(savedTheme);
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return(
        <button onClick={toggleTheme} className={styles.Button}>
            {theme === "light" ? <CiLight className={styles.Button__Icon}/> : <CiDark className={styles.Button__Icon}/> }
        </button>
    );
};