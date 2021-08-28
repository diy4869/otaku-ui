[[toc]]

## useCalendar 获取日历

<br/>

```ts
interface Data {
  prev: number[] // 上个月
  current: number[] // 当前月
  next: number[] // 下个月
}

/**
 * date: string | dayjs | date
 * firstWeek 默认周日为一周的开始
*/
function useCalendar (date?: dayjs.ConfigType, firstWeek = '日' | '一'): Data

```


<br/>

## usePagination 获取分页

<br/>

```ts
interface usePaginationProps {
  current?: number
  total?: number
  pageSize?: number
  slicePage?: number // 分页标准 必须是奇数 默认为5
}

interface Data {
  pagination: number[]
  showPrevMore: boolean
  showNextMore: boolean
  maxPage: number
}

function usePagination (page: usePaginationProps): Data
```
