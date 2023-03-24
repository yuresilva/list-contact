/** @type {import('tailwindcss').Config} */ module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [],
  },
  theme: {
    extend: {
      backgroundImage: {
        visitantes: "url('/assets/LOGO_ALVORADA_green.webp')",
      },
      screens: {
        "4xs": { max: "311px" },
        "2xs": { min: "312" },
        xs: { min: "320px" },
        sm: { min: "480px" },
        md: { min: "768px" },
        lg: { min: "976px" },
        "2lg": { min: "1280px" },
        xl: { min: "1440px" },
      },
      colors: {
        primary: "#000000",
        secondary: "#D41313",
        neutral1: "##656565",
        oddgray: "#344054",
        error: "#F56565",
        success: "#48BB78",
      },
      fontFamily: {
        Inter: ["Roboto", "sans-serif"],
        sans: ["Graphik", "sans-serif"],
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))",
        8: "repeat(8, minmax(0, 1fr))",
        9: "repeat(9, minmax(0, 1fr))",
        10: "repeat(10, minmax(0, 1fr))",
        11: "repeat(11, minmax(0, 1fr))",
        12: "repeat(12, minmax(0, 1fr))",
      },
    },
  },
  plugins: [
    require("tailwindcss"),
    require("precss"),
    require("autoprefixer"),
    require("daisyui"),
  ],
};
