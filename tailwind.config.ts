import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: "#2563EB",
          green: "#10B981",
        },
        hoverBlue: "#1D4ED8",
        light: {
          green: "#6EE7B7",
        },
        neutral: {
          900: "#0F172A",
          700: "#334155",
          300: "#CBD5E1",
          100: "#F1F5F9",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      // Custom spacing tokens added ON TOP of Tailwind defaults (no override)
      spacing: {},
      borderRadius: {
        DEFAULT: "6px",
        card: "12px",
        modal: "20px",
        hero: "20px",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #2563EB, #10B981)",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
      keyframes: {
        fly: {
          "0%": { transform: "translateY(0.1em)" },
          "100%": { transform: "translateY(-0.1em)" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        "border-spin": {
          "100%": { transform: "rotate(-360deg)" },
        },
      },
      animation: {
        fly: "fly 0.6s ease-in-out infinite alternate",
        blob: "blob 7s infinite",
        "border-spin": "border-spin 7s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
