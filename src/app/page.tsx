import { Title } from "@/components/Private/Home/Title";
import {ContactButtons} from "@/components/Private/Home/ContactButtons";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.Home_Container}>
      <Title />
      <ContactButtons/>
    </div>
  );
}
