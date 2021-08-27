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

module.exports = async () => {
  const devConfig = merge(webpackBaseConfig, {
    devServer: {
      contentBase: path.join(__dirname, '/src'),
      host: '0.0.0.0',
      hot: true,
      compress: true,
      noInfo: true,
      overlay: {
        warnings: true,
        errors: false
      },
      quiet: true,
      useLocalIp: true,
      historyApiFallback: true,
      clientLogLevel: 'none'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(env)
      })
      // new FriendlyErrorsWebpackPlugin({
      //   compilationSuccessInfo: {
      //     messages: [
      //       ` 项目启动成功，地址是：\n
      //                         http://localhost:8000\n
      //       `
      //     ]
      //   }
      // })
    ]
  })

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
