---
import:
  import { Pagination } from 'bangumi-ui'
---

[[toc]]

## 普通分页

::: demo
```tsx
  <Pagination total={200} current={2}></Pagination>
```
:::

<br/>

## 自定义 slicePage

::: demo
```tsx
  <Pagination current={5} slicePage={3} total={200}></Pagination>
```
:::


## 自定义 pageSize

::: demo
```tsx
  <Pagination slicePage={3} total={200} pageSize={15}></Pagination>
```
:::


## 以圆形进行渲染

::: demo

```tsx
  <Pagination circle={true}></Pagination>
```
:::

## 只有一页

::: demo

```tsx
  <Pagination></Pagination>
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