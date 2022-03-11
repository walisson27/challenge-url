const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    colors: {
      transparent: `rgba(0, 0, 0, 0)`,
      ...colors,
    },
    extend: {},
  },
  variants: {
    extend: {
      boxShadow: [`hover`],
    },
  },
  plugins: [],
};
