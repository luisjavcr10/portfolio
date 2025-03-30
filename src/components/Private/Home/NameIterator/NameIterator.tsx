"use client"
import { useState, useEffect, useRef } from "react";
import styles from './NameIterator.module.scss';
import { motion, AnimatePresence } from "framer-motion";

const texts = [
    { text: "Full Stack", class: "fullstack" },
    { text: "Frontend", class: "frontend" },
    { text: "Backend", class: "backend" },
];

export const NameIterator = () => {
    const [index, setIndex] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setIsActive(true);

        intervalRef.current = setInterval(() => {
            setIsActive(false);
            setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + 1) % texts.length);
                setIsActive(true);
            }, 500);
        }, 3000);
        
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);
    
    return (
        <div className={styles.NameIterator}>
            <h2>Desarrollador</h2>
            <AnimatePresence mode="wait">
                <motion.h2 
                    key={index}
                    className={`${styles.dynamicText} ${styles[texts[index].class]} ${isActive ? styles.active : ''}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 30,
                        duration: 2 
                    }}
                >
                    {texts[index].text}
                </motion.h2>
            </AnimatePresence>
        </div>
    );
};