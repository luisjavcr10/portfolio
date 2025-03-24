import styles from "./Navbar.module.scss";
import { ButtonTheme } from "./ButtonTheme";
import { NavLinks } from "./NavLinks";

export const Navbar = () => {
  return (
    <header className={styles.Navbar}>
      <NavLinks />
      <ButtonTheme />
    </header>
  );
};
