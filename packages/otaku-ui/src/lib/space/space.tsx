import React from 'react'
import classNames from 'classnames'
import './style.scss'

interface SpaceProps {
  className?: string
  direction?: 'row' | 'column'
  gap: number | [number, number]
  children: React.ReactNode[] | React.ReactNode
}

export function Space (props: SpaceProps) {
  const {
    gap = 10,
    direction = 'row',
    className,
    children
  } = props
  const node = Array.isArray(children) ? children : [children]

  return (
    <ul className={classNames("otaku-space", className)} style={{
      gap: typeof gap === 'number' ? `${gap}px` : gap.map(item => `${item}px`).join(' '),
      flexDirection: direction
    }}>
      {
        node.map((node, index) => {
          return (
            <li key={index} className="otaku-space-item">
              {node}
            </li>
          )
        })
      }
    </ul>
  )
}
