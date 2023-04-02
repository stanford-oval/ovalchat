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
        ovalchat: {
          primary: {
            DEFAULT: "#a70505",
            light: "#ed5959",
            dark: "#e83737",
            dark1: "#e71e1e",
            dark2: "#b60303",
          },
          secondary: {
            bright: "#1e4a69",
            light: "#173f5c",
            DEFAULT: "#122b3d",
            dark: "#0b202e",
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
