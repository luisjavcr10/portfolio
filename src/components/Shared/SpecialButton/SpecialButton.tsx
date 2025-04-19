import styles from './SpecialButton.module.scss';

export const SpecialButton = ({ href, message }: Readonly<{href:string , message: string}>) => {
    return(
        <a 
            className={styles.SpecialButton }       
            href={href}
            target='_blank'            
            rel='noopener noreferrer  '
          >
            <span className={styles.Glow}></span>
            <span className={styles.Content}>{message}</span>
        </a>
    );
}