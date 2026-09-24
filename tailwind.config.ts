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
        pastel: {
          pink: "#FFC8DD",
          peach: "#FFDAC1",
          yellow: "#FDFD96",
          mint: "#CFFFE5",
          blue: "#BDE0FE",
          lavender: "#E0CFFC",
          coral: "#FFADAD",
          apricot: "#FFD6A5",
          cream: "#FFF1C1",
          aqua: "#A0E7E5",
          periwinkle: "#C7CEEA",
          purple: "#DBCDF0",
        },
      },
    },
  },
  plugins: [],
};
export default config;

