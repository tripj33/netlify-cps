const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
      require('postcss-import'),
    require(`tailwindcss`)(`./tailwind.config.js`),
     require('postcss-nested'),
    require(`autoprefixer`),
    purgecss({
      content: ['./src/**/*.html', './src/**/*.njk',],
      css: ['./src/static/css']
    })
    // ...(process.env.NODE_ENV === "production"
    //   ? [
    //       require(`cssnano`)({
    //         preset: "default",
    //       }),
    //     ]
    //   : []),
  ],
};
