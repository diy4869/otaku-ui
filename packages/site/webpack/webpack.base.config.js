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

console.log(path.resolve(__dirname, '../webpack/loader/index.js'))
console.log(path.resolve(__dirname, '../../otaku-ui/src/index.ts'))
// process.exit()

const baseConfig = {
  context: process.cwd(),
  mode: env,
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(sass|scss)$/,
        oneOf: [
          {
            test: /\.(module.scss)/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  esModule: true,
                  modules: {
                    localIdentName: '[local]--[hash:5]',
                    localIdentContext: path.resolve(__dirname, 'src')
                  }
                }
              },
              'postcss-loader',
              'sass-loader'
            ]
          },
          {
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  esModule: true
                }
              },
              'postcss-loader',
              'sass-loader'
            ]
          }
        ],
      },
      {
        test: /\.(png|jpg|gif|webp)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: 'file-loader',
              limit: 4096,
              quality: 50,
              name: '[name].[hash:8].[ext]',
              outputPath: 'assets'
            }
          }
        ]
      },
      {
        test: /\.(svg|ttf|eot|woff|woff2)$/,
        use: ['file-loader']
      },
      {
        test: /\.(mp4|mp3|webm|ogg|m3u8|mpd)$/,
        use: ['file-loader']
      },
      // {
      //   test: /\.md$/,
      //   use: ['babel-loader', '@mdx-js/loader']
      // },
      {
        test: /\.md$/,
        use: ['babel-loader', path.resolve(__dirname, '../webpack/loader/index.js')]
      },
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
      Block: path.resolve(__dirname, '../src/components/block/block.tsx'),
      CodeExample: path.resolve(__dirname, '../src/components/codeExample/codeExample.tsx'),
      ReactDOM: '@hot-loader/dom',
      '@docs': path.resolve(__dirname, '../docs'),
      '@': path.resolve(__dirname, '../src'),
      '~': path.resolve(__dirname, '../src/assets')
    },
    // false可以不带扩展
    enforceExtension: false,
    // 自动解析确定的扩展
    extensions: ['.js', '.ts', '.tsx']
  },
  target: 'web',
  devtool: env === 'development' ? 'source-map' : 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'otaku-ui',
      filename: 'index.html',
      template: path.resolve(__dirname, '../page/index.html'),
      inject: true,
      minify: true
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash].css',
      chunkFilename: 'css/[name]_[chunkhash].css'
    })
  ]
}

module.exports = baseConfig
