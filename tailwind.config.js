/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: 'tw-',
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      fontFamily: {
        gilroy: ["Gilroy", "sans-serif"],
      },
      container: {
        center: true,
        screens: {
          sm: '400px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1360px',
        },
      },
      backgroundImage: theme => ({
        'stripes': 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)'
      }),
      keyframes: {
        "trans-right": {
          "0%,50%": { transform: "translateX(1200px)" },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        speedCar: {
          '0%': { transform: 'translateY(0)', opacity: '0.7' },
          '50%': { transform: 'translateY(-5px)', opacity: '1' },
          '100%': { transform: 'translateY(0)', opacity: '0.7' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        "trans-right": "trans-right 0.6s ease-in-out",
        slideInLeft: 'slideInLeft 0.6s ease-out',
        speedCar: 'speedCar 2s ease-in-out infinite',
        zoomIn: 'zoomIn 0.5s ease-out',
      },
    },
  },
  plugins: [],
};
