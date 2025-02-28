import Link from "next/link";
import styles from "./Navbar.module.scss";

const links = [
    { name: "Inicio", href: "/"},
    { name: "Proyectos", href: "/#projects"},
    { name: "Habilidades", href: "/#skills"},
    { name: "Sobre mi", href: "/#aboutme",},
]

export const Navbar = () => {
    return(
        <div className={styles.Navbar}>
            <ul>
                {links.map((link) => (
                    <li key={link.name}>
                        <Link href={link.href} className={styles.Navbar__Link}> {link.name} </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}