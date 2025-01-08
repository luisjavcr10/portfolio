"use client"
import { useEffect, useRef } from "react";
import styles from './NameIterator.module.scss';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
/**
 * Componente que muestra un texto con efecto de escritura letra por letra
 * y luego itera entre diferentes roles de desarrollo
 */
export const NameIterator = () => {
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    /**
     * Divide el texto en letras individuales y las envuelve en spans
     * @param text - El texto a dividir
     * @returns Array de elementos span con cada letra
     */
    const splitTextIntoLetters = (text: string) => {
        return text.split('').map((letter, index) => (
            <span 
                key={index} 
                className={styles.letter}
                style={{ display: 'inline-block' }}
            >
                {letter === ' ' ? '\u00A0' : letter}
            </span>
        ));
    };



    // Animación inicial con GSAP
    useGSAP(() => {
        if (textRef.current ) {
            // Limpiar timeline existente
            timelineRef.current?.clear().kill();
            timelineRef.current = gsap.timeline();

            const letters = textRef.current.querySelectorAll(`.${styles.letter}`);
            
            if (letters.length > 0) {
                // Configurar estado inicial de las letras
                gsap.set(letters, {
                    opacity: 0,
                    y: 20,
                    filter: "blur(5px)"
                });

                // Animar las letras una por una
                timelineRef.current.to(letters, {
                    duration: 1,
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    stagger: 0.1, // Retraso entre cada letra
                    ease: "power2.out",
                    
                });
            }
        }

        // Limpieza
        return () => {
            timelineRef.current?.kill();
        };
    }, { scope: containerRef });

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);
    
    return (
        <div ref={containerRef} className={styles.NameIterator}>
            <h2 ref={textRef}>
                {splitTextIntoLetters("Desarrollador de software")}
            </h2>
        </div>
    );
};