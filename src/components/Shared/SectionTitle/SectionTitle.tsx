import styles from './SectionTitle.module.scss';

export const SectionTitle = ({ children, title}: Readonly<{children: React.ReactNode; title: string}>) =>{
    return(
        <div className={styles.SectionTitle}>
            {children}
            <h1 className={styles.SectionTitle__Word}>{title}</h1>
        </div>
    )
};