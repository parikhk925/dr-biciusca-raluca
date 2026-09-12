import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F5F6F3",
        paper: "#FFFFFF",
        ink: "#13161A",
        inkSoft: "#5B6470",
        teal: {
          50: "#EAFAFC",
          100: "#CFF1F5",
          200: "#9FE2EA",
          300: "#63CEDB",
          500: "#1BAFC2",
          600: "#149AAB",
          700: "#0F7C8A",
          900: "#0B3238",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(19, 22, 26, 0.25)",
        card: "0 10px 30px -12px rgba(19, 22, 26, 0.16)",
      },
      keyframes: {
        kenburns: {
          "0%": { transform: "scale(1) translate3d(0,0,0)" },
          "100%": { transform: "scale(1.12) translate3d(-1%, -1%, 0)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        kenburns: "kenburns 22s ease-in-out infinite alternate",
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
