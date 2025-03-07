import styles from './SpecialTag.module.scss';

export const SpecialTag = ({ message }: Readonly<{ message: string}>) => {
    return(
        <div 
            className={styles.SpecialTag}
          >
            <span className={styles.Glow}></span>
            <span className={styles.Content}>{message}</span>
        </div>
    );
}