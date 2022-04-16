import React, { useState, useEffect } from 'react'
import { Portal } from '../portal/portal'
import classNames from 'classnames'
import './style.scss'

export interface DrawerProps {
  className?: string
  visible?: boolean
  width?: string
  height?: string
  direction?: 'top' | 'left' | 'right' | 'bottom'
  children?: React.ReactNode
  onClose?: () => void
}

export function Drawer (props: DrawerProps) {
  const {
    width = '350px',
    height = '350px',
    visible = false,
    direction = 'bottom',
    className,
    children,
    onClose
  } = props
  const [show, setShow] = useState(visible)

  useEffect(() => {
    setShow(visible)
  }, [visible])

  const close = () => {
    onClose?.()
    setShow(false)
  }

  return (
    <Portal visible={show} className={className} fullScreen={true}>
      <aside className='otaku-drawer-container'>
        <aside className='otaku-drawer-mask' onClick={close}></aside>
        <aside
          style={{
            width: ['left', 'right'].includes(direction) ? width : '100%',
            height: ['top', 'bottom'].includes(direction) ? height : '100%'
          }}
          className={classNames(
            {
              'transition': show,
            },
            'otaku-drawer-content',
            `otaku-drawer-direction-${direction}`
          )}>
          {children}
        </aside>
      </aside>
    </Portal>
  )
}
