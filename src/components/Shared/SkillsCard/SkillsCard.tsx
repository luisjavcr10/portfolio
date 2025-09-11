"use client"
import styles from './SkillsCard.module.scss';
import { SkillIcon } from '../SkillIcon';
import './MagicEffect.css';
import { useRef, useEffect } from 'react';

interface iconsInterface {
    svg: React.ReactElement;
    name: string;
}

export const SkillsCard = ({title,icons, numGrid}: Readonly<{title:string;icons:iconsInterface[]; numGrid:number}>) => {
    const cardRef = useRef<HTMLDivElement>(null);
    
    // Efecto para el seguimiento del cursor en la tarjeta
    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Actualizar las variables CSS para el efecto de brillo
            card.style.setProperty('--glow-x', `${x}px`);
            card.style.setProperty('--glow-y', `${y}px`);
            card.style.setProperty('--glow-intensity', '1');
            
            // Efecto de inclinación suave
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calcular rotación con valores normalizados y limitados
            const rotateX = Math.max(-5, Math.min(5, (y - centerY) / 15));
            const rotateY = Math.max(-5, Math.min(5, (centerX - x) / 15));
            
            card.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        };

        const handleMouseLeave = () => {
            card.style.setProperty('--glow-intensity', '0');
            card.style.transform = 'perspective(500px) rotateX(0) rotateY(0)';
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return(
        <div 
            ref={cardRef} 
            className={`${styles.SkillsCard} ${styles[`SkillsCard--${numGrid}`]} magic-card`}
        >
            <h1 className={styles.SkillsCard__Title}>{title}</h1>
            <div className={`${styles.SkillsCard__Icons} ${styles[`SkillsCard__Icons--${numGrid}`]}`}>
                {icons.map((i)=>(
                    <SkillIcon key={i.name} icon={i.svg} name={i.name}/>
                ))}
            </div>
        </div>
    )
};