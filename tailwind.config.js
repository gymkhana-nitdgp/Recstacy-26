/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          // 'utility-name': ['Font Name in CSS', 'fallback']
          'mosca': ['"Mosca Laroke"', 'sans-serif'],
          'cinzel': ['cinzel', 'serif'], 
          'jmh-typewriter': ['jmh-typewriter', 'monospace'],
        },
      },
        },
    plugins: [],
  }
  
 