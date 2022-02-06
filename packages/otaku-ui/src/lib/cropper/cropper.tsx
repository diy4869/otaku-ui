import React, { useLayoutEffect, useEffect, useState, useRef } from 'react'
import Cropper from 'cropperjs'
import { Dialog } from '../dialog/dialog'
import { Button } from '../button/button'
import miku from './miku.jfif'
import 'cropperjs/src/css/cropper.scss'
import './cropper.scss'

interface ImageCropperProps {
  circle?: boolean
  aspectRatio?: number
}

export function ImageCropper (props: ImageCropperProps) {
  const {
    aspectRatio = 16 / 9
  } = props
  const image = useRef<HTMLImageElement>(null)
  const container = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useLayoutEffect(() => {
    if (show) {
      if (image.current && container.current) {
        // eslint-disable-next-line no-new
        new Cropper(image.current, {
          aspectRatio: aspectRatio,
          preview: container.current
        })
      }
  
    }
  }, [show, container, image, aspectRatio])

  return (
    <aside className='otaku-cropper-container'>
      <Button type="primary" onClick={() => setShow(true)}>图片裁剪</Button>
      <Dialog show={show} title='图片裁剪' className='otaku-cropper-dialog'>
        <div className='otaku-image-cropper'>
          <img
            src={miku}
            alt=''
            ref={image}
            className='otaku-image-cropper-image'
          />
          
        </div>
        <div className='otaku-image-cropper-preview' ref={container}></div>
      </Dialog>
    </aside>

  )
}
