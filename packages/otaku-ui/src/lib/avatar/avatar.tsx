import React from 'react'
import './style.scss'

interface AvatarProps {
  // 图片大小
  size?: number
  /**
   * 图片地址
   */
  src?: string
  alt?: string
  className?: string
  test?:(a?: number) => void
}

export function Avatar (props: AvatarProps) {
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

export function test () {
  console.log(1)
}
