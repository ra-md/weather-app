module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/sass/_variables.sass"',
      },
    },
  },
};
