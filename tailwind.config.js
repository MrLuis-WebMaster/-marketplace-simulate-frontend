/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite/plugin";
import colors from "tailwindcss/colors";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: ["selector", '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        red: colors.rose,
        pink: colors.fuchsia,
        cyan: colors.cyan,
      },
    },
  },

  plugins: [flowbite],
};
