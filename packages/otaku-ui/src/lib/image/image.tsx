import React, { useState, useEffect } from 'react'
import './style.scss'
import LazyLoad from 'vanilla-lazyload'

export interface ImageProps {
  alt?: string
  src?: string
}


export function Image (props: ImageProps) {
  const {
    src,
    alt
  } = props

  useEffect(() => {
    // eslint-disable-next-line no-new
    new LazyLoad({
      elements_selector: '.otaku-image',
      callback_error (el, instance) {
        console.log(el, instance)
      }
    })
  }, [src])

  return (
    <div className='otaku-image-container'>
      <img data-src={src} alt={alt}  className="otaku-image"/>
    </div>
  )
}
