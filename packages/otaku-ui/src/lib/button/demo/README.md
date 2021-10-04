---
import: 
  import { Button, Grid, GridItem } from 'otaku-ui'
---

[[toc]]

## Button 按钮

::: demo

这个是按钮的描述

```tsx
<Grid count={5}>
  <GridItem>
    <Button>默认按钮</Button>
  </GridItem>
  <GridItem>
    <Button type="primary">主要按钮</Button>
  </GridItem>
  <GridItem>
    <Button type="success">成功按钮</Button>
  </GridItem>
  <GridItem>
    <Button type="warning">警告按钮</Button>
  </GridItem>
  <GridItem>
    <Button type="danger">错误按钮</Button>
  </GridItem>
</Grid>
```
:::

## 圆角按钮


::: demo

这个是按钮的描述

```tsx
  <Button type="primary" shape="round">主要按钮</Button>
```
:::

## Disabled 禁用

::: demo

这个是按钮的描述

```tsx
<Grid count={5}>
  <GridItem>
    <Button disabled>默认按钮</Button>
  </GridItem>
  <GridItem>
    <Button type="primary" disabled>主要按钮</Button>
  </GridItem>
  <GridItem>
    <Button type="success" disabled>成功按钮</Button>
  </GridItem>
  <GridItem>
    <Button type="warning" disabled>警告按钮</Button>
  </GridItem>
  <GridItem>
    <Button type="danger" disabled>错误按钮</Button>
  </GridItem>
</Grid>

```
:::

## loading 加载状态

::: demo

这个是按钮的描述

```tsx
<Grid count={5}>
  <GridItem>
    <Button loading>默认按钮</Button>
  </GridItem>
  <GridItem>
    <Button type="primary" loading>主要按钮</Button>
  </GridItem>
  <GridItem>
    <Button type="success" loading>成功按钮</Button>
  </GridItem>
  <GridItem>
    <Button type="warning" loading>警告按钮</Button>
  </GridItem>
  <GridItem>
    <Button type="danger" loading>错误按钮</Button>
  </GridItem>
</Grid>

```
:::

## 幽灵按钮

::: demo

这个是按钮的描述

```tsx
<Grid count={5}>
  <GridItem>
    <Button ghost>默认按钮</Button>
  </GridItem>
  <GridItem>
    <Button type="primary" ghost>主要按钮</Button>
  </GridItem>
  <GridItem>
    <Button type="success" ghost>成功按钮</Button>
  </GridItem>
  <GridItem>
    <Button type="warning" ghost>警告按钮</Button>
  </GridItem>
  <GridItem>
    <Button type="danger" ghost>错误按钮</Button>
  </GridItem>
</Grid>

```
:::

## 不同大小的按钮

::: demo

这个是按钮的描述

```tsx
{
  (['primary']).map(type => {
    return (
      <Grid count={3} gap={10} >
        {
          (['small', 'middle', 'large' ]).map(size => {
            return (
              <GridItem>
                <Button type={type} size={size}>主要按钮</Button>
              </GridItem>
            )
          })
        }
      </Grid>
    )
  })
}

```
:::

## 自定义按钮颜色

::: demo

这个是按钮的描述

```tsx
<Button type="danger" bgcolor="red">按钮</Button>
```
:::

## 具有 icon 的按钮

::: demo

这个是按钮的描述

```tsx
<Grid count={5}>
  <GridItem>
    <Button type="primary" iconDirection="left" icon="otaku-icon-search-line">左边 icon 的按钮</Button>
  </GridItem>
  <GridItem>
    <Button type="primary" iconDirection="right" icon="otaku-icon-search-line">右边 icon 的按钮</Button>
  </GridItem>
</Grid>

```
:::


## 不同形状的按钮

::: demo

这个是按钮的描述

```tsx
<Grid count={5}>
  <GridItem>
    <Button type="primary" shape="round">圆角按钮</Button>
  </GridItem>
  <GridItem>
    <Button type="primary" shape="circle" icon="otaku-icon-search-line"></Button>
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
  target?: '_blank' | '_self'
  shape?: 'round' | 'circle'
  type?: 'default' | 'text' | 'primary' | 'success' | 'warning' | 'danger' | 'link'
  iconDirection?: 'left' | 'right'  // icon方向
  size?: 'small' | 'middle' |'large' // 大小
  onClick?:() => void
}

```
