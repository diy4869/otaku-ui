import { repeat } from 'lodash'
import React, { ReactNode, useState } from 'react'
import './style.scss'

interface GridProps {
  width?: number
  count?: number
  gap?: number | [number, number]
  center?: boolean
  className?: string
  children: React.ReactNode[]
}

interface GridItemProps {
  className?: string
  children?: React.ReactNode[]
}

export function Grid (props: GridProps) {
  const { width, className, center, children, count = 3, gap = 0 } = props

  return (
    <ul
      className={`otaku-grid ${center ? 'otaku-grid-center' : ''} ${className ??
        ''}`}
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
  const { children, className } = props

  return <li className={`otaku-grid-item ${className ?? ''}`}>{children}</li>
}
