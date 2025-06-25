"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from './NavLinks.module.scss';
import { ButtonTheme } from "../ButtonTheme";

const links = [
  { name: "Inicio", href: "/" },
  { name: "Proyectos", href: "/#projects" },
  { name: "Habilidades", href: "/#skills" },
  { name: "Sobre mí", href: "/#aboutme" },
];

export const NavLinks = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    /**
     * Maneja el scroll para detectar la sección activa y el estado del navbar
     */
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Detectar si se ha hecho scroll (más del 10% del viewport)
      setIsScrolled(scrollY > viewportHeight * 0.1);
      
      // Detectar sección activa
      const sections = document.querySelectorAll("section");
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute("id") || "";
        }
      });

      setActiveSection(current);
    };

    // Ejecutar una vez al montar para establecer el estado inicial
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.NavLinks} ${isScrolled ? styles.scrolled : ''}`}>
      <ul>
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={`${styles.NavLinks__Link} ${
                activeSection === link.href.replace("/#", "") ? styles.active : ""
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <ButtonTheme/>
    </nav>
    
  );
};