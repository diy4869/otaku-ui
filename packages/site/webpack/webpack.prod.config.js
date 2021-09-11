/*
 * @Author: last order
 * @Date: 2019-08-18 20:40:03
 * @LastEditTime: 2020-04-12 19:48:35
 */
const webpack = require('webpack')
const env = require('./env')
const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const OptimizationCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const PrerenderSPAPlugin = require('prerender-spa-plugin')
// const smp = new SpeedMeasurePlugin()

const prodConfig = merge(webpackBaseConfig, {
  optimization: {
    usedExports: true,
    sideEffects: true,
    // 最小化打包
    minimize: true,
    moduleIds: 'named',
    splitChunks: {
      chunks: 'all',
      // minSize: 0, // 生产块的最小大小
      // maxSize: 0,
      // name: true,
      cacheGroups: {
        // styles: {
        //   name: 'styles',
        //   type: 'css/mini-extract',
        //   chunks: 'all',
        //   enforce: true
        // }
        // defaultVendors: {
        //   name: 'vendor',
        //   chunks: 'async',
        //   minChunks: 1,
        //   test: /[\\/]node_modules[\\/]/
        // },

      }
    },
    minimizer: [
      new CssMinimizerPlugin({
        cache: true
      }),
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
  // 长缓存
  // cache: {
  //   type: 'filesystem',
  //   buildDependencies: {
  //     config: [__dirname]
  //   }
  // },
  stats: {
    modules: false,
    source: false
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env)
    }),
    // 压缩css
    new OptimizationCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new ProgressBarPlugin({
      callback: function () {
        console.log('打包完成')
        return null
      }
    })
  ]
})

if (process.env.NODE_ENV === 'development') {
  prodConfig.plugins.push(
    new BundleAnalyzerPlugin()
  )
}

module.exports = prodConfig
