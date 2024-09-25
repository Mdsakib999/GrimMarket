/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textShadow: {
        custom: "1px 1px 2px red, 0 0 1em blue, 0 0 0.2em blue",
      },
    },
  },
  plugins: [
    // function ({ addUtilities }) {
    //   const newUtilities = {
    //     ".text-shadow-custom": {
    //       "text-shadow": "1px 1px 2px red, 0 0 1em blue, 0 0 0.2em blue",
    //     },
    //   };
    //   addUtilities(newUtilities, ["responsive", "hover"]);
    // },
  ],
};
