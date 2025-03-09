"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../Navbar.module.scss";

const links = [
  { name: "Inicio", href: "/" },
  { name: "Proyectos", href: "/#projects" },
  { name: "Habilidades", href: "/#skills" },
  { name: "Sobre mí", href: "/#aboutme" },
];

export const NavLinks = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute("id") || "";
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ul>
      {links.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            className={`${styles.Navbar__Link} ${
              activeSection === link.href.replace("/#", "") ? styles.active : ""
            }`}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};