module.exports = (ctx) => ({
  map: ctx.options.map,
  plugins: [
    require('postcss-nesting'),
  ]
});
