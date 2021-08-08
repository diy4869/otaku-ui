import React, { useRef } from 'react'
import { Modal, Row, Col } from 'antd'
import Cropper from 'react-cropper'
import PropTypes from 'prop-types'
import 'cropperjs/dist/cropper.css'
import cropperStyle from './cropper.scss'

interface CropData {
  blob: string
}

interface Props {
  show: boolean,
  imageURL: string,
  cropCancel(show: boolean): void
  cropConfirm(show: boolean): void
  getCropData(data: CropData): void
}

export default function ImageCrop (props: Props) {
  console.log(props)
  const cropper = useRef(null)

  const cancel = (): void => {
    props.cropCancel(false)
  }

  const confirm = async () => {
    if (cropper) {
      const blob = await getBlob()
      props.getCropData({
        blob: blob as string
      })
    }
    props.cropCancel(false)
  }
  const getBlob = () => {
    return new Promise(resolve => {
      const { current } = cropper as any
      current.getCroppedCanvas().toBlob((blob: Blob) => {
        const blobURL = URL.createObjectURL(blob)
        resolve(blobURL)
      })
    })
  }

  return (
    <div className="cropper">
      <Modal
          title="Vertically centered modal dialog"
          centered
          visible={true}
          maskClosable={false}
          onOk={confirm}
          onCancel={cancel}
          width="900px"
        >
        <Row gutter={20}>
          <Col span={16}>
            <Cropper
              className={cropperStyle.cropperBox}
              ref={cropper}
              style={{
                width: '100%',
                height: 400
              }}
              // dragMode={'crop'}
              // aspectRatio={[1, 1]}
              viewMode={1}
              src={props.imageURL}
              guides={true}
              disabled={true}
              preview=".preview"
              minContainerWidth={80}
              minContainerHeight={80}>
            </Cropper>
          </Col>
          <Col span={8} className={cropperStyle.center}>
            <div className="preview"  style={{ width: '100%', height: '100%' }}></div>
          </Col>
        </Row>
      </Modal>
    </div>
  )
}

ImageCrop.propTypes = {
  show: PropTypes.bool.isRequired
}
