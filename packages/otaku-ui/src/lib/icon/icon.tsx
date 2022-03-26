import React from 'react'
import classNames from 'classnames'
import './style.scss'

interface IconProps {
  className?: string
  name?: string
  onClick?: () => void
}


export function Icon (props: IconProps) {
  const {
    className,
    name,
    onClick
  } = props

  return (
    <span 
      className={
        classNames('otaku-icon iconfont', `otaku-icon-${name}`, className)
      }  
      onClick={onClick}>
    </span>
  )
}
