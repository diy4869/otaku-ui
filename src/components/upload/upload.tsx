import React, { useState, Fragment } from 'react'
import { Upload } from 'antd'
import ImageCropper from '@/components/cropper/cropper'

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
// const uploadStyle = require('./upload.scss').default

interface CropData {
  blob: string
}

export default function uploadImage () {
  const [loading, setLoading] = useState(false)
  const [imageURL, setImageURL] = useState('')
  const [cropURL, setCropURL] = useState('')
  const [showCrop, setShowCrop] = useState(false)

  const  getBase64 = (img: Blob, callback: Function) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }
  
  // function beforeUpload(file) {
  //   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  //   if (!isJpgOrPng) {
  //     message.error('You can only upload JPG/PNG file!');
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     message.error('Image must smaller than 2MB!');
  //   }
  //   return isJpgOrPng && isLt2M;
  // }
  const handleChange = (info: any) => {
    console.log(info)
    if (info.file.status === 'uploading') {
      setLoading(true)
      getBase64(info.file.originFileObj, (res: string) => {
        setLoading(false)
        setImageURL(res)
      })
    }
  }


  // 图片裁剪
  const imageCrop = (): void => {
    console.log('imageCrop')
    setShowCrop(true)
  }

  const cropConfirm = (bool: boolean): void => {
    setShowCrop(bool)
  }

  const cropCancel = (bool: boolean): void => {
    setShowCrop(bool)
  }
  const getCropData = (data: CropData) => {
    setCropURL(data.blob)
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">上传头像</div>
    </div>
  )
  const cropper = (): any => {
    if (showCrop) {
      return (
        <ImageCropper 
          imageURL={imageURL}
          cropConfirm={cropConfirm}
          cropCancel={cropCancel}
          getCropData={getCropData}
          show={showCrop}/>
      )
    }
  }
  return (
    <Fragment>
      <Upload
        name="avatar"
        accept="image/*"
        listType="picture-card"
        className="upload"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        // beforeUpload={beforeUpload}
        customRequest ={imageCrop}
        onChange={handleChange}
        
      >
        {cropURL ? <img src={cropURL} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      {
        cropper()
      }
    </Fragment>
    
  )
}
