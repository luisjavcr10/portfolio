import styles from './Title.module.scss';
import Image from 'next/image';

export const Title = () => {
  return (
    <div className={styles.Home}>
      <main>
        <div className={styles.Home__Profile}>
          <Image
            className={styles.Home__Profile__Image}
            src="/images/profile/profile.jpg"
            width={100} 
            height={100}
            alt="profile"
          />
          <button className={styles.Home__Profile__Button}>Disponible para trabajar</button>
        </div>
        <div className={styles.Home__Presentation}>
          <h1>Hola!! Soy Luis</h1>
          <h2>Full Stack Developer</h2>
          <p>
            Apasionado por la tecnología y el desarrollo web. Con experiencia en frontend y backend, creando soluciones eficientes y escalables.
          </p>
        </div>
      </main>
    </div>
  );
};
