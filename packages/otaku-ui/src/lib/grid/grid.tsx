
import React from 'react'
import classNames from 'classnames'
import './style.scss'

interface GridProps {
  width?: number
  count?: number
  gap?: number | [number, number]
  center?: boolean
  border?: boolean
  className?: string
  children: React.ReactNode[]
}

interface GridItemProps {
  className?: string
  children?: React.ReactNode
  onClick?: () => void
}

export function Grid (props: GridProps) {
  const { 
      width, 
      className, 
      center, 
      children, 
      border,
      count = 3, 
      gap = 0 
    } = props

  return (
    <ul
      className={classNames('otaku-grid', className, {
        'otaku-grid-center': center,
        'otaku-grid-border': border
      })}
      style={{
        gridTemplateColumns: `repeat(${count}, ${
          width ? `${width}px` : `1fr`
        })`,
        gridGap:
          typeof gap === 'number'
            ? `${gap}px`
            : gap.reduce((total, current) => total + `${current}px `, '')
      }}>
      {children}
    </ul>
  )
}

export function GridItem (props: GridItemProps) {
  const { children, className, onClick } = props

  return <li className={classNames('otaku-grid-item', className)} onClick={onClick}>{children}</li>
}
