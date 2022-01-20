import React, { useState } from 'react'
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
    setURL('https://gimg3.baidu.com/search/src=http%3A%2F%2Fpics3.baidu.com%2Ffeed%2Fb219ebc4b74543a965f8fbe13632318bb80114ee.jpeg%3Ftoken%3D98b31e5841118f864812ec2f05b66c97&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=f360,240&n=0&g=0n&q=75&fmt=auto?sec=1642438800&t=7c14effeed612565da59538014557a07')
  }

  return (
    <div
      className={`otaku-avatar ${className ?? ''}`}
      style={{
        width: `${size}px`,
        height: `${size}px`
      }}>
      <img src={URL} alt={alt} onError={ error}/>
    </div>
  )
}

export function test () {
  console.log(1)
}
