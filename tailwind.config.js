/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        basic: ["Roboto", "sans-serif"],
        alternate: ["Raleway", "sans-serif"],
        display: ["Oswald", "sans-serif"],
      },
      colors: {
        primary: {
          light: "#FFF3DA",
          dark: "#322653",
        },
        secondary: {
          light: "#FDF4F5",
          dark: "#FFD2D7",
        },
        accent: {
          light: "#F8F6F4",
          dark: "#2D2727",
        },
        purple: {
          100: "#DFCCFB",
          200: "#D0BFFF",
          300: "#BEADFA",
          400: "#9288F8",
          500: "#8062D6",
        },
        special: "#A61F69",
      },
      backgroundColor: {},
      textColor: {
        primary: {
          light: "#F8F6F4",
          dark: "#2D2727",
        },
        secondary: {
          light: "#FFF3DA",
          dark: "#322653",
        },
      },
    },
  },
  plugins: [],
};
