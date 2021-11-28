---
import:
  import { Pagination } from 'otaku-ui'
---

[[toc]]

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

```tsx

export interface usePaginationProps {
  current?: number // 当前页
  total?: number // 总页数
  pageSize?: number // 每页条数 默认 10
  slicePage?: number // 超过一定页数，中间需要渲染的页码数量
}

interface PaginationProps extends usePaginationProps {
  circle?: boolean // 是否圆形展示
  pageChange?:(page?: number) => void // 页数改变触发的事件
}

```