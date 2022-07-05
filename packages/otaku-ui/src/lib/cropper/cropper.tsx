import React, { useLayoutEffect, useState, useRef } from 'react'
import classNames from 'classnames'
import Cropper from 'cropperjs'
import { Dialog } from '../dialog/dialog'
import { Button } from '../button/button'
import 'cropperjs/src/css/cropper.scss'
import './cropper.scss'

interface outputResult {
  file: File,
  blob: Blob
}

export interface ImageCropperProps {
  imageURL: string
  visible?: boolean
  circle?: boolean
  options?: Omit<Cropper.Options, 'preview'>
  action?: React.ReactNode
  outputFilename?: string
  children?: React.ReactNode
  getInstance?: (instance: Cropper) => void
  onClose?: () => void
  onCancel?: () => void
  onConfirm?: (cropperData: outputResult) => void
}

export function ImageCropper (props: ImageCropperProps) {
  const {
    imageURL,
    visible,
    options,
    action,
    circle = false,
    outputFilename = 'cropper.png',
    getInstance,
    onCancel,
    onClose,
    onConfirm
  } = props
  const image = useRef<HTMLImageElement>(null)
  const container = useRef<HTMLDivElement>(null)
  const [cropperInstance, setCropperInstance] = useState<Cropper>()
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
        setCropperInstance(cropper)
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

  const confirm = async () => {
    const getData = () => {
      return new Promise<outputResult>((resolve, reject) => {
        const canvasData = cropperInstance?.getCroppedCanvas({
          imageSmoothingQuality: 'high'
        })
        canvasData?.toBlob((blob) => {
          if (blob) {
            // eslint-disable-next-line no-new
            const file = new File([blob], outputFilename, {
              type: blob?.type
            })

            resolve({
              blob,
              file
            })
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject(null)
          }
        })
      })
    }
    setShow(false)
    
    const result = await getData()
    onConfirm?.(result)
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
        <div className={classNames('otaku-image-cropper-preview-container', {
          'is-circle': circle
        })}>
          <div className='otaku-image-cropper-preview' ref={container}></div>
        </div>
        <section className='otaku-action-container'>
          {action}
        </section>
      </Dialog>
    </aside>

  )
}
