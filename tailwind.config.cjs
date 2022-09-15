/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        bounce: 'bounce 0.3s infinite',
      },
      colors: {
        primary: 'var(--primary)',
        'sub-primary': 'var(--sub-primary)',
        'black-100': 'var(--black-100)',
        'black-800': 'var(--black-800)',
        'black-600': 'var(--black-600)',
        'black-400': 'var(--black-400)',
        'black-200': 'var(--black-200)',
      },
    },
  },
  plugins: [],
}
