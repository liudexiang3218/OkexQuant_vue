const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  productionSourceMap: process.env.NODE_ENV !== 'production',
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new BundleAnalyzerPlugin()
        ]
      }
    }
  }
}
