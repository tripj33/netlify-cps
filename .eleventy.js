const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");

const eleventyResponsivePicturePlugin = require("eleventy-plugin-responsive-picture");

const respimg = require("eleventy-plugin-sharp-respimg");



module.exports = function (eleventyConfig) {

  // JS Assets
  eleventyConfig.addPassthroughCopy({
    "./src/static/js/": "/static/js/",
  });

   eleventyConfig.addPassthroughCopy({
    "./src/services": "/services",
  });
  
    eleventyConfig.addPassthroughCopy({
    "./src/articles": "/articles",
  });
  

  // Alpine JS
  eleventyConfig.addPassthroughCopy({
    "./node_modules/alpinejs/dist/alpine.js": "/static/js/alpine.js",
  });

  // Animate.css
  eleventyConfig.addPassthroughCopy({
    "./node_modules/animate.css/animate.min.css": "./static/css/animate.css",
  });

    // Nunjucks Shortcode
  eleventyConfig.addNunjucksShortcode("srcset", function(src, transforms, sm, md, lg, xl, xxl) { 
      let comma = ""
      if(transforms != ""){
          let comma = ",";
      }
    return `
            src="https://res.cloudinary.com/chicagoland-plumbing/image/upload/f_webp,q_80${comma}${transforms}/${src}.webp" 
            srcset="https://res.cloudinary.com/chicagoland-plumbing/image/upload/f_webp,w_${sm},q_80${comma}${transforms}/${src}.webp ${sm}w, 
                    https://res.cloudinary.com/chicagoland-plumbing/image/upload/f_webp,w_${md},q_80${comma}${transforms}/${src}.webp ${md}w, 
                    https://res.cloudinary.com/chicagoland-plumbing/image/upload/f_webp,w_${lg},q_80${comma}${transforms}/${src}.webp ${lg}w, 
                    https://res.cloudinary.com/chicagoland-plumbing/image/upload/f_webp,w_${xl},q_80${comma}${transforms}/${src}.webp ${xl}w, 
                    https://res.cloudinary.com/chicagoland-plumbing/image/upload/f_webp,w_${xxl},q_80${comma}${transforms}/${src}.webp ${xxl}w"
            sizes="(min-width: 640px) ${sm}px,
                    (min-width: 768px) ${md}px,
                    (min-width: 1024px) ${lg}px,
                    (min-width: 1280px) ${xl}px,
                    (min-width: 1538px) ${xxl}px,
                    100vw"`;
   });


   
   
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // human readable date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });


  eleventyConfig.addPlugin(respimg);
  eleventyConfig.addPassthroughCopy("static/img");
  eleventyConfig.addPassthroughCopy("services");

// Responsive Images

eleventyConfig.addPlugin(eleventyResponsivePicturePlugin, {
  ratios: [2, 1],
  sources: [
    { media: "(min-width: 1024px)", size: 824 },
    { media: "(min-width: 768px)", size: 696 },
    { media: "(min-width: 420px)", size: 568 },
    { size: 348 },
  ],
  fallback: (src) => `${src}?w=1000`,
  resize: (src, size) => `${src}?w=${size}`,
});

  // Syntax Highlighting for Code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension("yaml", (contents) =>
    yaml.safeLoad(contents)
  );

  // Add Tailwind Output CSS as Watch Target
  eleventyConfig.addWatchTarget("./_tmp/static/css/style.css");

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    "./_tmp/static/css/style.css": "./static/css/style.css",
    "./src/admin/config.yml": "./admin/config.yml",
    "./node_modules/alpinejs/dist/alpine.js": "./static/js/alpine.js",
    "./node_modules/prismjs/themes/prism-tomorrow.css":
      "./static/css/prism-tomorrow.css",
  });

  // Copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy("./src/static/img");

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");

  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });

  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "njk",
  };
};
