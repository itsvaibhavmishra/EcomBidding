/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

const backfaceVisibility = plugin(function ({ addUtilities }) {
  addUtilities({
    '.backface-visible': {
      'backface-visibility': 'visible',
    },
    '.backface-hidden': {
      'backface-visibility': 'hidden',
    },
  });
});

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primarycolor: '#06B6D4',
      },
    },
  },
  plugins: [backfaceVisibility],
};
