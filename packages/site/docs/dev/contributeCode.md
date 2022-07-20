## 基本说明

::: desc
### 一些基本规范

- `stylelint`
- `eslint`
- `commitlint`

基于 [angular commit 规范](https://www.jianshu.com/p/c7e40dab5b05) 实现，或者采用```git cz``` or ``` npm run commit``` 提交。

### 单元测试
目前没这玩意。


### 说明

该组件库基于```react hooks、ts、node（一些命令，脚本）、webpack```而实现的，所以贡献者需要具备以上能力，不会请参考各个官网进行学习。

:::


## 拉取代码

```bash
git clone https://github.com/diy4869/oaku-ui.git
```

## 如何运行该项目


::: desc
- `clone` 当前项目
- 执行 `npm install lerna -g`
- 执行 `lerna bootstrap` 或者`yarn install` 
- 然后 `cd packages/site`
- 执行 `npm run dev`

:::

## 创建一个组件

::: desc

- 通过 `otaku-cli create xxx` 创建一个组件
- 在 `site/src/router/index.ts` 添加你的组件路径
- 然后你就可以在网站看到你的组件了

:::

## 目录说明

```bash
# 目录树生成命令
# tree -I "node_modules|dist"

├── CHANGELOG.md
├── README.md
├── babel.config.json
├── commitlint.config.js
├── index.html
├── lerna.json
├── package.json
├── packages
│   ├── otaku-cli # 组件库相关 cli，用于提供一些快捷命令
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   └── src
│   │       ├── command
│   │       │   ├── create.js
│   │       │   └── publish.js
│   │       ├── index.js
│   │       ├── question
│   │       │   └── create.js
│   │       ├── template
│   │       │   ├── component.art
│   │       │   ├── demo
│   │       │   │   └── README.md
│   │       │   └── style.scss
│   │       └── utils
│   │           ├── fs.js
│   │           └── index.js
│   ├── otaku-types # 组件库类型文件
│   │   ├── index.ts
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── array.ts
│   │   │   ├── math.ts
│   │   │   ├── object.ts
│   │   │   └── string.ts
│   │   └── tsconfig.json
│   ├── otaku-ui # 组件库本体
│   │   ├── README.md
│   │   ├── babel.config.js
│   │   ├── build
│   │   │   └── webpack.config.js
│   │   ├── jest.config.ts
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── prettier.config.js
│   │   ├── src
│   │   │   ├── directive
│   │   │   │   └── vShow.tsx
│   │   │   ├── fonts
│   │   │   │   ├── iconfont.css
│   │   │   │   ├── iconfont.js
│   │   │   │   ├── iconfont.json
│   │   │   │   ├── iconfont.ttf
│   │   │   │   ├── iconfont.woff
│   │   │   │   └── iconfont.woff2
│   │   │   ├── hooks
│   │   │   │   ├── index.ts
│   │   │   │   ├── useCalendar.ts
│   │   │   │   ├── usePagination.ts
│   │   │   │   └── useToday.ts
│   │   │   ├── index.ts
│   │   │   ├── lib
│   │   │   │   ├── tree # 组件
│   │   │   │   │   ├── demo # 组件文档
│   │   │   │   │   │   └── README.md
│   │   │   │   │   ├── store
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── node.ts
│   │   │   │   │   ├── style.scss
│   │   │   │   │   └── tree.tsx # 一般以组件名称 或者 index.ts 命名
│   │   │   │   └── upload
│   │   │   │       ├── demo
│   │   │   │       │   └── README.md
│   │   │   │       ├── http.ts
│   │   │   │       ├── style.scss
│   │   │   │       └── upload.tsx
│   │   │   ├── style
│   │   │   │   ├── reset.scss
│   │   │   │   └── var.scss
│   │   │   ├── types
│   │   │   │   └── index.d.ts
│   │   │   └── utils
│   │   │       └── index.ts
│   │   ├── stylelint.config.js
│   │   ├── test
│   │   │   └── index.test.ts
│   │   ├── tsconfig.json
│   │   └── yarn-error.log
│   └── site # 组件库文档
│       ├── babel.config.js
│       ├── docs
│       │   └── dev
│       │       ├── CodeReview.md
│       │       ├── contributeCode.md
│       │       ├── guide.md
│       │       ├── hooks.md
│       │       ├── install.md
│       │       ├── introduce.md
│       │       ├── roadmap.md
│       │       └── test.md
│       │
│       ├── package-lock.json
│       ├── package.json
│       ├── page
│       │   └── index.html
│       ├── postcss.config.js
│       ├── scripts
│       │   └── generatorRouter.js
│       ├── site.config.js
│       ├── src
│       │   ├── App.module.scss
│       │   ├── App.tsx
│       │   ├── api
│       │   │   └── index.ts
│       │   ├── assets
│       │   │   ├── fonts
│       │   │   │   ├── iconfont.css
│       │   │   │   ├── iconfont.js
│       │   │   │   ├── iconfont.json
│       │   │   │   ├── iconfont.ttf
│       │   │   │   ├── iconfont.woff
│       │   │   │   └── iconfont.woff2
│       │   │   └── style
│       │   │       ├── normalize.css
│       │   │       ├── reset.scss
│       │   │       └── theme.scss
│       │   ├── components
│       │   │   ├── ErrorBoundary
│       │   │   │   └── ErrorBoundary.tsx
│       │   │   ├── api # 组件 api 渲染的容器
│       │   │   │   ├── api.tsx
│       │   │   │   └── style.scss
│       │   │   ├── block
│       │   │   │   ├── block.tsx
│       │   │   │   └── style.scss
│       │   │   ├── codeExample # 用于渲染组件的例子容器
│       │   │   │   ├── codeExample.tsx
│       │   │   │   └── style.scss
│       │   │   ├── description # 一些空白区域
│       │   │   │   ├── description.tsx
│       │   │   │   └── style.scss
│       │   │   ├── editor # 编辑器相关
│       │   │   │   ├── editor.tsx
│       │   │   │   └── style.scss
│       │   │   ├── notFound
│       │   │   │   └── notFound.tsx
│       │   │   └── sandbox
│       │   │       ├── sandbox.tsx
│       │   │       └── style.scss
│       │   ├── index.tsx
│       │   ├── router
│       │   │   └── index.ts
│       │   └── types
│       │       └── index.d.ts
│       ├── style
│       │   └── github-markdown-css
│       │       ├── github-markdown-dark.css
│       │       ├── github-markdown-light.css
│       │       ├── github-markdown.css
│       │       └── index.css
│       ├── tsconfig.json
│       └── webpack
│           ├── env.js
│           ├── loader # 用于解析 md 文件，用来生成文档，同时例子、api 渲染的实现都可以在这找到，
                       # 如果你好奇 组件类型生成原理的话，也可以研究下这个
│           │   ├── compiler
│           │   │   └── index.js
│           │   ├── container
│           │   │   ├── api.js
│           │   │   └── demo.js
│           │   ├── editor
│           │   │   └── index.js
│           │   ├── generator
│           │   │   ├── index.js
│           │   │   ├── test.tsx
│           │   │   ├── type.ts
│           │   │   ├── type2.ts
│           │   │   └── type3.ts
│           │   ├── index.js
│           │   ├── md-loader.js
│           │   ├── test.js
│           │   ├── test.md
│           │   ├── transform
│           │   │   ├── core.js
│           │   │   └── index.js
│           │   └── utils.js
│           ├── webpack.base.config.js
│           ├── webpack.dev.config.js
│           └── webpack.prod.config.js
├── test.js
├── test.jsx
├── test2.html
├── test2.js
├── tsconfig.json
└── yarn.lock
```
