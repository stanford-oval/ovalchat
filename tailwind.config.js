module.exports = {
  purge: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    ,
    "./src/data/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  corePlugins: {
  },
  theme: {
    extend: {
      colors: {
        factgpt: {
          primary: {
            DEFAULT: "#6940b6",
            light: "#7447c9",
            dark: "#5b379e",
            dark1: "#3f2278",
            dark2: "#2c1458",
          },
          secondary: {
            bright: "#283975",
            light: "#1f306b",
            DEFAULT: "#192245",
            dark: "#0d142b",
          },
        },
      },
    },
  },
  variants: {
    extend: {
      cursor: ["disabled"],
    },
  },
  plugins: [require('@tailwindcss/forms')],
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
};
