import styles from './CodeTag.module.scss';

export const CodeTag = ({children,message,href}: Readonly<{children:React.ReactNode;message:string;href:string}>) =>{
    return (
        <a className={styles.GithubButton} href={href} target='_blank'
        rel='noopener noreferrer  '>
            {children}
            <p>{message}</p>
        </a>
    )
}