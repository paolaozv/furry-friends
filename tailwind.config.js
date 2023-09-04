/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      sans: ['var(--font-inter)']
    },
    extend: {
      colors: {
        'primary': '#ffbd59',
        'secondary': '#494949',
        'light-gray': '#cbcbcb',
        'primary-black': '#17171f',
        'primary-white': '#f5f5fa'
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')]
}

