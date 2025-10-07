// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,svelte,js,ts}'], // include your Svelte files
  darkMode: 'class', // 👈 IMPORTANT
  theme: {
    extend: {},
  },
  plugins: [],
};
