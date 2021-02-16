module.exports = {
  purge: {
    mode: "all",
    content: ["./**/*.html"],
    options: {
      whitelist: [],
    },
  },
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
          'cps-orange': {
          DEFAULT: '#E05826',
          '50': '#FDF3EF',
          '100': '#F9E1D9',
          '200': '#F3BFAC',
          '300': '#ED9D7F',
          '400': '#E67A53',
          '500': '#E05826',
          '600': '#B9451A',
          '700': '#8C3414',
          '800': '#5F240E',
          '900': '#331307'
        },
        
        'cps-blue': {
            DEFAULT: '#0064c2',
            '50': '#82cbed',
            '100': '#75c7f0',
            '200': '#5fbcf2',
            '300': '#3dabf5',
            '400': '#0694f9',
            '500': '#007be0',
            '600': '#0064c2',
            '700': '#004f9e',
            '800': '#004594',
            '900': '#003e8f',
        },

      },
    },
  },
  variants: {},
  plugins: [
      require("@tailwindcss/typography"),
        require('tailwindcss-animatecss')({
                classes: ['animate__animated', 'animate__fadeIn', 'animate__bounceIn', 'animate__lightSpeedOut'],
                settings: {
                animatedSpeed: 1000,
                heartBeatSpeed: 1000,
                hingeSpeed: 2000,
                bounceInSpeed: 750,
                bounceOutSpeed: 750,
                animationDelaySpeed: 1000
                },
                variants: ['responsive', 'hover', 'reduced-motion'],
            }),
        ],
};
