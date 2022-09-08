---
import: 
  import { Button, Space, Grid, GridItem, Icon } from 'otaku-ui'
api:
  {
    module: ['Button']
  }
---



## Button 按钮

::: demo

这个是按钮的描述

```tsx
ReactDOM.createRoot(container).render(<Space>
    <Button>默认按钮</Button>
    <Button type="primary">主要按钮</Button>
    <Button type="success">成功按钮</Button>
    <Button type="warning">警告按钮</Button>
    <Button type="danger">错误按钮</Button>
  </Space>)
```
:::

## 圆角按钮


::: demo

这个是按钮的描述

```tsx
ReactDOM.createRoot(container).render(<Button type="primary" shape="round">主要按钮</Button>)
```
:::

## Disabled 禁用

::: demo

这个是按钮的描述

```tsx
ReactDOM.createRoot(container).render(<Grid count={5}>
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
  </Grid>)
```
:::

## loading 加载状态

::: demo

这个是按钮的描述

```tsx
ReactDOM.createRoot(container).render(<Grid count={5}>
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
  </Grid>)
```
:::

## 幽灵按钮

::: demo

这个是按钮的描述

```tsx
ReactDOM.createRoot(container).render(<Grid count={5}>
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
  </Grid>)
```
:::

## 不同大小的按钮

::: demo

这个是按钮的描述

```tsx
function Demo () {
  return (
    <div>
      {['primary'].map((type, typeIndex) => {
        return (
          <Grid count={3} gap={10} key={typeIndex}>
            {['small', 'middle', 'large'].map((size, sizeIndex) => {
              return (
                <GridItem key={sizeIndex}>
                  <Button type={type} size={size}>
                    主要按钮
                  </Button>
                </GridItem>
              )
            })}
          </Grid>
        )
      })}
    </div>
  )
}

ReactDOM.createRoot(container).render(<Demo/>)
```
:::

## 自定义按钮颜色

::: demo

这个是按钮的描述

```tsx
ReactDOM.createRoot(container).render(<Button type="danger" bgcolor="red">按钮</Button>)
```
:::

## 具有 icon 的按钮

::: demo

这个是按钮的描述

```tsx
ReactDOM.createRoot(container).render(<Grid count={3}>
    <GridItem>
      <Button type="primary" iconDirection="left" icon={<Icon name="search-line"></Icon>}>左边 icon 的按钮</Button>
    </GridItem>
    <GridItem>
      <Button type="primary" iconDirection="right" icon={<Icon name="search-line"></Icon>}>右边 icon 的按钮</Button>
    </GridItem>
  </Grid>)
```
:::


## 不同形状的按钮

::: demo

这个是按钮的描述

```tsx
ReactDOM.createRoot(container).render(<Grid count={5}>
    <GridItem>
      <Button type="primary" shape="round">圆角按钮</Button>
    </GridItem>
    <GridItem>
      <Button type="primary" shape="circle" icon={<Icon name="search-line"></Icon>}></Button>
    </GridItem>
  </Grid>)
```
:::


## API

::: api
:::
