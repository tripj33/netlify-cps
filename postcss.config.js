const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
      require('postcss-import'),
    require(`tailwindcss`)(`./tailwind.config.js`),
     require('postcss-nested'),
    require(`autoprefixer`),
    purgecss({
      content: ['./**/*.html', './**/*.njk',]
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
