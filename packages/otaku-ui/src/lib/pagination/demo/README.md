---
import:
  import { Pagination } from 'otaku-ui'
api:
  {
    module: ['Pagination']
  }
---



## 普通分页

::: demo
```tsx
ReactDOM.render(<Pagination total={200} current={2}></Pagination>, container)
```
:::

<br/>

## 自定义 slicePage

::: demo
```tsx
ReactDOM.render(<Pagination current={5} slicePage={3} total={200}></Pagination>, container)
```
:::


## 自定义 pageSize

::: demo
```tsx
ReactDOM.render(<Pagination slicePage={3} total={200} pageSize={15}></Pagination>, container)
```
:::


## 以圆形进行渲染

::: demo

```tsx
ReactDOM.render(<Pagination circle={true}></Pagination>, container)
```
:::

## 只有一页

::: demo

```tsx
ReactDOM.render(<Pagination></Pagination>, container)
```
:::

## API

::: api
:::