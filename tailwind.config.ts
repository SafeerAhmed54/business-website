import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
  // Optimize for production
  future: {
    hoverOnlyWhenSupported: true,
  },
  // Remove unused styles in production
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}',
    ],
    options: {
      safelist: [
        // Keep animation classes that might be added dynamically
        'animate-pulse',
        'animate-bounce',
        'animate-ping',
        'animate-spin',
        // Keep responsive classes
        'sm:',
        'md:',
        'lg:',
        'xl:',
        '2xl:',
      ],
    },
  },
};

export default config;