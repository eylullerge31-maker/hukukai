// HukukAI Tema Değişkenleri
// Tailwind config ile senkronize tutun

export const theme = {
  colors: {
    bg: "#08090f",
    bg2: "#0d0f18",
    bg3: "#111420",
    surface: "#161927",
    surface2: "#1c2133",
    gold: "#c8a96e",
    goldLight: "#e2c99a",
    goldDark: "#9a7a44",
    goldDim: "rgba(200,169,110,0.12)",
    goldGlow: "rgba(200,169,110,0.22)",
    line: "rgba(200,169,110,0.13)",
    line2: "rgba(200,169,110,0.28)",
    txt: "#e8eaf2",
    txt2: "#7d8aab",
    txt3: "#3e4a65",
    ok: "#2db87a",
    err: "#e05252",
    warn: "#d4930a",
  },
  fonts: {
    sans: "'Outfit', sans-serif",
    serif: "'Libre Baskerville', serif",
  },
  radius: {
    default: "14px",
    sm: "8px",
    pill: "999px",
  },
  transition: "0.22s cubic-bezier(0.4, 0, 0.2, 1)",
} as const;
