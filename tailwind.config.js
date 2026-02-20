/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#fff7fb",
          100: "#ffeaf4",
          200: "#ffd1e7",
          300: "#ffb2d8",
          400: "#ff82c2",
          500: "#ff5aad",
          600: "#f4369b",
          700: "#d61e80",
          800: "#ab1b67",
          900: "#7d174f",
        },
        cream: "#fffafc",
        ink: "#1a1a1a",
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        body: ['"Poppins"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 12px 40px rgba(255, 90, 173, 0.22)",
        soft: "0 10px 30px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
    },
  },
  plugins: [],
};