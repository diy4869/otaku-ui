import React, { useState } from 'react'
import './style.scss'

interface MessageProps {
  type?: 'info' | 'success' | 'warning' | 'error'
  children?: React.ReactNode
}


export function Message (props: MessageProps) {
  const {
    children
  } = props

  return (
    <div>
      {children}
    </div>
  )
}
