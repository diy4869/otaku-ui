## 基本说明

::: desc
### 一些基本规范
- stylelint
- eslint
- commitlint 

  基于 [angular commit 规范](https://www.jianshu.com/p/c7e40dab5b05) 实现，或者采用```git cz``` or ``` npm run commit``` 提交。

### 单元测试
目前没这玩意。


### 说明

该组件库基于```react hooks、ts、node（一些命令，脚本）、webpack```而实现的，所以贡献者需要具备以上能力，不会请参考各个官网进行学习。


:::


## 拉取代码

```bash
git clone https://github.com/xxxx.git
```
## 目录说明

```bash
├── README.md
├── package-lock.json
├── package.json
├── prettier.config.js # prettier 配置文件
├── scripts # node 相关
│   ├── command
│   │   └── create.js
│   ├── index.js
│   ├── question
│   │   └── create.js
│   ├── template
│   │   ├── component.art
│   │   └── style.scss
│   └── utils
│       ├── fs.js
│       └── index.js
├── src # 组件库组件相关
│   ├── hooks 
│   │   ├── index.ts
│   │   ├── useCalendar.ts
│   │   ├── usePagination.ts
│   │   └── useToday.ts
│   ├── index.ts
│   ├── lib # 各个组件
│   │   ├── button
│   │   │   ├── button.tsx # 组件
│   │   │   ├── demo 
│   │   │   │   └── README.md # 需要渲染的文档
│   │   │   └── style.scss # 组件的样式
│   │   ├── grid
│   │   │   ├── demo
│   │   │   │   └── README.md
│   │   │   ├── grid.tsx
│   │   └── └── style.scss
│   ├── style # 全局样式
│   │   ├── reset.scss
│   │   └── var.scss
│   └── utils # 内置工具函数
│       ├── index.ts
│       └── telport.ts
├── stylelint.config.js # stylelint 配置文件
└── tsconfig.json
```
