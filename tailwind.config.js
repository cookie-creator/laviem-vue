module.exports = {
  content: [
    /*"./index.html",*/
    "./resources/js/**/*.{vue,html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
}
