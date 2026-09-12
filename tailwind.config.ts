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
        blue: {
          50: "#EEF4FF",
          100: "#DCE8FF",
          200: "#B3CDFF",
          300: "#7FA9FF",
          500: "#2F6FED",
          600: "#1D57D6",
          700: "#1C46A8",
          900: "#0B1F4D",
          950: "#071433",
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
