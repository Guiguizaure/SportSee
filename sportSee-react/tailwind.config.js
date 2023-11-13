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
      transparent: "transparent",
      "light-grey": "##F4F4F4",
      "light-grey-bg": "#F8FBFF",
      "dark-grey": "#7E7E7E",
      white: "#FFFFFF",
      black: "#000000",
      blue: "#0D3182",
      turquoise: "#27BDBE",
      "dark-pink": "#ED1164",
      "light-pink": "rgba(245, 153, 177, 0.1)",
      pink: "#F599B1",
      green: "#5BB718",
      "blue-opacity": "rgba(13, 49, 130, 0.6)",
      "blue-opacity-light": "rgba(13, 49, 130, 0.1)",
      "green-opacity": "rgba(91, 183, 24, 0.15)",
      "turquoise-opacity": "rgba(39, 189, 190, 0.1)",
      "white-border": "rgba(255, 255, 255, 0.1)",
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

