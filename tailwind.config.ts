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
        "primary-2": "#65B741",
        "primary-light": "#E6F4EC",
        secondary: "#FF9500",
        tertiary: "#6500E0",
        background: "#E5E5EA",
        neutral: "#EBEBEB",
        "grey-18": "rgba(98, 98, 98, 0.18)",
        "neutral-2": "#797979",
        "neutral-3": "#B0B0B0",
        error: "#FF0000",
        "white-50": "rgba(233, 233, 233, 0.5)",
      },
      fontFamily: {
        nunito: ["var(--font-nunito)", "sans-serif"],
        quantico: ["var(--font-quantico)", "sans-serif"],
        bai: ["var(--font-bai)", "sans-serif"],
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
        "custom-1": "0 0 10px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "rgb(135 135 135) rgb(247 247 247)",
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgb(247 247 247)",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgb(135 135 135)",
            borderRadius: "4px",
          },
        },
      };
      addUtilities(newUtilities, ["responsive", "hover", "focus"]);
    },
  ],
};
export default config;
