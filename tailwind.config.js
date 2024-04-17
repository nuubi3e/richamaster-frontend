/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'top-br-grey': '#818180',
        primary: '#121722',
        up: '#39B54A',
        down: '#ED1F24',
        'yellow-dark': '#9E6928',
        'off-white': '#CBCCCC',
        'bdy-grey': '#B3B4B4',
        'graph-tr': '#333333',
        'yellow-light': '#F9AF3B',
        'graph-center': '#3E3532',
        'bd-aside-gray': '#3E3F3F',
      },
    },
  },
  plugins: [],
}
