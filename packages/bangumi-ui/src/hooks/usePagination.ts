
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
  const leftPage: number[] = []
  const rightPage: number[] = []
  const averagePage = maxPage > slicePage
  const limit = current > slicePage

  if (limit) {
    const leftInitVal = current > maxPage - centerPage ? maxPage - slicePage : current - average
    const right = current > maxPage - (average + 1) ? maxPage - 1 : current + average

    for (let i = leftInitVal; i < current; i++) {
      leftPage.push(i)
    }

    for (let i = current + 1; i <= right; i++) {
      if (i !== maxPage) {
        rightPage.push(i)
      }
    }
  }

  let len = 0

  if (maxPage === 1) {
    len = 0
  } else if (maxPage - 2 > slicePage) {
    len = slicePage
  } else {
    len = maxPage - 2
  }

  const pageList = limit
    ? [
        ...leftPage,
        current === maxPage || current === 1 ? undefined : current,
        ...rightPage
      ]
    : new Array(total === 0 ? 0 : len).fill(undefined)
      .map((_, index) => index + 2)
  const result = pageList.filter((item) => item)

  return {
    pagination: result,
    showPrevMore: averagePage && result?.[0] !== 2,
    showNextMore: averagePage && result?.[result.length - 1] !== maxPage - 1,
    maxPage
  }
}
