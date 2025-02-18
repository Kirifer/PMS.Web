/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/html/utils/withMT";

module.exports = withMT({
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-photo': "url('/images/bg-image.jpg')",
      },
    },
  },
  plugins: [require('tailwindcss-animated')],
});