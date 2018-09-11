import constant from './constant/public.js'
console.log(constant.BASE_URL)
const nodeExternals = require('webpack-node-externals')
const path = require('path')
module.exports = {
  mode: 'spa',
  head: {
    htmlAttrs: {
      lang: 'zh-cn'
      // manifest: '/manifest.appcache'
    },
    title: '懒虫动动兼职平台',
    // titleTemplate: '%s | 懒虫动动兼职平台',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '懒虫动动兼职平台'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      // {
      //   rel: 'stylesheet',
      //   href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      // },
      // {
      //   rel: 'stylesheet',
      //   href: '//at.alicdn.com/t/font_755131_c6lpo5bu19.css'
      // }
    ]
    // script: [{ src: '/error.js', type: 'text/javascript', body: true }]
  },
  render: {
    static: {
      maxAge: 0
    }
  },
  plugins: [
    '~/plugins/vuetify.js',
    '~/plugins/globalComponents.js',
    '~/plugins/filters.js',
    '~/plugins/svgicons.js',
    '~/plugins/Api.js',
    '~/plugins/mixins.js'
    // { src: '~/plugins/scrollto.js', ssr: false },
    // { src: '~/plugins/vue-amap.js', ssr: false }
  ],
  router: {
    middleware: 'auth'
    // mode: 'hash'
  },
  css: ['~/assets/style/app.styl', '~/assets/style/scss/app.scss'],
  modules: [['nuxt-sass-resources-loader', ['@/assets/style/scss/_variables.scss']]],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#8bc271' },
  // loading: false,
  /*
  ** Build configuration
  */
  build: {
    babel: {
      presets: [['vue-app', { useBuiltIns: true, targets: { ios_saf: 9, uglify: true } }]],
      plugins: [
        [
          'transform-imports',
          {
            vuetify: {
              transform: 'vuetify/es5/components/${member}',
              preventFullImport: true
            }
          }
        ]
      ]
    },
    vendor: [
      '~/plugins/vuetify.js',
      // '~/plugins/simpleSvg.js',
      '~/plugins/svgicons.js',
      // '~/plugins/scrollto.js',
      // '~/plugins/baidumap.js',
      '~/plugins/vue-amap.js',
      '~/assets/iconfont.css'
    ],
    // publicPath: constant.BASE_URL,
    // extractCSS: true,
    extractCSS: {
      allChunks: true
    },
    filenames: {
      css: 'common.[contenthash].css',
      manifest: 'manifest.[hash].js',
      vendor: 'common.[chunkhash].js',
      app: 'app.[chunkhash].js',
      chunk: '[name].[chunkhash].js'
    },
    cssSourceMap: false,
    /*
    ** Run ESLint on save
    */
    extend(config, ctx) {
      if (ctx.isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
      config.resolve.alias['@const'] = path.join(this.options.rootDir, 'constant')
      config.resolve.alias['@helper'] = path.join(this.options.rootDir, 'helper')
      config.resolve.alias['@api'] = path.join(this.options.rootDir, 'service/Api')
      config.resolve.alias['@pages'] = path.join(this.options.rootDir, 'pages')
      config.resolve.alias['@img'] = path.join(this.options.rootDir, 'static/img/')
      config.resolve.alias['@svg'] = path.join(this.options.rootDir, 'static/svg/')
      config.resolve.alias['@mixins'] = path.join(this.options.rootDir, 'mixins')

      const svgRule = config.module.rules.find(rule => {
        if (rule.test.test('a.svg')) {
          return rule.use.find(loader => loader.loader === 'url-loader')
        }
      })
      svgRule.test = /(\.(png|jpe?g|gif)$)|(^(?!.*\.icon\.svg$).*\.svg$)/
      // console.log(svgRule)

      config.module.rules.push({
        test: /\.icon\.svg$/,
        loader: 'vue-svg-loader'
      })

      // const urlLoader = config.module.rules.find(
      //   rule => rule.loader === 'url-loader'
      // )
      // urlLoader.test =/\.(png|jpe?g|gif)$/

      // config.module.rules.push({
      //   test: /\.svg$/,
      //   loader: 'svg-inline-loader',
      //   exclude: /node_modules/
      // })
    }
  }
}
