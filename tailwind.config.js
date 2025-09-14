/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        plum: "#5A2A47",
        violet: "#8C3C64",
        coral: "#E97C62",
        peach: "#F6A88E",
        cream: "#F7E9DF",
        sand: "#FAF7F3",
        charcoal: "#3A3A3A",
      },
    },
  },
  plugins: [],
};
