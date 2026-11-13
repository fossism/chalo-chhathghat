/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chhath: {
          saffron: "#F37021",
          gold: "#FFB703",
          deepOrange: "#FB8500",
          sindoor: "#E63946",
          riverNight: "#023047",
          riverTwilight: "#126782",
          sacredYellow: "#FEE440",
          mitti: "#8D5B4C",
          caneGreen: "#2D6A4F",
          bananaGreen: "#52B788",
        }
      },
      fontFamily: {
        devanagari: ['"Rozha One"', '"Baloo 2"', 'serif'],
        folk: ['"Baloo 2"', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'float-slow': 'floatSlow 4s ease-in-out infinite',
        'ripple': 'ripple 3s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        ripple: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
