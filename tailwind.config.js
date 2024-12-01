/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        accent: "var(--text-accent)",
      },
      backgroundColor: {
        primary: "var(--bg-default)",
        paper: "var(--bg-paper)",
        accent: "var(--bg-accent)",
      },
      borderColor: {
        DEFAULT: "var(--border-color)",
      },
      boxShadowColor: {
        DEFAULT: "var(--shadow-color)",
      },
      screens: {
        xs: "450px",
      },
      animation: {
        blob: "blob 7s infinite",
        gradient: "gradient 15s ease infinite",
        shimmer: "shimmer 2s linear infinite",
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        gradient: {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
        },
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      },
      backgroundImage: {
        "hero-pattern": "radial-gradient(circle at center, rgba(2, 0, 36, 0) 0%, rgba(9, 9, 121, 0.1) 35%, rgba(0, 212, 255, 0.2) 100%)",
      },
    },
  },
  plugins: [],
};
