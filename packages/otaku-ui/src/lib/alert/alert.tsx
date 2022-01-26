import React from 'react'
import './style.scss'

interface AlertProps {
  children: React.ReactNode
}


export function Alert (props: AlertProps) {
  const {
    children
  } = props

  return (
    <div>{children}</div>
  )
}
