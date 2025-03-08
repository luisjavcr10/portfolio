import React from "react";
import styles from "./GridShadow.module.scss"; // Importamos los estilos como 'styles'

const shortcuts = [
  { key: "⌘ + B", description: "Hide/show the Interview Coder window instantly." },
  { key: "⌘ + H", description: "Capture screenshots of the interview question and requirements." },
  { key: "⌘ + ↵", description: "Generate an initial solution with detailed explanations based on screenshots." },
  { key: "⌘ + ↑↓←→", description: "Move the window around your screen without touching the mouse." },
  { key: "⌘ + R", description: "Reset everything to start fresh with a new problem." },
  { key: "⌘ + Q", description: "Quit the application to remove all keyboard commands." },
];

const GridShadow = () => {
  return (
    <div className={styles.grid}>
      {shortcuts.map((shortcut, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.cardContent}>
            <h4 className={styles.title}>{shortcut.key}</h4>
            <p className={styles.description}>{shortcut.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridShadow;
