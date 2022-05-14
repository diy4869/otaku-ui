const path = require('path')
// const glob = require('glob')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

console.log(path.resolve(__dirname, '../src/lib/index.ts'))

// process.exit()

module.exports = {
  context: process.cwd(),
  mode: 'production',
  entry: {
    app: path.resolve(__dirname, '../src/index.ts'),
  },
  output: {
    clean: true,
    path: path.join(__dirname, '../dist'),
    filename: 'otaku-ui.min.js',
    library: {
      name: 'otaku-ui',
      type: 'umd',
      export: 'default',
    }
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
              // 'postcss-loader',
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
              name: '[name].[ext]',
              outputPath: 'assets/image'
            }
          }
        ]
      },
      {
        test: /\.(svg|ttf|eot|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'assets/fonts'
          }
        }]
      },
      // {
      //   test: /\.(mp4|mp3|webm|ogg|m3u8|mpd)$/,
      //   use: ['file-loader']
      // },
      // {
      //   test: /\.md$/,
      //   use: ['babel-loader', '@mdx-js/loader']
      // },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['swc-loader']
      }
    ]
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
        // sourceMap: env === 'development',
        terserOptions: {
          // cache: true,
          compress: {
            drop_debugger: true,
            drop_console: true
          }
        }
      })
    ]
  },
  externals: {
    React: 'react',
    ReactDOM: 'react-dom/client'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '~': path.resolve(__dirname, '../src/assets')
    },
    // false可以不带扩展
    enforceExtension: false,
    // 自动解析确定的扩展
    extensions: ['.js', '.ts', '.tsx']
  },
  devtool: 'source-map',
  plugins: [
    // new ProgressBarPlugin({
    //   callback: function () {
    //     console.log('打包完成')
    //   }
    // }),
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: 'otaku-ui.min.css',
    })
  ]
}