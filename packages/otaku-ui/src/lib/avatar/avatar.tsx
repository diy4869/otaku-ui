import React from 'react'
import './style.scss'

interface AvatarProps {
  size?: number
  src?: string
  alt?: string
  className?: string
}

export const Avatar = (props: AvatarProps): JSX.Element => {
  const { src, className, alt, size = 40 } = props

  return (
    <div
      className={`otaku-avatar ${className ?? ''}`}
      style={{
        width: `${size}px`,
        height: `${size}px`
      }}>
      <img src={src} alt={alt} />
    </div>
  )
}
