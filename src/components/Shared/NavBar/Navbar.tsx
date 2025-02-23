import Link from "next/link";
import styles from "./Navbar.module.scss";

const links = [
    { name: "Home", href: "/"},
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects"},
    { name: "Skills", href: "/skills"},
    { name: "Contact", href: "/contact",},
]

export const Navbar = () => {
    return(
        <div className={styles.Navbar}>
            <h1>Luis Castillo Rabanal</h1>
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