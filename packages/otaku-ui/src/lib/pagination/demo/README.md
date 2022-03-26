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
ReactDOM.createRoot(container).render(<Pagination total={200} current={2}></Pagination>)
```
:::

<br/>

## 自定义 slicePage

::: demo
```tsx
ReactDOM.createRoot(container).render(<Pagination current={5} slicePage={3} total={200}></Pagination>)
```
:::


## 自定义 pageSize

::: demo
```tsx
ReactDOM.createRoot(container).render(<Pagination slicePage={3} total={200} pageSize={15}></Pagination>)
```
:::


## 以圆形进行渲染

::: demo

```tsx
ReactDOM.createRoot(container).render(<Pagination circle={true}></Pagination>)
```
:::

## 只有一页

::: demo

```tsx
ReactDOM.createRoot(container).render(<Pagination></Pagination>)
```
:::

## API

::: api
:::