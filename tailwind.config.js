/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textShadow: {
        custom: "1px 1px 2px red, 0 0 1em blue, 0 0 0.2em blue",
      },
      animation: {
        bounce: "bounce 0.5s infinite",
        bounce200: "bounce 0.5s infinite 0.1s",
        bounce400: "bounce 0.5s infinite 0.2s",
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
