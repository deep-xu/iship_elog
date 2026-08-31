/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'ns-navy': '#1f3a5f',
        'ns-navy-dark': '#16304f',
        'ns-blue': '#4a9fe0',
        'ns-marine-light': '#eef6fc',
        'ns-marine-light-dark': '#d7e8f4',
        'ns-blue-logo': '#3f93d8',
        'ns-red': '#d96c6c',
        'ns-tabbar': '#f8fcff',
        'ns-canvas': '#eef6fb',
        'ns-titlebar': '#ffffff',
        'ns-muted': '#7b92aa',
        'ns-maroon': '#ddebf5',
        'ns-tree-text': '#6d89a5',
        'ns-tree-line': '#d8e6ef',
      },
      fontFamily: {
        ui: ['Manrope', '"Segoe UI"', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Manrope', '"Segoe UI"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
