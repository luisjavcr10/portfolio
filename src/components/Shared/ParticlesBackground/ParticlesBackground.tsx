"use client";

import React, { useEffect, useRef } from "react";
import styles from "./ParticlesBackground.module.scss";

// Interfaces para particles.js
interface ParticleConfig {
  particles: {
    number: {
      value: number;
      density: {
        enable: boolean;
        value_area: number;
      };
    };
    color: {
      value: string;
    };
    shape: {
      type: string;
      stroke: {
        width: number;
        color: string;
      };
      polygon: {
        nb_sides: number;
      };
      image: {
        src: string;
        width: number;
        height: number;
      };
    };
    opacity: {
      value: number;
      random: boolean;
      anim: {
        enable: boolean;
        speed: number;
        opacity_min: number;
        sync: boolean;
      };
    };
    size: {
      value: number;
      random: boolean;
      anim: {
        enable: boolean;
        speed: number;
        size_min: number;
        sync: boolean;
      };
    };
    line_linked: {
      enable: boolean;
      distance: number;
      color: string;
      opacity: number;
      width: number;
    };
    move: {
      enable: boolean;
      speed: number;
      direction: string;
      random: boolean;
      straight: boolean;
      out_mode: string;
      bounce: boolean;
      attract: {
        enable: boolean;
        rotateX: number;
        rotateY: number;
      };
    };
  };
  interactivity: {
    detect_on: string;
    events: {
      onhover: {
        enable: boolean;
        mode: string;
      };
      onclick: {
        enable: boolean;
        mode: string;
      };
      resize: boolean;
    };
    modes: {
      grab: {
        distance: number;
        line_linked: {
          opacity: number;
        };
      };
      bubble: {
        distance: number;
        size: number;
        duration: number;
        opacity: number;
        speed: number;
      };
      repulse: {
        distance: number;
        duration: number;
      };
      push: {
        particles_nb: number;
      };
      remove: {
        particles_nb: number;
      };
    };
  };
  retina_detect: boolean;
}

interface StatsJS {
  new(): {
    setMode: (mode: number) => void;
    begin: () => void;
    end: () => void;
    domElement: HTMLElement;
  };
}

interface ParticlesJSInstance {
  pJS: {
    particles: {
      array: unknown[];
    };
  };
}

// Declaración de tipos para particles.js y stats.js
declare global {
  interface Window {
    particlesJS: (elementId: string, config: ParticleConfig) => void;
    pJSDom: ParticlesJSInstance[];
    Stats: StatsJS;
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
    const loadParticles = async (): Promise<void> => {
      if (typeof window !== "undefined") {
        // Cargar particles.js desde CDN si no está disponible
        if (!window.particlesJS) {
          const script = document.createElement("script");
          script.src =
            "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
          script.onload = (): void => initParticles();
          document.head.appendChild(script);
        } else {
          initParticles();
        }
      }
    };

    /**
     * Carga dinámica de stats.js desde CDN
     */
    const loadStats = async (): Promise<void> => {
      if (typeof window !== "undefined" && !window.Stats) {
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/stats.js/r16/Stats.min.js";
        script.onload = (): void => initStats();
        document.head.appendChild(script);
      } else if (window.Stats) {
        initStats();
      }
    };

    /**
     * Inicializa las partículas con la configuración interactiva
     */
    const initParticles = (): void => {
      // Configuración de partículas basada en el ejemplo proporcionado
      const particlesConfig: ParticleConfig = {
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
    const initStats = (): void => {
      if (window.Stats) {
        const stats = new window.Stats();
        stats.setMode(0);
        stats.domElement.style.position = "absolute";
        stats.domElement.style.left = "0px";
        stats.domElement.style.top = "0px";

        /**
         * Función de actualización de stats
         */
        const update = (): void => {
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
