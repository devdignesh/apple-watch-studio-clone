import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        proDisplayRegular: ["ProDisplayRegular", "sans-serif"],
        proTextSemibold: ["ProTextSemibold", "sans-serif"],
        proTextRegular: ["ProTextRegular", "sans-serif"],
        proDisplaySemibold: ["ProDisplaySemibold", "sans-serif"],

      },
      keyframes: {
        showAnimationKeyFrame: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        hideAnimationKeyFrame: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        spinShowAnimation: "showAnimationKeyFrame .5s ease forwards",
        spinHideAnimation: "hideAnimationKeyFrame .5s ease forwards",
      }
    },
  },
  plugins: [],
} satisfies Config;
