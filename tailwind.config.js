/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "var(--accent)",
          soft: "var(--accent-soft)",
          10: "var(--accent-10)",
          20: "var(--accent-20)",
          30: "var(--accent-30)",
        },
        gold: {
          light: "#f5e0a0",
          DEFAULT: "#c9a84c",
          dark: "#a07830",
        },
        hero: "#080808",
      },
      fontFamily: {
        cormorant: ["Cormorant Garamond", "serif"],
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        "2xs": "9px",
        "3xs": "10px",
        "4xs": "11px",
      },
      letterSpacing: {
        "widest-2": "2px",
        "widest-3": "3px",
        "widest-4": "4px",
        "widest-2.5": "2.5px",
        "widest-1.5": "1.5px",
      },
      borderWidth: {
        0.5: "0.5px",
      },
      maxWidth: {
        300: "300px",
        360: "360px",
      },
      gap: {
        28: "7rem",
      },
      height: {
        600: "600px",
        340: "340px",
      },
      width: {
        "40p": "40%",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        floatDot: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-5px)" },
        },
        rotateSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        popIn: {
          "0%": { opacity: "0", transform: "scale(0.6) translateY(10px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
      },
      animation: {
        shimmer: "shimmer 4s ease-in-out infinite",
        floatY: "floatY 3s ease-in-out infinite",
        floatDot: "floatDot 2s ease-in-out infinite",
        rotateSlow: "rotateSlow 22s linear infinite",
        rotateSlow2: "rotateSlow 15s linear infinite reverse",
        fadeUp: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both",
        fadeIn: "fadeIn 0.9s cubic-bezier(0.22,1,0.36,1) both",
        popIn: "popIn 0.6s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};
