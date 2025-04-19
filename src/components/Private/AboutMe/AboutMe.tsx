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
                        <p><strong>Soy un desarrollador web full stack de Perú,</strong> con interés en construir experiencias digitales que combinan funcionalidad, diseño y eficiencia. Me enfoco en crear soluciones que no solo se vean bien, sino que también estén bien estructuradas a nivel técnico. <strong>Actualmente, busco mi primera experiencia laboral para aplicar mis habilidades en un entorno profesional.</strong></p>
                        <p>A lo largo de mi formación y práctica personal, <strong>he aprendido a comunicarme de forma clara, trabajar en equipo y adaptarme fácilmente a nuevos entornos.</strong> Me gusta organizar mi trabajo, buscar siempre mejorar, y mantener una mentalidad abierta al aprendizaje continuo.</p>
                        <p>Fuera del mundo del código, me gusta mantenerme activo. <strong>Disfruto entrenar en el gimnasio, jugar fútbol y en general, mantener un equilibrio entre la vida profesional y personal.</strong></p>
                    </div>
                    <div className={styles.AboutMe__Container__DivButton}>
                        <SpecialButton 
                            href='/docs/Full Stack Developer - Castillo R. Luis J..pdf' 
                            message='⬇️ Descarga mi CV'
                        />
                    </div>
                    
                </div>
            </div>
        </div>
        
    )
};