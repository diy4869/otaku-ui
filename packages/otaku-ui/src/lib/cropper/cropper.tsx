import React, { useEffect, useState, useRef } from 'react'
import Cropper from 'cropperjs'
import { Dialog } from '../dialog/dialog'
import 'cropperjs/src/css/cropper.scss'

interface ImageCropperProps {
  children: React.ReactNode
}

export function ImageCropper (props: ImageCropperProps) {
  const image = useRef<HTMLImageElement>(null)
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    new Cropper(image.current!, {
      aspectRatio: 16 / 9,
      preview: container.current!
    })
  }, [])

  return (
    <Dialog>
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
