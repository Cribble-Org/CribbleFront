/** @type {import('tailwindcss').Config} */
// tailwind.config.js

import { fontFamily as _fontFamily } from 'tailwindcss/defaultTheme'; // Import defaultTheme

export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    fontFamily: {
      sora: ['"Sora"', ..._fontFamily.sans], // Add Sora font with fallback to sans-serif
      jakartaSans: ['"Plus Jakarta Sans"']
    },
  },
};
export const plugins = [];

