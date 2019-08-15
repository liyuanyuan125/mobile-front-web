const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');

const resolve = dir => path.join(__dirname, 'src', dir)

module.exports = {
  lintOnSave: false,

  devServer: {
    host: 'h5.aiads-dev.com',
    disableHostCheck: true,
  },

  chainWebpack: config => {
    const isDev = process.env.NODE_ENV === 'development'
    // 开发|测试|仿真|生产：aiads-dev|qas|stg|prd
    ; [
      {
        env: 'dev',
        baseUrl: isDev ? '/' : 'https://aiads-dev.com',
        ajaxBaseUrl: 'https://fapi.aiads-dev.com',
      },
      {
        env: 'qas',
        baseUrl: 'https://qas.aiads.com',
        ajaxBaseUrl: 'https://fapi.qas.aiads.com',
      },
      {
        env: 'stg',
        baseUrl: 'https://stg.aiads.com',
        ajaxBaseUrl: 'https://fapi.stg.aiads.com',
      },
      {
        env: 'prd',
        baseUrl: 'https://jydata.com',
        ajaxBaseUrl: 'https://fapi.jydata.com',
      },
    ].forEach(it => {
      const { env } = it
      config.plugin(env === 'dev' ? 'html' : `html-${env}`).use(HtmlWebpackPlugin, [{
        template: 'public/index.html',
        filename: isDev && env === 'dev'
          ? 'index.html'
          : `index-aiads-${env}.html`,
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
          removeAttributeQuotes: true,
        },
        VAR: it,
      }])
    })

    config.performance.hints(false)
  }
}
