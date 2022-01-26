import React, { useState, useEffect } from 'react'
import './style.scss'

interface AvatarProps {
  // 图片大小
  size?: number
  /**
   * 图片地址
   * @zh-cn sdfsf
   */
  src?: string
  alt?: string
  className?: string
}

export function Avatar (props: AvatarProps) {
  const { src, className, alt, size = 40 } = props
  const [URL, setURL] = useState(src)

  const error = () => {
    // console.log(e)
    // setURL()
  }

  useEffect(() => {
    setURL(URL)
  }, [URL])

  return (
    <div
      className={`otaku-avatar ${className ?? ''}`}
      style={{
        width: `${size}px`,
        height: `${size}px`
      }}>
      <img src={URL} alt={alt} onError={error}/>
    </div>
  )
}

