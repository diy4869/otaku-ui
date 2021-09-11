import React from 'react'
import './style.scss'

export interface ButtonProps {
  disabled?: boolean
  loading?: boolean
  ghost?: boolean
  icon?: string
  bgcolor?: string
  color?: string
  className?: string
  type?: 'default' | 'text' | 'primary' | 'success' | 'warning' | 'danger'
  iconDirection?: 'left' | 'right' 

  size?: 'small' | 'middle' |'large'
  onClick?:() => void
  children?: React.ReactNode
}

export const Button = (props: ButtonProps) => {
  const {
    ghost,
    disabled,
    loading,
    children,
    icon,
    bgcolor,
    color,
    className,
    iconDirection = 'left',
    type = 'default',
    size = 'middle',
    onClick
  } = props

  const Icon = loading ? 'otaku-icon-loading' : icon ? icon : ''

  const direction = iconDirection === 'left' ? (
    <>
      {
        Icon ? <span className={`iconfont otaku-button-icon ${Icon}`}></span> : ''
      }
      { children }
    </>
  ) : (
    <>
      {children}
      {
        Icon ? <span className={`iconfont otaku-button-icon ${Icon}`}></span> : ''
      }
    </>
  )

  return (
    <button
      className={`
        otaku-button
        otaku-button-size-${size}
        otaku-button-${type}
        ${disabled ? 'otaku-input-disabled' : ''}
        ${loading ? 'otaku-button-loading' : ''}
        ${ghost ? `otaku-button-${type}-ghost` : ''}
        ${className ?? ''}
      `}
      style={{
        backgroundColor: bgcolor,
        borderColor: bgcolor,
        color
      }}
      disabled={disabled || loading}
      onClick={onClick}>
      {
        direction
      }
    </button>
  )
}
