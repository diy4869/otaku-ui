import React from 'react'
import './style.scss'

interface SpaceBetweenProps {
  left?: React.ReactNode
  right?: React.ReactNode
}

export function SpaceBetween (props: SpaceBetweenProps) {
  const {
    left,
    right
  } = props

  return (
    <div className="otaku-space-between">
      { left }
      { right }
    </div>
  )
}
