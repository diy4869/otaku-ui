import React from 'react'
import './style.scss'

interface SpaceProps {
  children: React.ReactNode[]
}

export function Space (props: SpaceProps) {
  const {
    children
  } = props

  return (
    <ul className="otaku-space">
      {
        children.map((node, index) => {
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
