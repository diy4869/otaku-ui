import React from 'react'
import classNames from 'classnames'
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
  
  const style = {
    backgroundColor: bgcolor,
    borderColor: bgcolor,
    color
  }

  const isDisabled = disabled || loading

  const Icon = loading ? 'otaku-icon-loading' : icon

  const childNode = Icon
    ? iconDirection === 'left'
      ? (<>
        <span className={`iconfont otaku-button-icon ${Icon}`}></span>
        { children }
        </>)
      : (<>
        {children }
        <span className={`iconfont otaku-button-icon ${Icon}`}></span>
        </>)
    : children

    
  if (type === 'link') {
    return <a href={href} target={target} className="otaku-button-link">{children}</a>
  }

  return (
    <button
      {...rest}
      className={classes}
      style={style}
      disabled={isDisabled}
      onClick={onClick}
    >
        {childNode}
    </button>
  )
}
