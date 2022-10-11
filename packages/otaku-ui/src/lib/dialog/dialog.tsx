import React, { useState, useEffect } from 'react'
import { Portal } from '../portal/portal'
import './style.scss'

interface DialogProps {
  show?: boolean
  title?: string
  width?: string
  closeOnRemove?: boolean
  className?: string
  footer?: React.ReactNode
  children: React.ReactNode
  onClose?: () => void
}

export function Dialog (props: DialogProps) {
  const { show, title, closeOnRemove, width = '70vw', children, className, footer, onClose } = props
  const [visible, setVisible] = useState(show)

  useEffect(() => {
    setVisible(show)
  }, [show])

  const close = () => {
    setVisible(false)
    onClose?.()
  }

  return (
    <Portal visible={visible} className={className} closeOnRemove={closeOnRemove}>
      <div className='otaku-dialog-mask'>
        <div className='otaku-dialog' style={{
          width
        }}>
          <header className='otaku-dialog-header'>
            <div>{title}</div>
            <span
              className='iconfont otaku-icon-close-circle-line'
              onClick={close}></span>
          </header>
          <main className='otaku-dialog-content'>{children}</main>
          <footer className='otaku-dialog-footer'>{footer}</footer>
        </div>
      </div>
    </Portal>
  )
}
