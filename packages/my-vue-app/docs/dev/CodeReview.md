## 声明

::: desc
- 组件基于`eslint-config-standard` 标准。
- commit 基于 `commitlint` 所有 `commit `在提交的时候，会经过 `husky` 检查
- style 基于`stylelint-config-standard` 标准

::: 

## 基本规范

::: desc
- 单文件不能超过 200 行
- 所有组件`Props` 必须以 `xxxProps` 形式出现
- Props 声明顺序：必填、可选、具有默认值的、事件
- 组件 Props 单行不能超过 3 个，多的必须换行
- 如果组件内 Props 有默认值，则需放到最后
- 如果函数内有返回值，则` return ` 前必须空一行，除非该函数只有一行
- `eslint` 零`error、warning`

:::

### 例子

```ts
function getQuery (string): void {
    // ... 其他逻辑
    
    return result
}

```

- import 导入规范
```ts

import react from 'react' // node_modules
import components from '@/components/xxx' // alias 别名
import { a as b } from './xxx'
import type { A, B, C } from './xxx'

import './style' // 相对路径

```

## commit 规范

::: desc

这块应遵循 `angular commit `规范

- feat 新功能
- build 构建相关
- ci 自动化
- style 样式
- chore 日常开发
- fix 问题修复
- revert 回滚
- release 新版本，需要打 `tag`
- refactor 重构
- docs 文档
- test 测试
::: 

```bash
# 括号内为影响的范围
git commit -m "chore（date-picker、select）：当前修改的内容"
```


## 其他规范

::: desc
 - 样式应采用` BEM ` 规范
:::
