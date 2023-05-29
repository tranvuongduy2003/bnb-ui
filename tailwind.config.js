/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#EBFDFFFF",
          DEFAULT: "#00BDD6FF",
        },
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
