import React from 'react'
import './style.scss'

interface SpaceProps {
  direction?: 'row' | 'column'
  gap: number | [number, number]
  children: React.ReactNode[] | React.ReactNode
}

export function Space (props: SpaceProps) {
  const {
    gap = 10,
    direction = 'row',
    children
  } = props
  const node = Array.isArray(children) ? children : [children]

  return (
    <ul className="otaku-space" style={{
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
