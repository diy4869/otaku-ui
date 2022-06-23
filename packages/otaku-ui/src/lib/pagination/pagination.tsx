import React, { useState, useEffect } from 'react'
import { usePagination } from '../../hooks/index'
import type { usePaginationProps } from '../../hooks/index'
import './style.scss'

export interface PaginationProps extends usePaginationProps {
  circle?: boolean
  pageChange?: (page: number) => void
}

export function Pagination (props: PaginationProps) {
  const {
    current = 1,
    total = 1,
    pageSize = 10,
    slicePage = 5,
    circle = false,
    pageChange
  } = props

  const [page, setPage] = useState(current)
  const { pagination, maxPage, showPrevMore, showNextMore } = usePagination({
    current: page,
    total,
    pageSize,
    slicePage
  })
  
  useEffect(() => {
    setPage(page)
  }, [page])

  const change = (direction?: 'left' | 'right' | 'center', current?: number) => {
    switch (direction) {
      case 'left':
        page > 1 ? setPage(page - 1) : setPage(1)
        break
      case 'right':
        page < maxPage ? setPage(page + 1) : setPage(maxPage)
        break
      default:
        setPage(current as number)
        break
    }

    pageChange?.(page)
  }

  const renderPageItem = (current: number) => {
    return (
      <li 
        key={current}
        data-page={current}
        className={`
          otaku-pagination-item 
          ${circle ? 'is-circle' : ''}
          ${page === current ? 'otaku-pagination-item-acitve' : ''}
        `}
        onClick={() => change('center', current)}>
        {current}
      </li>
    )
  }

  return (
    <ul className="otaku-pagination">
      <li className={`otaku-pagination-prev ${circle ? 'is-circle' : ''}` } onClick={() => change('left')}>
        <span className="iconfont otaku-icon-left"></span>
      </li>
      {
        renderPageItem(1)
      }
      {
        showPrevMore ? (
          <li className="otaku-pagination-prev-more">
            <span className="iconfont otaku-icon-more-line"></span>
            <span className="iconfont otaku-icon-doubleleft"></span>
          </li>
        ) : ''
      }
      {
       pagination?.map((item) => {
          return renderPageItem(item as number)
       })
      }
      {
        showNextMore ? (
          <li className="otaku-pagination-next-more">
            <span className="iconfont otaku-icon-more-line"></span>
            <span className="iconfont otaku-icon-doubleright"></span>
          </li>
        ) : ''
      }
      {
        maxPage > 1 && renderPageItem(maxPage)
      }
      <li className={`otaku-pagination-next ${circle ? 'is-circle' : ''}` } onClick={() => change('right')}>
        <span className="iconfont otaku-icon-right"></span>
      </li>
    </ul>
  )
}
