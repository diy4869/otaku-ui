import React from 'react'
// import { Icon } from '../icon/icon'
import './style.scss'

interface MessageProps {
  type?: 'info' | 'success' | 'warning' | 'error'
  children?: React.ReactNode
  onClose?: () => void
}

export function Message (props: MessageProps) {
  const {
    type = 'info',
    children,
    onClose
  } = props

  return (
    <div className="otaku-message">
      <span className={`otaku-message-icon iconfont otaku-icon-${type}`}></span>
      <span className="otaku-message-content">{children}</span>
      {/* <span onClick={onClose}>测试关闭</span> */}
    </div>
  )
}
