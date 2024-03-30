/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '200': '36rem', // Add custom width value of 200px
      },
    },
  },
  variants: {
    borderColor: ['responsive', 'hover', 'focus'], // add 'focus' here
  },
  plugins: [],
}

