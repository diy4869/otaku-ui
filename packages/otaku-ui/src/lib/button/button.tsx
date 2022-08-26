import React from 'react'
import classNames from 'classnames'
import './style.scss'

export interface ButtonProps {
  disabled?: boolean
  loading?: boolean
  ghost?: boolean
  icon?: React.ReactNode
  bgcolor?: string
  color?: string
  className?: string
  href?: string
  target?: '_blank' | '_self'
  shape?: 'round' | 'circle'
  type?: 'default' | 'text' | 'primary' | 'success' | 'warning' | 'danger' | 'link'
  iconDirection?: 'left' | 'right'
  size?: 'small' | 'middle' |'large'
  style?: React.CSSProperties
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLElement>
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
    style,
    iconDirection = 'left',
    href = '',
    target = '_blank',
    type = 'default',
    size = 'middle',
    onClick,
    ...rest
  } = props

  const classes = classNames(
    'otaku-button',
    `otaku-button-size-${size}`,
    `otaku-button-${type}`,
    {
      'otaku-input-disabled': disabled,
      'otaku-button-loading': loading,
      [`otaku-button-${type}-ghost`]: ghost,
      [`otaku-button-shape-${shape}`]: shape,
    },
    className
  )
  
  const isDisabled = disabled || loading

  const Icon = loading ? 'otaku-icon-loading' : icon

  const childNode = Icon
    ? iconDirection === 'left'
      ? (<>
        {Icon}
        { children }
        </>)
      : (<>
        {children }
        {Icon}
        </>)
    : children

    
  if (type === 'link') {
    return <a href={href} target={target} className="otaku-button-link">{children}</a>
  }

  return (
    <button
      {...rest}
      className={classes}
      style={{
        backgroundColor: bgcolor,
        borderColor: bgcolor,
        color,
        ...style
      }}
      disabled={isDisabled}
      onClick={onClick}
    >
        {childNode}
    </button>
  )
}
