import { ThreeDCardDemo } from "@/components/Shared/Image3d/Image3d"
import styles from './page.module.scss';

export default function Animation() {
    return (
        <div >
            <button className={styles.GlowingButton}>
                <span className={styles.Glow}></span>
                <span className={styles.Content}>Disponible para trabajar</span>
            </button>
        </div>
    )
}