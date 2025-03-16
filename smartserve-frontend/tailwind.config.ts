import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // Enable dark mode using class strategy
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E2DED1", // Main Light
        dark: "#494949",     // Main Dark
        accent: {
          green: "#9BCF7F",
          beige: "#C7C3B7",
          gray: "#6B6B6B",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;