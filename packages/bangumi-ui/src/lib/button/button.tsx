import React from 'react'
import './style.scss'

export interface ButtonProps {
  disabled?: boolean
  color?: string
  icon?: string
  style?: React.CSSProperties
  className?: string
  type?: 'default' | 'text' | 'primary' | 'danger' 
  
  size?: 'mini' | 'small' | 'middle' |'large'
  onClick?:() => void
  children?: React.ReactNode
}

export const Button =  (props: ButtonProps) => {
  const {
    disabled,
    color,
    children,
    icon,
    style,
    className,
    type = 'default',
    size = 'middle',
    onClick
  } = props

  return (
    <button 
      className={`
        ${disabled ? 'b-input-disabled' : ''}
        b-button
        b-button-size-${size}
        b-button-${type}
        ${className}
      `}
      style={{
        background: color,
        ...style
      }}
      disabled={disabled}
      onClick={onClick}>
      <span className={icon ? `b-button-icon iconfont b-icon-${icon}` : ''}></span>
      { children }
    </button>
  )
}
