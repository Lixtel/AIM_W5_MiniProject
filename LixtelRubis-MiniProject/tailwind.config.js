/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#29243b',
        plum: '#754185',
        lilac: '#eee7f2',
        canvas: '#f8f7fb',
      },
    },
  },
  plugins: [],
}
