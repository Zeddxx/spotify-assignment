/** @type {import('tailwindcss').Config} */
export default {
  // corePlugins: {
  //   preflight: false
  // },
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  important: "#root",
  theme: {
    extend: {},
  },
  plugins: [import('tailwindcss-animate')],
}

