import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { VShow } from '../../directive/vShow'
import { Icon } from '../icon/icon'
import { Space } from '../space/space'
import { Upload, UploadProps } from '../upload/upload'
import { ImageCropper, ImageCropperProps } from '../cropper/cropper'
import { ImagePreview } from '../imagePreview/imagePreview'
import './style.scss'


export type baseUploadProps = Pick<UploadProps, 'accept' | 'headers' | 'name' | 'withCredentials' | 'onUpload'>

export type UploadImageProps = {
  action?: string
  methods?: 'post' | 'put'
  previewURL?: string
  crop?: boolean
  imageCropperProps?: Omit<ImageCropperProps, 'imageURL' | 'visible'>
  request?: (file: File) => void
  beforeUpload?: (file: File) => boolean | Promise<boolean>
  beforeCrop?: (file: File) => boolean | Promise<boolean>
  beforeRemove?: (file: File) => void
} & baseUploadProps

export type UploadImageState = 'select' | 'crop' | 'preview'

export function UploadImage (props: UploadImageProps) {
  const {
    previewURL = '',
    crop = true,
    accept = 'image/*',
    action,
    methods,
    headers,
    name = 'file',
    withCredentials,
    imageCropperProps,
    beforeCrop,
    beforeUpload,
    onUpload,
    request
  } = props
  const [type, setType] = useState<UploadImageState>('select')
  const [imageURL, setImageURL] = useState(previewURL)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (previewURL) {
      setImageURL(previewURL)
      setType('preview')
    }
  }, [previewURL])

  const uploadFile = (file: File) => {
    axios({
      url: action,
      method: methods,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...headers
      },
      withCredentials,
      data: {
        [name]: file
      },
    }).then((res: any) => {
      onUpload?.('success', res.response.data)
    }).catch((err: any) => {
      onUpload?.('error', err.response.data)
    })
  }

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
      }
    } else {
      const result = beforeUpload?.(file[0])
      if (!result) {
        const blob = new Blob([file[0]], {
          type: file[0].type
        })
        const previewURL = URL.createObjectURL(blob)
        setImageURL(previewURL)

        request ? request(file[0]) : uploadFile(file[0])
      }
    }
  }

  return (
    <section className='otaku-upload-image-container'>
      <VShow show={type === 'select'}>
        <Upload autoUpload={false} onChange={uploadChange} accept={accept}></Upload>
      </VShow>
      <VShow show={type === 'crop'}>
        <ImageCropper 
          imageURL={imageURL} 
          visible={show} 
          onConfirm={(data) => {
            if (data?.blob) {
              const blobURL = URL.createObjectURL(data.blob)
              setImageURL(blobURL)
              setType('preview')
              request ? request(data.file) : uploadFile(data.file)
            }
          }}
          {...imageCropperProps}>
          </ImageCropper>
      </VShow>
      <VShow show={type === 'preview'}>
        <div className='otaku-upload-image-preview-container'>
          <div className='otaku-upload-image-preview-mask'>
            <Space>
              <ImagePreview value={imageURL}>
                <Icon name="eye-line" color='white'></Icon>
              </ImagePreview>
              <Icon name="delete" color='white'></Icon>
            </Space>
          </div>
          <img className='otaku-upload-image-preview' src={imageURL} alt="" />
        </div>
      </VShow>
    </section>
  )
}
