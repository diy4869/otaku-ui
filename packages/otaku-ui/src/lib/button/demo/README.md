---
import: 
  import { Button, Grid, GridItem } from 'otaku-ui'
---

[[toc]]

## Button 按钮

<br/>

::: demo

这个是按钮的描述

```tsx
<Grid>
  <GridItem>
    <Button>默认按钮</Button>
  </GridItem>
  <GridItem>
    <Button type="primary">主要按钮</Button>
  </GridItem>
  <GridItem>
    <Button type="warning">主要按钮</Button>
  </GridItem>
  <GridItem>
    <Button type="danger">主要按钮</Button>
  </GridItem>
</Grid>
```
:::

## Disabled 禁用

::: demo

这个是按钮的描述

```tsx
<Grid>
  <GridItem>
    <Button>默认按钮</Button>
  </GridItem>
  <GridItem>
    <Button type="primary" disabled>主要按钮</Button>
  </GridItem>
  <GridItem>
    <Button type="warning" disabled>主要按钮</Button>
  </GridItem>
  <GridItem>
    <Button type="danger" disabled>主要按钮</Button>
  </GridItem>
</Grid>

```
:::

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
