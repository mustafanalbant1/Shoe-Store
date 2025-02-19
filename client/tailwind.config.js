/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      writingMode: {
        "vertical-lr": "vertical-lr",
        "vertical-rl": "vertical-rl",
        "horizontal-tb": "horizontal-tb",
      },
      rotate: {
        60: "60deg",
        45: "45deg",
      },
      colors: {
        primaryBg: "#1b212c", // Özel renk
      },
    },
  },
  plugins: [],
};
