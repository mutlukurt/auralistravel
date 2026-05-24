import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        auralis: {
          orange: "#F97316",
          dark: "#111827",
          muted: "#6B7280",
          soft: "#FAFAF8",
          peach: "#FFF3EC",
          border: "#E5E7EB",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        heading: ["var(--font-poppins)", "Poppins", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(17, 24, 39, 0.08)",
        glow: "0 16px 40px rgba(249, 115, 22, 0.22)",
      },
    },
  },
  plugins: [],
};

export default config;
