import React, { useState } from 'react'
import { VShow } from '../../directive/vShow'
import { Upload, UploadProps } from '../upload/upload'
import { ImageCropper, ImageCropperProps } from '../cropper/cropper'
import test from './248e9cc5b73cc3a276acf92eaf6651a7b3c90d10.jpg@268w_358h.webp'
import { ImagePreview, ImagePreviewProps } from '../imagePreview/imagePreview'
import './style.scss'


export type baseUploadProps = Pick<UploadProps, 'accept' | 'beforeUpload' | 'headers' | 'name' | 'withCredentials'>

export type UploadImageProps = {
  crop?: boolean
  imageCropperProps: Omit<ImageCropperProps, 'imageURL' | 'visible'>
  children: React.ReactNode
  beforeCrop?: (file: File) => boolean | Promise<boolean>
} & baseUploadProps

export type UploadImageState = 'select' | 'crop' | 'preview'

export function UploadImage (props: UploadImageProps) {
  const {
    crop = true,
    children,
    beforeCrop,
    beforeUpload
  } = props
  const [type, setType] = useState<UploadImageState>('preview')
  const [imageURL, setImageURL] = useState('')
  const [show, setShow] = useState(false)

  const uploadChange = (file: FileList) => {
    if (crop) {
      const result = beforeCrop?.(file[0])
      if (!result) {
        const blob = new Blob([file[0]], {
          type: file[0].type
        })
        const cropperURL = URL.createObjectURL(blob)
        setImageURL(cropperURL)
        setType('crop')
        setShow(true)
        console.log(type, cropperURL, blob)
      }
    }
  }

  return (
    <section className='otaku-upload-image-container'>
      <VShow show={type === 'select'}>
        <Upload autoUpload={false} onChange={uploadChange}></Upload>
      </VShow>
      <VShow show={type === 'crop'}>
        <ImageCropper imageURL={imageURL} visible={show}></ImageCropper>
      </VShow>
      <VShow show={type === 'preview'}>
        <div className='otaku-upload-image-preview-container'>
          
          <div className='otaku-upload-image-preview-mask'>
            <span>preview</span>
          </div>
          <img className='otaku-upload-image-preview' src={test} alt="" />
          
        </div>
      </VShow>
    </section>
  )
}
