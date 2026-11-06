import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#090A0B',
        cyan: '#02D2E3',
        paper: '#F7FAFB',
      },
      fontFamily: {
        display: ['var(--font-oswald)'],
        sans: ['var(--font-space)'],
      },
    },
  },
  plugins: [],
};

export default config;
