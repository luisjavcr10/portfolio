import styles from "./Navbar.module.scss";
import { ButtonTheme } from "./ButtonTheme";
import { NavLinks } from "./NavLinks";

export const Navbar = () => {
  return (
    <div className={styles.Navbar}>
      <NavLinks />
      <ButtonTheme />
    </div>
  );
};
