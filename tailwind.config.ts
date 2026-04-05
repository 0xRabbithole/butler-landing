import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lavender: {
          50: "#F7F2FB",
          100: "#EFE6F6",
          200: "#E2D3EF",
          300: "#D1BCE4",
          400: "#B99FD4",
          500: "#9A86B8",
        },
        ink: {
          DEFAULT: "#160F22",
          soft: "#2A1F3D",
          muted: "#5A4E6E",
        },
        cream: "#F5E9C8",
        mint: "#CFE5D3",
        sun: "#F5C842",
        blush: "#F2C4C4",
      },
      fontFamily: {
        display: ['"Instrument Serif"', "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        chunky: ['"Space Grotesk"', "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};
export default config;
