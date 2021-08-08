/*
 * @Author: last order
 * @Date: 2020-03-28 10:16:51
 * @LastEditTime: 2020-04-12 20:50:24
 */
const path = require('path')
const resolvePath = dir => {
  return path.join(__dirname, dir)
}

// 配置入口文件
module.exports = {
  pages: {
    index: {
      entry: resolvePath('entry/index.tsx'),
      template: resolvePath('page/index.html'),
      filename: 'index.html',
      title: '暂时还没想到叫啥，反正先这样'
    },
    user: {
      entry: resolvePath('entry/user.tsx'),
      template: resolvePath('page/user.html'),
      filename: 'user.html',
      title: 'user'
    }
  }
}
