/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        baseBlue: "#28abe2",
        appGray: "#6D798E",
        appGray1: "#FAFAFA",
        appGray2: "#EBEBEB",
        appGray3: "#6F6F6F",
        appGray4: "#DDDFE3",
        appGray5: "#FCFCFC",
        appGray6: "#F5F5F5",
        appBlue: "#29ABE2",
        appBlack: "#101010",
        appBlack1: "#242424",
      },
      fontFamily: {
        body: "'Poppins', sans-serif;",
      },
    },
  },
  plugins: [],
};
