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
        void: "#0B0B0C",
        amberGold: "#D4AF37",
        crimson: "#8A0303",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)"],
        sans: ["var(--font-inter)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'spotlight': '0 0 50px 10px rgba(212, 175, 55, 0.1)',
      }
    },
  },
  plugins: [],
};
export default config;
