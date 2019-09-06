const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const tsImportPluginFactory = require('ts-import-plugin')
const autoprefixer = require('autoprefixer')
const pxtoviewport = require('postcss-px-to-viewport')

module.exports = {
  devServer: {
    // port: 9000,
    // host: 'h5.aiads-dev.com',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/': {
        target: 'https://api.aiads-dev.com',
        changeOrigin: true,
        ws: false,
        bypass(req) {
          if (req.headers.accept.indexOf('html') !== -1) {
            return '/index.html'
          }
        },
      }
    }
  },

  chainWebpack: config => {
    const isDev = process.env.NODE_ENV === 'development'
      // 开发|测试|仿真|生产：aiads-dev|qas|stg|prd
      ;[
        {
          env: 'dev',
          baseUrl: isDev ? '/' : 'https://h5.aiads-dev.com',
          ajaxBaseUrl: 'https://api.aiads-dev.com'
        },
        {
          env: 'qas',
          baseUrl: 'https://qas.aiads.com',
          ajaxBaseUrl: 'https://fapi.qas.aiads.com'
        },
        {
          env: 'stg',
          baseUrl: 'https://stg.aiads.com',
          ajaxBaseUrl: 'https://fapi.stg.aiads.com'
        },
        {
          env: 'prd',
          baseUrl: 'https://m.jydata.com',
          ajaxBaseUrl: 'https://api.jydata.com'
        }
      ].forEach(it => {
        const { env } = it
        config.plugin(env === 'dev' ? 'html' : `html-${env}`).use(HtmlWebpackPlugin, [
          {
            template: 'public/index.html',
            filename: isDev && env === 'dev' ? 'index.html' : `index-aiads-${env}.html`,
            minify: {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true,
              removeAttributeQuotes: true
            },
            VAR: it
          }
        ])
      })

    config.performance.hints(false)

    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        })
        return options
      })
  },

  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 750,
            // 该项仅在使用 Circle 组件时需要
            // 原因参见 https://github.com/youzan/vant/issues/1948
            selectorBlackList: ['van-circle__layer']
          })
        ]
      }
    }
  }
}
