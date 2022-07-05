import React, { forwardRef } from 'react'
import classNames from 'classnames'
import './style.scss'

interface IconProps {
  className?: string
  name?: string
  color?: string
  size?: number,
  style?: React.CSSProperties
  onClick?: () => void
}

export const Icon = forwardRef((props: IconProps) => {
  const {
    className,
    name,
    size =  16,
    color,
    style,
    onClick
  } = props

  return (
    <span 
      className={
        classNames('otaku-icon iconfont', `otaku-icon-${name}`, className)
      }
      style={{
        fontSize: `${size}px`,
        color,
        ...style
      }}
      onClick={onClick}>
    </span>
  )
})

Icon.displayName = 'Icon'

// export function Icon (props: IconProps) {
 
// }
