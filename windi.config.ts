import { defineConfig } from 'windicss/helpers'
import forms from 'windicss/plugin/forms'

export default defineConfig({
  attributify: true,
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {},
    },
  },
  darkMode: 'class',
  plugins: [forms],
})