import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { usePagination } from '../../hooks/index'
import type { usePaginationProps } from '../../hooks/index'
import './style.scss'

export interface PaginationProps extends usePaginationProps {
  circle?: boolean
  pageChange?: (page: number) => void
}

export function Pagination (props: PaginationProps) {
  const defaultSlicePage = props.slicePage || 5
  const slicePage = defaultSlicePage + 2
  // console.log(defaultSlicePage)
  const {
    current = 1,
    total = 1,
    pageSize = 10,
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
    pageChange?.(page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    }
    
  }

  const renderPageItem = (current: number) => {
    return (
      <li 
        key={current}
        data-page={current}
        className={classNames('otaku-pagination-item', {
          'is-circle': circle,
          'otaku-pagination-item-acitve': page === current
        })}
        onClick={() => change('center', current)}
        onKeyDown={() => change('center', current)}>
        {current}
      </li>
    )
  }

  return (
    <ul className="otaku-pagination">
      {
        maxPage !== 1 ? <li className={`otaku-pagination-prev ${circle ? 'is-circle' : ''}` } onClick={() => change('left')}>
          <span className="iconfont otaku-icon-left"></span>
        </li> : null
      }
      {
        renderPageItem(1)
      }
      {
        pagination.length !== 0 ?
          pagination?.[0] !== 2 ? (
            <li className="otaku-pagination-prev-more">
              <span className="iconfont otaku-icon-more-line"></span>
              <span className="iconfont otaku-icon-doubleleft"></span>
            </li>
          ) : renderPageItem(2) : null
      }
      {
        pagination.slice(1, -1).map((item) => {
          return renderPageItem(item as number)
       })
      }
      {
        pagination.length !== 0 ? pagination.at(-1) !== maxPage - 1 ? (
          <li className="otaku-pagination-next-more">
            <span className="iconfont otaku-icon-more-line"></span>
            <span className="iconfont otaku-icon-doubleright"></span>
          </li>
        ) : renderPageItem(pagination.at(-1) as number) : null
      }
      {
        maxPage > 1 && renderPageItem(maxPage)
      }
      {
        maxPage !== 1 ? <li className={`otaku-pagination-next ${circle ? 'is-circle' : ''}` } onClick={() => change('right')}>
          <span className="iconfont otaku-icon-right"></span>
        </li> : null
      }
    
    </ul>
  )
}
