import styles from './Title.module.scss';
import Image from 'next/image';

export const Title = () => {
  return (
      <div className={styles.Home}>
        <div className={styles.Home__Profile}>
          <Image
            className={styles.Home__Profile__Image}
            src="/images/profile/profile.jpg"
            width={100} 
            height={100}
            alt="profile"
          />
          <a 
            className={styles.Home__AvailableBotton}
            href='https://www.linkedin.com/in/luis-javier-castillo-rabanal-897b542a4/'
            target='_blank'
            rel='noopener noreferrer  '
          >
            Disponible para trabajar
          </a>
        </div>
        <div className={styles.Home__Presentation}>
          <h2>Desarrollador Full Stack</h2>
          <h1>Hola!! Soy Luis Castillo</h1>
          <p>
            Apasionado por la tecnología y el desarrollo web. Con experiencia en frontend y backend, creando soluciones eficientes y escalables.
          </p>
        </div>
      </div>
  );
};
