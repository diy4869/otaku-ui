# OTAKU-UI

该项目是基于` React Hooks、Typescript、webpack `来实现的一个` UI库 `，目前依然属于不成熟状态，不适合生产环境。

## 项目启动

### 1.1 全局安装lerna
```npm install -g lerna```
### 1.2 安装依赖
```lerna bootstrap```
### 1.3 启动
```cd packages/site```， 执行```npm run dev```会自动打开`http://localhost:8080/`页面

## otaku-cli

先后执行 ```cd packages/otaku-ui```、`npm link` 即可，就可以在命令行使用` otaku-cli `了

### 一些命令

- create xxx  将会在` packages/otaku-ui/src/lib `目录下创建一个组件
- publish 用于更新文档网站

```bash
Options:
  -V --version            查看当前版本
  -h, --help              查看帮助

Commands:
  create <componentName>  创建组件
  publish                 更新文档网站
```

## 浏览器支持

| [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/08095282566ac4e0fd98f89aed934b65.png~tplv-uwbnlip3yd-png.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/> Edge Chromium | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/40ad73571879dd8d9fd3fd524e0e45a4.png~tplv-uwbnlip3yd-png.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/4f59d35f6d6837b042c8badd95871b1d.png~tplv-uwbnlip3yd-png.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/eee2667f837a9c2ed531805850bf43ec.png~tplv-uwbnlip3yd-png.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari |
| --------- | --------- | --------- | --------- |
| Edge| last 2 versions| last 2 versions| last 2 versions|