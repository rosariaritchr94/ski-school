/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sofia: ["var(--font-sofia)"],
        oswald: ["var(--font-oswald)"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
