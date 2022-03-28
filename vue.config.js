module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/_variables.scss";
          @import "@/scss/_global.scss";
          @import "@/scss/_var-binding.scss";
          @import "@/scss/_scroll.scss";
        `
      }
    }
  }
}
