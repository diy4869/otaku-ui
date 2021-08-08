import React, { useState } from 'react'
import './style.scss'

interface AvatarProps {
  size?: number | string
  src?: string
}

export default (props: AvatarProps) => {
  const {
    src = 'https://thirdqq.qlogo.cn/g?b=sdk&k=WmBE50SQ3IsOYeneWWciaQg&s=100&t=16272983134523424',
    size = 40
  } = props

  return (
    <div className="b-avatar" style={{
      width: size,
      height: size
    }}>
      <img src={src} alt=""/>
    </div>
  )
}
