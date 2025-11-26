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
        background: "var(--background)",
        foreground: "var(--foreground)",
        space: {
          900: "#070F2B", // Darkest (Deep Space)
          800: "#1B1A55", // Main Background
          500: "#535C91", // Primary Accent
          300: "#9290C3", // Highlight/Text
        },
      },
      fontFamily: {
        phudu: ["var(--font-phudu)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;