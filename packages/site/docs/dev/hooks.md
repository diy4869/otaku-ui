[[toc]]

## useCalendar 获取日历

```ts
interface Data {
  prev: string[] // 上个月
  current: string[] // 当前月
  next: string[] // 下个月
}

/**
 * date: string | dayjs | date
 * firstWeek 默认周日为一周的开始
*/
function useCalendar (date?: dayjs.ConfigType, firstWeek = '日' | '一'): Data

```

## usePagination 获取分页

```ts
interface usePaginationProps {
  current?: number
  total?: number
  pageSize?: number
  slicePage?: number // 分页标准 必须是奇数 默认为5
}

interface Data {
  pagination: number[] // 分页数据不包括开始和结束页
  showPrevMore: boolean
  showNextMore: boolean
  maxPage: number
}

function usePagination (page: usePaginationProps): Data
```