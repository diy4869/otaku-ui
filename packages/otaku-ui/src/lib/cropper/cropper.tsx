import React, { useLayoutEffect, useState, useRef } from 'react'
import Cropper from 'cropperjs'
import { Dialog } from '../dialog/dialog'
import 'cropperjs/src/css/cropper.scss'

interface ImageCropperProps {
  aspectRatio?: number
}

export function ImageCropper (props: ImageCropperProps) {
  const {
    aspectRatio = 16 / 9
  } = props
  const image = useRef<HTMLImageElement>(null)
  const container = useRef<HTMLDivElement>(null)
  const [show] = useState(true)

  useLayoutEffect(() => {
    if (show) {
      // eslint-disable-next-line no-new
      new Cropper(image.current as HTMLImageElement, {
        aspectRatio: aspectRatio,
        preview: container.current as HTMLImageElement
      })
    }
  }, [show])

  return (
    <Dialog show={show} title='图片裁剪'>
      <div className='otaku-image-cropper'>
        <img
          src='https://img0.baidu.com/it/u=1436285272,4094064052&fm=26&fmt=auto'
          alt=''
          ref={image}
          className='otaku-image-cropper-image'
        />
        <div className='otaku-image-cropper-preview' ref={container}></div>
      </div>
    </Dialog>
  )
}
