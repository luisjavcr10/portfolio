import styles from './GithubButton.module.scss';
import { FiGithub } from "react-icons/fi";

export const GithubButton = ({href}: Readonly<{href:string}>) =>{
    return (
        <a className={styles.GithubButton} href={href} target='_blank'
        rel='noopener noreferrer  '>
            <FiGithub />
            <p>CÓDIGO</p>
        </a>
    )
}