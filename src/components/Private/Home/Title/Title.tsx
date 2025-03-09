import styles from './Title.module.scss';
import Image from 'next/image';
import { SpecialButton } from '@/components/Shared/SpecialButton';
import { NameIterator } from '../NameIterator/NameIterator';

import { SpecialButton } from '@/components/Shared/SpecialButton';

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
            priority
          />
          <SpecialButton href='https://www.linkedin.com/in/luis-javier-castillo-rabanal-897b542a4/' message='Disponible para trabajar'/>
        </div>
        <div className={styles.Home__Presentation}>
          {/*<NameIterator />*/}
          <h2>Desarrollador Full Stack</h2>
          <h1>Hola 👋, soy Luis Castillo</h1>
          <p className={styles.Home__Presentation__Text}>
            Apasionado por la tecnología y el desarrollo web. Con experiencia en frontend y backend, creando soluciones eficientes y escalables.
          </p>
        </div>
      </div>
  );
};
