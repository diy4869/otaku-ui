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
ReactDOM.createRoot(container).render(<InputNumber></InputNumber>)
```
:::


## 设置步长

::: demo

```tsx
ReactDOM.createRoot(container).render(<InputNumber step={2}></InputNumber>)
```
:::

## 设置最大 最小值

::: demo

```tsx
ReactDOM.createRoot(container).render(<InputNumber max={10} min={1}></InputNumber>)
```
:::

## 支持小数

::: demo

```tsx
ReactDOM.createRoot(container).render(<InputNumber value={0.1} step={0.1}></InputNumber>)
```
:::

## 不同大小的计数器

::: demo

```tsx
ReactDOM.createRoot(container).render(<Grid count={3}>
    <GridItem>
      <InputNumber size="small"></InputNumber>
    </GridItem>
    <GridItem>
      <InputNumber size="middle"></InputNumber>
    </GridItem>
    <GridItem>
      <InputNumber size="large"></InputNumber>
    </GridItem>
  </Grid>)

```
:::

## 只读状态

::: demo

```tsx
ReactDOM.createRoot(container).render(<InputNumber readonly></InputNumber>)
```
:::


## 禁用状态

::: demo

```tsx
ReactDOM.createRoot(container).render(<InputNumber disabled></InputNumber>)
```
:::


## api

::: api
:::