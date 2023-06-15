/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["{pages,src,app,components}/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#004AAD",
        secondary: "#FFB400",
        accent: "#00A699",
        neutral: "#FFFFFF",
        base100: "#F0F0F0",
        info: "#008489",
        success: "#00A699",
        warning: "#FFB400",
        error: "#FF3860",
      },
    },
  },
  variants: [],
  plugins: [],
};
