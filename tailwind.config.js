/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        // Breakpoints customizados baseados nas larguras dos monitores
        'full-hd': '1920px', // Ativado a partir de 1920px
        'ultrawide': '2560px', // Ativado a partir de 2560px
        '4k': '3840px', // Exemplo para 4K
      },
      fontFamily: {
        
      },
      colors: {
        
      }
    },
  },
  plugins: [require("rippleui")],
}