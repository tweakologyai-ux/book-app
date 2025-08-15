/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Arial"],
      },
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1", // AA on white with text-white
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81"
        },
        surface: {
          DEFAULT: "#ffffff",
          50: "#fafafa",
          100: "#f4f4f5",
          900: "#0b0f19"
        }
      },
      boxShadow: {
        card: "0 10px 30px rgba(0,0,0,0.08)",
        glow: "0 0 0 4px rgba(99,102,241,0.15)"
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem"
      }
    }
  },
  plugins: [],
};
