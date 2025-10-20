/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'nestify-blue': '#3b82f6',
        'nestify-cyan': '#06b6d4',
        'nestify-bg': '#0f172a',
      },
      backgroundImage: {
        'blue-gradient': 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
        'blue-gradient-hover': 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
      },
      boxShadow: {
        'nestify': '0 2px 8px rgba(59, 130, 246, 0.3)',
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};
