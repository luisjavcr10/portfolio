"use client"
import Image from "next/image";
import styles from './LeftImageProject.module.scss';
import { useState, useEffect } from 'react';

export const LeftImageProject = () => {
    const [imageWidth, setImageWidth] = useState(320);
    const [imageHeight, setImageHeight] = useState(180);

    useEffect(() => {
        const handleResize = () => {
            setImageWidth(window.innerWidth > 480 ? 640 : 320);
            setImageHeight(window.innerWidth > 480 ? 360 : 180);
        };
        handleResize(); 
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div className={styles.ImageProject__ImageContainer}>
            <Image
                src='/images/projects/prototipo2.jpg'
                width={imageWidth}
                height={imageHeight}
                alt='imageproject'
                className={styles.ImageProject__ImageContainer__Image}
            />
        </div>
    );
}