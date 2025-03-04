"use client"
import { useState, useEffect } from "react";
import styles from './NameIterator.module.scss';
import { motion } from "framer-motion";

const texts = [
    "Full Stack",
    "Frontend",
    "Backend",
];

export const NameIterator = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
          setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 2000);
        
        return () => clearInterval(interval);
    }, []);
    
    return (
        <div className={styles.NameIterator}>
            <h2>Desarrollador</h2>
            <motion.h2
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 1.5 }}
            >
                {texts[index]}
            </motion.h2>
        </div>
        
    );
};