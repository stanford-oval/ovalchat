module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    ,
    "./src/data/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'media', // or 'media' or 'class'
  corePlugins: {
  },
  theme: {
    extend: {
      colors: {
        ovalchat: {
          primary: {
            DEFAULT: "#047857",
            light: "#059669",
            dark: "#047857",
            dark1: "#065F46",
            dark2: "#064E3B",
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
