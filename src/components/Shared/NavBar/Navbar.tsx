import styles from "./Navbar.module.scss";
import { NavLinks } from "./NavLinks";

export const Navbar = () => {
  return (
    <header className={styles.Navbar}>
      <NavLinks />
    </header>
  );
};
