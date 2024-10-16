/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/tokenmania_frontend/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './src/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        infinite: '#3b00b9',
        'dark-infinite': '#1e005d',
        razzmatazz: '#ed1e79',
        flamingo: '#f15a24',
        'sea-buckthron': '#fbb03b',
        'picton-blue': '#29abe2',
        meteorite: '#522785'
      },
      fontFamily: {
        'body': ['Circular Std', 'sans']
      }
    },
  },
  plugins: [],
}
