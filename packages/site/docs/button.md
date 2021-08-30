---
import: 
  import { Button } from 'bangumi-ui'
---

[[toc]]

## Button 按钮

<br/>


::: demo

这个是按钮的描述

```tsx
<Button type="primary">主要按钮</Button>
<Button type="warning">警告按钮</Button>
<Button type="danger">危险按钮</Button>
```
:::

## Disabled 禁用


## API

```ts
export interface ButtonProps {
  disabled?: boolean // 禁用
  loading?: boolean // 加载
  ghost?: boolean // 幽灵按钮
  icon?: string // icon
  bgcolor?: string // 背景色
  children?: React.ReactNode
  type?: 'default' | 'text' | 'primary' | 'success' | 'warning' | 'danger' // 按钮类型
  iconDirection?: 'left' | 'right'  // icon方向
  size?: 'small' | 'middle' |'large' // 大小
  onClick?:() => void
}

```
