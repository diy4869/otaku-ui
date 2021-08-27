/*
 * @Author: last order
 * @Date: 2019-08-18 20:40:03
 * @LastEditTime: 2020-04-25 17:30:09
 */
const path = require('path')
// const glob = require('glob')
const env = require('./env')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const PurgecssPlugin = require('purgecss-webpack-plugin')
const userWebpackConfig = require('../src/project.config')
const theme = require('../src/config/theme')

const multiplePage = {
  base () {
    const [pages] = Object.keys(userWebpackConfig)
    const pageKey = Object.keys(userWebpackConfig[pages])

    return {
      pageKey,
      pages
    }
  },
  entry () {
    const { pages, pageKey } = this.base()
    const obj = {}

    pageKey.forEach(page => {
      const template = userWebpackConfig[pages][page]
      obj[page] = template.entry
    })

    console.log(obj)
    return obj
  },
  page () {
    const { pages, pageKey } = this.base()
    const arr = []
    pageKey.forEach(page => {
      const config = userWebpackConfig[pages][page]
      const template = new HtmlWebpackPlugin({
        title: config.title,
        filename: config.filename,
        template: config.template,
        inject: true,
        minify: true,
        chunks: [page]
      })

      arr.push(template)
    })

    return arr
  }
}

const baseConfig = {
  // context: process.cwd(),
  mode: env,
  entry: multiplePage.entry() ? multiplePage.entry() : './src/index.tsx',
  output: {
    path: path.join(__dirname, '../server'),
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      }
    ]
  },
  resolve: {
    alias: {
      ReactDOM: '@hot-loader/dom',
      '@': path.resolve(__dirname, '../src'),
      '~': path.resolve(__dirname, '../src/assets')
    },
    // false可以不带扩展
    enforceExtension: false,
    // 自动解析确定的扩展
    extensions: ['.js', '.ts', '.tsx']
  },
  target: 'node',
  devtool: env === 'development' ? 'source-map' : 'cheap-module-source-map',
  plugins: [
    ...multiplePage.page()
  ]
}

module.exports = baseConfig
