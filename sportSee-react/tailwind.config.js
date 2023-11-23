/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1380px",
      "2xl": "1536px",
    },
    extend: {
      gridTemplateColumns: {
        // Complex site-specific column configuration
        main: "352px 1fr",
        three_one: "3fr 320px",
      },
      boxShadow: {
        'scorechart': '0px 2px 4px 0px rgba(0, 0, 0, 0.02)',
      }
    },
    container: {
      padding: {
        DEFAULT: "15px",
        sm: "20px",
        md: "30px",
        lg: "30px",
        xl: "30px",
        "2xl": "30px",
      },
      screens: {
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "100%",
        "2xl": "1087px",
      },
    },
    fontFamily: {
      display: ["Poppins", "sans-serif"],
      body: ["Poppins", "sans-serif"],
      icon: ["'Font Awesome 6 Free'"],
    },
    fontSize: {
      xxs: "0.625rem",
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
    colors: {
      red: "#FF0101",
      transparent: "transparent",
      grey: "#74798C",
      "light-grey": "#FBFBFB",
      "blue-grey": "#20253A",
      "dark-grey": "#282D30",
      white: "#FFFFFF",
      black: "#000000",
      "secondary": "#020203",
    },
  },
  variants: {
    extend: {
      scale: ["hover", "group-hover"],
      textColor: ["responsive", "hover", "focus", "group-hover"],
    },
  },
  plugins: [],
}

