import Link from "next/link";
import styles from "./Navbar.module.scss";

const links = [
    { name: "Sobre mi", href: "/"},
    { name: "Proyectos", href: "/projects"},
    { name: "Habilidades", href: "/skills"},
    { name: "Contacto", href: "/contact",},
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