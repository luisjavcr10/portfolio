import React from "react";

const shortcuts = [
  { key: "⌘ + B", description: "Hide/show the Interview Coder window instantly." },
  { key: "⌘ + H", description: "Capture screenshots of the interview question and requirements." },
  { key: "⌘ + ↵", description: "Generate an initial solution with detailed explanations based on screenshots." },
  { key: "⌘ + ↑↓←→", description: "Move the window around your screen without touching the mouse." },
  { key: "⌘ + R", description: "Reset everything to start fresh with a new problem." },
  { key: "⌘ + Q", description: "Quit the application to remove all keyboard commands." },
];

export const GridShadow = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-10">
      {shortcuts.map((shortcut, index) => (
        <div key={index} className="relative group block p-2 h-full w-full">
          <div className="rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-zinc-800 
            dark:border-zinc-700 group-hover:border-slate-700 relative z-20 backdrop-blur-sm 
            shadow-[0_0_15px_rgba(0,0,0,0.10)] transition-all duration-200 
            group-hover:shadow-[0_0_30px_rgba(0,0,0,0.15)]">
            <div className="relative z-50 p-4">
              <h4 className="text-zinc-100 font-bold tracking-wide mt-4">{shortcut.key}</h4>
              <p className="mt-8 text-zinc-400 tracking-wide text-sm">{shortcut.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

