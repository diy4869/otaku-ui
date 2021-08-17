import React, { useState, useEffect } from 'react'
import { usePagination, usePaginationProps } from '../../hooks/index'
import './style.scss'

interface PaginationProps extends usePaginationProps {
  circle?: boolean
  pageChange?:(page?: number) => void
}

export function Pagination (props: PaginationProps) {
  const {
    current = 1,
    total = 11050,
    pageSize = 10,
    slicePage = 5,
    circle = false,
    pageChange
  } = props

  let [page, setPage] = useState(current)
  const { pagination, maxPage, showPrevMore, showNextMore } = usePagination({
    current: page,
    total,
    pageSize,
    slicePage
  })
  
  // useEffect(() => {

  // }, [page])

  const change = (direction?: 'left' | 'right' | 'center', current?: number) => {
    switch (direction) {
      case 'left':
        page > 1 ? setPage(--page) : setPage(1)
        break
      case 'right':
        page < maxPage ? setPage(++page) : setPage(maxPage)
        break
      default:
        setPage(current!)
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
          b-pagination-item 
          ${circle ? 'is-circle' : ''}
          ${page === current ? 'b-pagination-item-acitve' : ''}
        `}
        onClick={() => change('center', current)}>
        {current}
      </li>
    )
  }

  return (
    <ul className="b-pagination">
      <li className={`b-pagination-prev ${circle ? 'is-circle' : ''}` } onClick={() => change('left')}>
        <span className="iconfont b-icon-left"></span>
      </li>
      {
        renderPageItem(1)
      }
      {
        showPrevMore ? (
          <li className="b-pagination-prev-more">
            <span className="iconfont b-icon-more-line"></span>
            <span className="iconfont b-icon-doubleleft"></span>
          </li>
        ) : ''
      }
      {
       pagination?.map((item) => {
          return renderPageItem(item!)
       })
      }
      {
        showNextMore ? (
          <li className="b-pagination-next-more">
            <span className="iconfont b-icon-more-line"></span>
            <span className="iconfont b-icon-doubleright"></span>
          </li>
        ) : ''
      }
      {
        maxPage > 1 && renderPageItem(maxPage)
      }
      <li className={`b-pagination-next ${circle ? 'is-circle' : ''}` } onClick={() => change('right')}>
        <span className="iconfont b-icon-right"></span>
      </li>
    </ul>
  )
}
