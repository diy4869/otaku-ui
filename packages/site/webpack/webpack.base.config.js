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
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// const MonacoWebpackPlugin = require('monaco-editor-esm-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

// process.exit()

const options = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: 3,
      targets: {
        node: 'current',
        chrome: '59'
      }
    }],
    '@babel/preset-react'
  ],
  plugins: ['@babel/plugin-transform-runtime']
}

const baseConfig = {
  context: process.cwd(),
  mode: env,
  entry: {
    app: './src/index.tsx',
    'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
		'json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
		'css.worker': 'monaco-editor/esm/vs/language/css/css.worker',
		'html.worker': 'monaco-editor/esm/vs/language/html/html.worker',
		'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker'
  },
  output: {
    globalObject: 'self',
    path: path.join(__dirname, '../dist/docs'),
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
        test: /\.(png|jpg|gif|webp|jfif)$/i,
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
        use: [{
          loader: 'babel-loader',
          // options
        },  path.resolve(__dirname, '../webpack/loader/index.js')]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }, 'eslint-loader']
      },

      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['swc-loader']
      },
      // {
      //   test: /\.worker\.js$/,
      //   use: { loader: "worker-loader" },
      // },
      //  {
      //    test: /\.js$/,
      //    enforce: 'pre',
      //    include: /node_modules[\\\/]monaco-editor[\\\/]esm/,
      //    use: MonacoWebpackPlugin.loader
      //  }
    ]
  },

  resolve: {
    alias: {
      'site-component': path.resolve(__dirname, '../src/components'),
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
  devtool: env === 'development' ? 'source-map' : false,
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': JSON.stringify(env)
    // }),
    new MonacoWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'otaku-ui',
      filename: 'index.html',
      template: path.resolve(__dirname, '../page/index.html'),
      inject: true,
      minify: true
    }),
    // new ProgressBarPlugin({
    //   callback: function () {
    //     console.log('打包完成')
    //   }
    // }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash].css',
      chunkFilename: 'css/[name]_[chunkhash].css'
    })
  ]
}

module.exports = baseConfig
