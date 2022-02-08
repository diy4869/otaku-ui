/*
 * @Author: last order
 * @Date: 2019-08-18 20:40:03
 * @LastEditTime: 2020-03-26 22:24:38
 */
const webpack = require('webpack')
const path = require('path')
const env = require('./env')
const webpackBaseConfig = require('./webpack.base.config')
const { merge } = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const address = require('address')
const portFinder = require('portfinder')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const smp = new SpeedMeasurePlugin()

module.exports = async () => {
  const devConfig = smp.wrap(merge(webpackBaseConfig, {
    devServer: {
      static: {
        directory: path.join(__dirname, 'src'),
      },
      // contentBase: path.join(__dirname, '/src'),
      // publicPath: '//',
      host: 'localhost',
      hot: true,
      compress: true,
      // noInfo: true,
      // overlay: {
      //   warnings: true,
      //   errors: false
      // },
      // quiet: true,
      // writeToDisk: true,
      historyApiFallback: true,
      client: {
        logging: "info",
        // Can be used only for `errors`/`warnings`
        //
        // overlay: {
        //   errors: true,
        //   warnings: true,
        // }
        overlay: false,
        progress: true,
      },
      // clientLogLevel: 'none',
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerPort: 18888
      }),
      new webpack.HotModuleReplacementPlugin(),

      // new FriendlyErrorsWebpackPlugin({
      //   compilationSuccessInfo: {
      //     messages: [
      //       ` 项目启动成功，地址是：\n
      //                         http://localhost:8080\n
      //       `
      //     ]
      //   }
      // })
    ]
  }))

  const port = await portFinder.getPortPromise({
    port: 8080,
    stopPort: 9000
  })

  devConfig.devServer.port = port
  // devConfig.plugins.push(
  //   new FriendlyErrorsWebpackPlugin({
  //     compilationSuccessInfo: {
  //       messages: [
  //         ` 项目启动成功，地址是：\n
  //                           http://localhost:${port}\n
  //                           http://${address.ip()}:${port}
  //         `
  //       ]
  //     }
  // })
  // )

  return devConfig
}
