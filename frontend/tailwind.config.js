/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"]
      },
      colors: {
        brand: {
          50: "#e8efff",
          100: "#c5d6ff",
          500: "#2356d8",
          700: "#193ea1",
          900: "#102759"
        }
      }
    }
  },
  plugins: []
};
