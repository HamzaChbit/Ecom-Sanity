/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // L'ALWAN JDIDA DYAL "DESKTOP PLUS"
          amber: '#FFBF00', // Lawn sfer/dhbi zwin
          dark: '#1a1a1a',  // K7el mghloq chwiya
        },
      },
    },
  },
  plugins: [],
};