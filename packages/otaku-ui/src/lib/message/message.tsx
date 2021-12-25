import React from 'react'
import './style.scss'

interface MessageProps {
  type?: 'info' | 'success' | 'warning' | 'error'
  children?: React.ReactNode
}

export function Message (props: MessageProps) {
  const {
    type = 'info',
    children
  } = props

  return (
    <div className="otaku-message">
      <span className={`otaku-message-icon iconfont otaku-icon-${type}`}></span>
      <span className="otaku-message-content">{children}</span>
    </div>
  )
}

export * from './notice'
