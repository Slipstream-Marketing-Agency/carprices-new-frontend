/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'logo-in': 'logoIn 0.5s ease-out forwards',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      textColor: {
        DEFAULT: '#000', // Set the default text color to black
      },
      container: {
        center: true,
        screens: {
          sm: '400px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1360px',
          '3xl': '1440px',
        },
        padding: "14px",
      },
      keyframes: {
        logoIn: {
          '0%': {
            transform: 'translateX(-100%)',  // Starting from the left
            opacity: 0,
          },
          '100%': {
            transform: 'translateX(0)',  // Ending at the default position
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [],
};
