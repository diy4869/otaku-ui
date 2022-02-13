---
import:
  import { InputNumber, Grid, GridItem } from 'otaku-ui'
api:
  {
    module: ['InputNumber']
  }
---



## InputNumber 计数器

::: demo

```tsx
ReactDOM.render(<InputNumber></InputNumber>, container)
```
:::


## 设置步长

::: demo

```tsx
ReactDOM.render(<InputNumber step={2}></InputNumber>, container)
```
:::

## 设置最大 最小值

::: demo

```tsx
ReactDOM.render(<InputNumber max={10} min={1}></InputNumber>, container)
```
:::

## 支持小数

::: demo

```tsx
ReactDOM.render(<InputNumber value={0.1} step={0.1}></InputNumber>, container)
```
:::

## 不同大小的计数器

::: demo

```tsx
ReactDOM.render(
  <Grid count={3}>
    <GridItem>
      <InputNumber size="small"></InputNumber>
    </GridItem>
    <GridItem>
      <InputNumber size="middle"></InputNumber>
    </GridItem>
    <GridItem>
      <InputNumber size="large"></InputNumber>
    </GridItem>
  </Grid>,
  container
)

```
:::

## 只读状态

::: demo

```tsx
ReactDOM.render(<InputNumber readonly></InputNumber>, container)
```
:::


## 禁用状态

::: demo

```tsx
ReactDOM.render(<InputNumber disabled></InputNumber>, container)
```
:::


## api

::: api
:::