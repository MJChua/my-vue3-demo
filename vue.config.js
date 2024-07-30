const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    port: 9911
  },
  css: {
    loaderOptions: {
      stylus: {
        import: [
          path.resolve(__dirname, 'src/assets/styles/theme.styl'),
          path.resolve(__dirname, 'src/assets/styles/var/index.styl')
        ]
      }
    }
  }
})
