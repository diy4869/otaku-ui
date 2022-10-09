export interface usePaginationProps {
  current?: number
  total?: number
  pageSize?: number
  slicePage?: number
}

export function usePagination (page: usePaginationProps) {
  const {
    current = 1,
    total = 0,
    pageSize = 10,
    slicePage = 5
  } = page

  if (slicePage % 2 !== 1) throw new Error('slicePage 必须为奇数')
  const maxPage = Math.ceil(total / pageSize)
  const centerPage = slicePage - 1
  const average = centerPage / 2
  const pagination = []
  
  /**
   * 滑动窗口
   * 每次只需要计算开始渲染的页数，之后向后平移 slicePage 的数量，只需要处理两边的边界就可以了
   * 如果当前的页数 减去左边的数量小于2的话，那左边边界为2，右边边界为最大的数量 - 1，如果当前页数右边不够平均值的话，说明需要把 start 变成 最大页 - 中间需要渲染的数量即可
   */

  let start
  
  if (current - average < 2) {
    start = 2
  } else {
    start = current + centerPage > maxPage ? maxPage - slicePage : current - average
  }

  const end = start + slicePage

  if (maxPage <= slicePage + 2) {
    for (let i = 2; i < maxPage; i++) {
      pagination.push(i)
    }
  } else {
    for (let i = start; i < end; i++) {
      pagination.push(i)
    }  
  }

  return {
    pagination: pagination,
    showPrevMore: pagination.length > 0 ? pagination?.[0] !== 2 : false,
    showNextMore: pagination.length > 0 ? pagination.at(-1) !== maxPage - 1 : false,
    maxPage
  }
}