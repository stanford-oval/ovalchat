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
            light: "#4779c9",
            DEFAULT: "#406db6",
            dark: "#375e9e",
            dark1: "#224378",
            dark2: "#152f59",
          },
          secondary: {
            bright: "#287175",
            light: "#1f676b",
            DEFAULT: "#194345",
            dark: "#0d2a2b",
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
