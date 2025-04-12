// tailwind.config.js
import theme from "@/app/theme"

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Map MUI theme to Tailwind
        primary: {
          light: '#1D6A72',
          DEFAULT: '#16565D',
          dark: '#0F444A',
        },
        secondary: {
          light: '#D18E81',
          DEFAULT: '#BC7363',
          dark: '#9D5C4E',
        },
        accent: {
          DEFAULT: '#63888D',
          light: '#97A5A9',
          pale: '#D0C8C3',
        },
        background: {
          DEFAULT: '#201D21',
          paper: '#2A272B',
          light: '#B7C9D3',
        },
      },
      fontFamily: {
        geist: ['"Geist"', 'sans-serif'],
      },
      borderRadius: {
        mui: '12px',
      },
    },
  },
  plugins: [],
}