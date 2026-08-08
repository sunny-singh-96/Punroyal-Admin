/** @type {import('tailwindcss').Config} */

module.exports = {

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      colors: {

        brand: "#2F6F4E",
        brandLight: "#4C8F6A",

        accent: "#E9B949",
        accentHover: "#D9A437",

        softBg: "#F7F8F7"

      }

    }
  },

  plugins: [],

}