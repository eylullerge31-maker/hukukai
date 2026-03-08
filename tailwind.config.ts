import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "var(--bg)",
          2: "var(--bg2)",
          3: "var(--bg3)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          2: "var(--surface2)",
        },
        gold: {
          DEFAULT: "var(--gold)",
          light: "var(--gold-lt)",
          dark: "var(--gold-dk)",
          dim: "var(--gold-dim)",
          glow: "var(--gold-glow)",
        },
        line: {
          DEFAULT: "var(--line)",
          2: "var(--line2)",
        },
        txt: {
          DEFAULT: "var(--txt)",
          2: "var(--txt2)",
          3: "var(--txt3)",
        },
        ok: "var(--ok)",
        err: "var(--err)",
        warn: "var(--warn)",
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        serif: ["Libre Baskerville", "serif"],
      },
      borderRadius: {
        DEFAULT: "14px",
        sm: "8px",
        pill: "999px",
      },
      animation: {
        "float": "float 5s ease-in-out infinite",
        "pulse-dot": "pulse-dot 2.2s infinite",
        "fade-up": "fade-up 0.55s ease forwards",
        "modal-in": "modal-in 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "toast-in": "toast-in 0.25s ease",
        "toast-out": "toast-out 0.25s ease forwards",
        "bounce-in": "bounce-in 0.45s ease",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.4)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "none" },
        },
        "modal-in": {
          from: { opacity: "0", transform: "translateY(18px) scale(0.96)" },
          to: { opacity: "1", transform: "none" },
        },
        "toast-in": {
          from: { opacity: "0", transform: "translateX(16px)" },
          to: { opacity: "1", transform: "none" },
        },
        "toast-out": {
          to: { opacity: "0", transform: "translateX(16px)" },
        },
        "bounce-in": {
          from: { transform: "scale(0.4)", opacity: "0" },
          "70%": { transform: "scale(1.1)" },
          to: { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
