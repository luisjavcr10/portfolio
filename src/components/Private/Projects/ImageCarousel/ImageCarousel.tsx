"use client"
import { useState } from 'react';
import Image from 'next/image';
import styles from './ImageCarousel.module.scss';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ImageCarouselProps {
    images: string[];
    alt: string;
}

export const ImageCarousel = ({ images, alt }: ImageCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className={styles.carousel}>
                <Image
                    className={styles.carousel__image}
                    src={images[currentIndex]}
                    alt={`${alt} - Imagen ${currentIndex + 1}`}
                    fill
                />
                <button 
                    className={`${styles.carousel__button} ${styles.carousel__buttonLeft}`}
                    onClick={handlePrevious}
                    aria-label="Imagen anterior"
                >
                    <FaChevronLeft />
                </button>
                <button 
                    className={`${styles.carousel__button} ${styles.carousel__buttonRight}`}
                    onClick={handleNext}
                    aria-label="Imagen siguiente"
                >
                    <FaChevronRight />
                </button>
        </div>
    );
};