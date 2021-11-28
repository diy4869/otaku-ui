import React, { useState, useEffect } from 'react'
import { Portal } from '../portal/portal'
import './style.scss'

interface DialogProps {
  show?: boolean
  title?: string
  children: React.ReactNode
  onClose?: () => void
}

export function Dialog (props: DialogProps) {
  const { show, title, children, onClose } = props
  const [visible, setVisible] = useState(show)

  useEffect(() => {
    setVisible(show)
  }, [show])

  const close = () => {
    setVisible(false)
    onClose?.()
  }

  return (
    <Portal visible={visible}>
      <div className='otaku-dialog-mask'>
        <div className='otaku-dialog'>
          <header className='otaku-dialog-header'>
            <div>{title}</div>
            <span
              className='iconfont otaku-icon-close-circle-line'
              onClick={close}></span>
          </header>
          <main className='otaku-dialog-content'>{children}</main>
          <footer className='otaku-dialog-footer'></footer>
        </div>
      </div>
    </Portal>
  )
}
