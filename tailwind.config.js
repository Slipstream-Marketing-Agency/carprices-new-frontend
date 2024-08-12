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
      backgroundImage: theme => ({
        'stripes': 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)'
      }),
      keyframes: {
        "trans-right": {
          "0%,50%": { transform: "translateX(1200px)" },
          // '25%,50%':{transform: 'translateX(500px)'},
          // '100%':{transform:'translateX(0px)'}
        },
      },
      animation: {
        "trans-right": "trans-right 0.6s ease-in-out",
      },
    },
    
  },
  plugins: [],
};
