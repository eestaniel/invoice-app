/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        '1-primary': "hsl(var(--1-primary))", // Vibrant Blue
        '2-highlight': "hsl(var(--2-highlight))", // Brilliant Lavender
        '3-dark': "hsl(var(--3-dark))", // Deep Twilight
        '4-base': "hsl(var(--4-base))", // Midnight Blue
        '5-secondary': "hsl(var(--5-secondary))", // Soft Sky
        '6-muted': "hsl(var(--6-muted))", // Steel Blue
        '7-info': "hsl(var(--7-info))", // Periwinkle
        '8-text': "hsl(var(--8-text))", // Eclipse
        '9-accent': "hsl(var(--9-accent))", // Vivid Red
        '10-soft-red': "hsl(var(--10-soft-red))", // Soft/Pastel Red
        '11-light': "hsl(var(--11-light))", // Pale Lavender
        '12-subtext': "hsl(var(--12-subtext))", // Obsidian Blue
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      fontFamily: {
        spartan: ["League Spartan", ...defaultTheme.fontFamily.sans]
      },

      screens: {
        'sm': '320px', // smartphones, portrait phones
        'md': '481px', // portrait e-readers, smaller tablets
        'lg': '641px', // portrait tablets, portrait iPad, landscape e-readers
        'xl': '961px', // tablet, landscape iPad, lo-res laptops and desktops
        '2xl': '1025px', // big landscape tablets, laptops, and desktops
        '3xl': '1281px', // hi-res laptops and desktops
        '4xl': '1441px', // large desktops and hi-res laptops
        '5xl': '1761', // hi-res laptops and desktops
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        icon1: "0 20px 20px 0",
        icon2: "20px 0 0 20px",
      },
      keyframes: {
        "accordion-down": {
          from: {height: 0},
          to: {height: "var(--radix-accordion-content-height)"},
        },
        "accordion-up": {
          from: {height: "var(--radix-accordion-content-height)"},
          to: {height: 0},
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('tailwindcss-animate'), // Add tailwindcss-animate here
  ]

}
