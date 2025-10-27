
/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    disableLightningcssTransform: true, 
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
