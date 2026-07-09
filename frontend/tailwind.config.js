const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layout/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    fontFamily: {
      sans: ["'Inter'", "system-ui", "sans-serif"],
      serif: ["'Inter'", "system-ui", "sans-serif"],
      DejaVu: ["DejaVu Sans", "Arial", "sans-serif"],
    },
    extend: {
      colors: {
        ilmic: {
          blue: "#1E5A9E",
          "blue-dark": "#15477A",
          "blue-darker": "#0F3A66",
          "blue-light": "#E8F2FC",
          "blue-soft": "#F5F9FF",
          white: "#FFFFFF",
          text: "#0F3A66",
          muted: "#5A7394",
          border: "#C5D9EE",
        }
      },
      screens: {
        xs: "400px",
      },
      height: {
        header: "560px",
      },
      backgroundImage: {
        "page-header": "url('/page-header-bg.jpg')",
        "contact-header": "url('/page-header-bg-2.jpg')",
        subscribe: "url('/subscribe-bg.jpg')",
        "app-download": "url('/app-download.jpg')",
        cta: "url('/cta-bg.png')",
        "cta-1": "url('/cta/cta-bg-1.png')",
        "cta-2": "url('/cta/cta-bg-2.png')",
        "cta-3": "url('/cta/cta-bg-3.png')",
      },
      keyframes: {
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(-30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "pulse-border": {
          "0%, 100%": {
            borderColor: "rgb(239 68 68)",
          },
          "50%": {
            borderColor: "rgb(220 38 38)",
          },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.8s ease-out",
        "fade-in-right": "fade-in-right 0.8s ease-out 0.2s both",
        "pulse-border": "pulse-border 3s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
