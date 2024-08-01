import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#00923F",
        "primary-light": "#E6F4EC",
        secondary: "#FF9500",
        background: "#E5E5EA",
        neutral: "#EBEBEB",
        "neutral-2": "#797979",
        "neutral-3": "#B0B0B0",
        error: "#FF0000",
      },
      fontFamily: {
        nunito: ["var(--font-nunito)", "sans-serif"],
        quantico: ["var(--font-quantico)", "sans-serif"],
        bai_jamuree: ["var(--font-bai)", "sans-serif"],
      },
      screens: {
        xs: {
          max: "120px",
        },
        sm: {
          max: "480px",
        },
        md: {
          max: "768px",
        },
        lg: {
          max: "976px",
        },
        xl: {
          max: "1440px",
        },
      },
      boxShadow: {
        custom: "0 0 10px rgba(0, 0, 0, 0.07)",
        "custom-1": "0 0 20px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;