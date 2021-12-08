/*
 * @Author: last order
 * @Date: 2019-08-18 20:40:13
 * @LastEditTime: 2020-02-27 12:33:49
 */
module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-typescript',
      {
        isTsx: true
      }
    ],
    '@babel/preset-react'
  ]
}
