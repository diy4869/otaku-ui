import React, { useState, useEffect } from 'react'
import './style.scss'
import LazyLoad from 'vanilla-lazyload'
import classNames from 'classnames'

export interface ImageProps {
  alt?: string
  src?: string
  className?: string
}


export function Image (props: ImageProps) {
  const {
    src,
    alt,
    className
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
    <div className={classNames('otaku-image-container', className)}>
      <img data-src={src} alt={alt}  className="otaku-image"/>
    </div>
  )
}
