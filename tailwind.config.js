/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["{pages,src,app,components}/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ffa5af",
          secondary: "#FFBEBD",
          accent: "#FFD951",
          neutral: "#F2F2F2",
          "base-100": "#1C1C1C",
          info: "#57C7FF",
          success: "#A1FF9B",
          warning: "#FFC542",
          error: "#FF6469",
        },
      },
    ],
  },

  plugins: [require("daisyui")],

  daisyui: {
    // themes: [""], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: false,
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
  },
};
