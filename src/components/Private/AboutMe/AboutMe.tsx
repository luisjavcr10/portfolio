import styles from './AboutMe.module.scss';
import Image from 'next/image';

import { SectionTitle } from '@/components/Shared/SectionTitle';
import { SpecialButton } from '@/components/Shared/SpecialButton';

import { FaUserAstronaut } from "react-icons/fa6";


export const AboutMe = () =>{
    return(
        <div className={styles.AboutMe}>
            <SectionTitle title='Sobre mí'>
                <FaUserAstronaut className={styles.AboutMe__Icon}/>
            </SectionTitle>
            <div className={styles.AboutMe__Container}>
                <div className={styles.AboutMe__Container__ProfileContainer}>
                    <Image
                        src='/images/profile/profile.jpg'
                        width={250}
                        height={250}
                        alt='Profile about me'
                        loading={undefined}
                        className={styles.AboutMe__Container__ProfileContainer__Image}
                    />
                </div>
                <div className={styles.AboutMe__Container__Info}>
                    <div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam dolore earum provident autem voluptate ea nostrum alias dolor,<strong>non hic, nesciunt sint unde neque dolores magni dolorem velit beatae sed!</strong></p>
                        <p>Si tu div se superpone al navbar, puede ser por varias razones, pero lo más probable es que tenga un z-index mayor o que su contenedor lo haga sobresalir<strong>non hic, nesciunt sint unde neque dolores magni dolorem velit beatae sed!</strong></p>
                        <p>Plataforma gratuita con retos de programación. Más de 1 millón de visitas en un mes. +50K retos completados. Creada desde cero con Next.js, React y Tailwind CSS.<strong>non hic, nesciunt sint unde neque dolores magni dolorem velit beatae sed!</strong></p>
                    </div>
                    <div className={styles.AboutMe__Container__DivButton}>
                        <SpecialButton href='/CV.pdf' message='⬇️ Descarga mi CV'/>
                    </div>
                    
                </div>
            </div>
        </div>
        
    )
};