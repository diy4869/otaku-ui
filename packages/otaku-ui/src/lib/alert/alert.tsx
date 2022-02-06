import React from 'react'
import { Icon } from '../icon/icon'
import './style.scss'

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error'
  children: React.ReactNode
}


export function Alert (props: AlertProps) {
  const {
    type = 'info',
    children
  } = props

  return (
    <div className={`otaku-alert otaku-alert-${type}`}>
      <Icon name={type} className='otaku-alert-icon'></Icon>
      <span className='otaku-alert-content'>{children}</span>
    </div>
  )
}
