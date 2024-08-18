/** @type {import('tailwindcss').Config} */
export default {
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'less-green': '#d7f3d7', // Example of a custom color with less green
      },
    },
  },
  plugins: [],
}

