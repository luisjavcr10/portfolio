import styles from './SpecialButton.module.scss';

export const SpecialButton = ({ href, message, isDownload }: Readonly<{href:string , message: string, isDownload?:boolean}>) => {
    return(
        <a 
            className={styles.SpecialButton }       
            href={href}
            target='_blank'            
            rel='noopener noreferrer  '
            {...(isDownload ? { download: '/Full Stack Developer - Castillo R. Luis J..pdf' } : {})}
          >
            <span className={styles.Glow}></span>
            <span className={styles.Content}>{message}</span>
        </a>
    );
}