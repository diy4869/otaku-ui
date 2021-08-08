import React from 'react'
import './style.scss'

interface SpaceBetweenProps {
  left?: React.ReactNode
  right?: React.ReactNode
}

export default (props: SpaceBetweenProps) => {
  const {
    left,
    right
  } = props
  
  return (
    <div className="b-space-between">
      { left }
      { right }
    </div>
  )
}
