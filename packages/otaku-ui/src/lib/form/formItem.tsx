import React, { useState } from 'react'
import './style.scss'

interface FormItemProps {
  label?: string
  children?: React.ReactNode
}

export function FormItem (props: FormItemProps) {
  const {
    label,
    children
  } = props

  return (
    <li className="otaku-form-item">
      <div className="otaku-form-item-label">
        { label }
      </div>
      <div>
        {children}
        <span> error message </span>
      </div>
    </li>
  )
}
