/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enables dark mode with the 'class' strategy
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Looks for files in your src folder
  ],
  theme: {
    extend: {
      // Custom animations
      keyframes: {
        blow: {
          '0%': { opacity: 0, transform: 'scale(0.5)' },  // Start: semi-transparent, scaled down
          '100%': { opacity: 1, transform: 'scale(1)' },  // End: fully visible, full size
        },
      },
      animation: {
        blow: 'blow 0.8s ease-out forwards', // Custom animation: scales up and fades in
      },
      // Optional: Adding custom colors or other design tokens
      colors: {
        primary: '#4F46E5', // Indigo-like primary color
        secondary: '#EC4899', // Pink-like secondary color
      },
    },
  },
  plugins: [
    // Example: You can add Tailwind plugins for forms, typography, etc.
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
}
