const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    port: 9911,
    proxy: {
      '/api': {
        target: 'https://d4api.dev',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false)

      })
    ]
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
