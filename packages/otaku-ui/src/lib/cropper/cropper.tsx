import React, { useLayoutEffect, useState, useRef } from 'react'
import Cropper from 'cropperjs'
import { Dialog } from '../dialog/dialog'
import { Button } from '../button/button'
import 'cropperjs/src/css/cropper.scss'
// import 'cropperjs/src/css/cropper.css'
import './cropper.scss'

interface ImageCropperProps {
  imageURL: string
  visible?: boolean
  circle?: boolean
  options: Omit<Cropper.Options, 'preview'>
  action?: React.ReactNode
  getInstance?: (instance: Cropper) => void
  onClose?: () => void
  onCancel?: () => void
  onConfirm?: () => void
}

export function ImageCropper (props: ImageCropperProps) {
  const {
    imageURL,
    visible,
    options,
    action,
    getInstance,
    onCancel,
    onClose,
    onConfirm
  } = props
  const image = useRef<HTMLImageElement>(null)
  const container = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(visible)

  useLayoutEffect(() => {
    if (visible) {
      if (image.current && container.current) {
        // eslint-disable-next-line no-new
        const cropper = new Cropper(image.current, {
          ...options,
          preview: container.current,
          ready (e) {
            console.log(e)
          }
        })
        setShow(visible)
        getInstance?.(cropper)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, container, image])


  const cancel = () => {
    setShow(false)
    onCancel?.()
  }

  const confirm = () => {
    setShow(false)
    onConfirm?.()
  }

  const footer = (
    <div className='otaku-cropper-footer'>
      <Button onClick={cancel}>取消</Button>
      <Button type="primary" onClick={confirm}>确定</Button>
    </div>
  )

  return (
    <aside className='otaku-cropper-container'>
      <Dialog 
        show={show} 
        title='图片裁剪' 
        className='otaku-cropper-dialog'
        width="auto"
        footer={footer}
        onClose={() => {
          setShow(false)
          onClose?.()
        }}>
        <div className='otaku-image-cropper'>
          <img
            src={imageURL}
            alt=''
            ref={image}
            className='otaku-image-cropper-image'
          />
        </div>
        <div className='otaku-image-cropper-preview-container'>
          <div className='otaku-image-cropper-preview' ref={container}></div>
        </div>
        <section className='otaku-action-container'>
          {action}
        </section>
      </Dialog>
    </aside>

  )
}
