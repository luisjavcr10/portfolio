import styles from './Title.module.scss';
import Image from 'next/image';

import { SpecialButton } from '@/components/Shared/SpecialButton';
import { NameIterator } from '../NameIterator/NameIterator';

export const Title = () => {
  return (
      <div className={styles.Home}>
        <div className={styles.Home__Profile}>
          <Image
            className={styles.Home__Profile__Image}
            src="/images/profile/mainprofile.jpeg"
            width={120} 
            height={120}
            alt="profile"
            priority
          />
          <SpecialButton href='https://www.linkedin.com/in/luisjaviercastillorabanal/' message='Disponible para trabajar'/>
        </div>
        <div className={styles.Home__Presentation}>
          <NameIterator />
          <h1>Hola 👋, soy Luis Castillo</h1>
          <p className={styles.Home__Presentation__Text}>
            Apasionado por la tecnología y el desarrollo web. Con experiencia en frontend y backend, creando soluciones eficientes y escalables.
          </p>
        </div>
      </div>
  );
};
