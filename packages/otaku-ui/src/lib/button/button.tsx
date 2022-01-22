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
  href?: string
  target?: '_blank' | '_self'
  shape?: 'round' | 'circle'
  type?: 'default' | 'text' | 'primary' | 'success' | 'warning' | 'danger' | 'link'
  iconDirection?: 'left' | 'right' 

  size?: 'small' | 'middle' |'large'
  children?: React.ReactNode
  onClick?: () => void
}

export const Button = (props: ButtonProps) => {
  const {
    shape,
    ghost,
    disabled,
    loading,
    children,
    icon,
    bgcolor,
    color,
    className,
    iconDirection = 'left',
    href = '',
    target = '_blank',
    type = 'default',
    size = 'middle',
    onClick
  } = props

  const Icon = loading ? 'otaku-icon-loading' : icon || ''

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
    type === 'link' ?
      <a href={href} target={target} className="otaku-button-link">{children}</a>
    : <button
      className={`
        otaku-button
        otaku-button-size-${size}
        otaku-button-${type}
        ${disabled ? 'otaku-input-disabled' : ''}
        ${loading ? 'otaku-button-loading' : ''}
        ${ghost ? `otaku-button-${type}-ghost` : ''}
        ${className ?? ''}
        ${shape ? `otaku-button-shape-${shape}` : ''}
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
