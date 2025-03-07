import { ThreeDCardDemo } from "@/components/Shared/Image3d/Image3d"
import styles from './page.module.scss';
import { GridShadow } from "@/components/Shared/GridShadow";

export default function Animation() {
    return (
        <div className={styles.Animation} >
            {/*<ThreeDCardDemo/>*/}
            <GridShadow/>
        </div>
    )
}