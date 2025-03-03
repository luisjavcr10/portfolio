/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./node_modules/libreria-de-componentes/**/*.{js,ts,jsx,tsx}" // Si usas una librería externa
    ],
    theme: {
      extend: {},
    },
    plugins: [require("tailwindcss-animate")],
  };
  