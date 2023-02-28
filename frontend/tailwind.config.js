/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primarycolor: "#06B6D4",
      },
    },
    fontFamily: {
      display: ["Nunito", "sans-serif"],
    },
  },
  variants: {},
  plugins: [],
};
