import React, { useState, useEffect } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { Icon } from '../icon/icon'
import { Space } from '../space/space'
import 'react-photo-view/dist/react-photo-view.css'
import './style.scss'

export interface ImagePreviewProps {
  value?: string
  children?: React.ReactNode
}


export function ImagePreview (props: ImagePreviewProps) {
  const {
    value,
    children
  } = props

  const [imageURL, setImageURL] = useState(value)

  useEffect(() => {
    setImageURL(value)
  }, [value])

  return (
    <div className='otaku-image-preview-container'>
      <PhotoProvider
        toolbarRender={({scale, onScale }) => {
          return (
            <Space>
              <Icon 
                size={18}
                name="add-bold" 
                className='otaku-image-preview-toolbar' 
                onClick={() => onScale(scale + 1)}></Icon>
              <Icon 
                size={18}
                name="minus-bold" 
                className='otaku-image-preview-toolbar' 
                onClick={() => onScale(scale - 1)}></Icon>
            </Space>
          );
        }}>
        <PhotoView src={imageURL}>
          {children as React.ReactElement}
        </PhotoView>
      </PhotoProvider>
    </div>
  )
}
