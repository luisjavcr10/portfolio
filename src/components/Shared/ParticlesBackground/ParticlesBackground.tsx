"use client";

import React, { useEffect, useRef } from "react";
import styles from "./ParticlesBackground.module.scss";

// Declaración de tipos para particles.js y stats.js
declare global {
  interface Window {
    particlesJS: any;
    pJSDom: any;
    Stats: any;
  }
}

/**
 * Componente de fondo de partículas interactivo usando particles.js
 * Proporciona un fondo animado e interactivo para toda la aplicación
 */
const ParticlesBackground: React.FC = () => {
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    /**
     * Carga dinámica de particles.js desde CDN
     */
    const loadParticles = async () => {
      if (typeof window !== "undefined") {
        // Cargar particles.js desde CDN si no está disponible
        if (!window.particlesJS) {
          const script = document.createElement("script");
          script.src =
            "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
          script.onload = () => initParticles();
          document.head.appendChild(script);
        } else {
          initParticles();
        }
      }
    };

    /**
     * Carga dinámica de stats.js desde CDN
     */
    const loadStats = async () => {
      if (typeof window !== "undefined" && !window.Stats) {
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/stats.js/r16/Stats.min.js";
        script.onload = () => initStats();
        document.head.appendChild(script);
      } else if (window.Stats) {
        initStats();
      }
    };

    /**
     * Inicializa las partículas con la configuración interactiva
     */
    const initParticles = () => {
      // Configuración de partículas basada en el ejemplo proporcionado
      const particlesConfig = {
        particles: {
          number: {
            value: 150,
            density: {
              enable: false,
              value_area: 1000,
            },
          },
          color: {
            value: "#697565",
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000",
            },
            polygon: {
              nb_sides: 10,
            },
            image: {
              src: "img/github.svg",
              width: 100,
              height: 100,
            },
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 1,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#697565",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      };

      // Inicializar particles.js
      window.particlesJS("particles-js", particlesConfig);
    };

    /**
     * Inicializa stats.js para mostrar el contador de partículas
     */
    const initStats = () => {
      if (window.Stats) {
        const stats = new window.Stats();
        stats.setMode(0);
        stats.domElement.style.position = "absolute";
        stats.domElement.style.left = "0px";
        stats.domElement.style.top = "0px";

        /**
         * Función de actualización de stats
         */
        const update = () => {
          stats.begin();
          stats.end();

          animationRef.current = requestAnimationFrame(update);
        };

        animationRef.current = requestAnimationFrame(update);
      }
    };

    // Cargar librerías
    loadParticles();
    loadStats();

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      id="particles-js"
      className={styles.particlesContainer}
      style={{ 
        pointerEvents: "auto",
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none"
      }}
      onDragStart={(e) => e.preventDefault()}
    ></div>
  );
};

export default ParticlesBackground;
