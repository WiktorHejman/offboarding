/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./src/**/*.component.ts"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    "bg-red-50",
    "bg-green-50",
    "bg-blue-50",
    "bg-yellow-50",
    "bg-purple-50",
    "p-5",
  ],
};
