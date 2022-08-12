import React, { useState, useEffect } from "react"
import { Icon } from "../icon/icon"
import { DragUpload } from "./dragUpload"
import { Progress } from "../progress/progress"
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import "./style.scss"

export interface UploadProps {
  action?: string
  accept?: string
  name?: string
  headers?: Record<string, string>
  methods?: 'post' | 'put'
  multiple?: boolean
  directory?: boolean
  withCredentials?: boolean
  data?: Record<string, any>
  drag?: boolean
  autoUpload?: boolean
  formData?: boolean
  limit?: number
  max?: number
  children?: React.ReactNode
  request?: (file: FileList) => void
  onChange?: (file: FileList) => void
  onUpload?: (type: 'success' | 'error', result: any) => void
  beforeUpload?: (file: FileList) => boolean | Promise<boolean>
}

declare module 'react' {
  interface InputHTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    directory?: string;
    webkitdirectory?: string;
  }
}

export function Upload (props: UploadProps) {
  const {
    action,
    accept,
    headers, 
    methods = 'post',
    withCredentials,
    multiple = false,
    data = {},
    directory = false,
    drag = false,
    autoUpload = true,
    name = 'file',
    formData = false,
    beforeUpload,
    request,
    onChange,
    onUpload
  } = props
  const [uploadFileList, setUploadFileList] = useState(new Map())

  useEffect(() => {
    console.log(1)
  }, [])

  const baseUpload = (fileList: FileList) => {
    const map = new Map()
    const result = Object.keys(data).reduce((fd, current) => {
      fd.append(current, data[current])
      
      return fd
    }, new FormData())
    

    for (const file of fileList) {
      const controlller = new AbortController()
      const id = uuid()

      map.set(id, {
        file,
        controlller,
        status: 'pending',
        progress: 0
      })

      if (formData) {
        result.append(name, file)
      }

      axios({
        url: action,
        method: methods,
        headers: {
          'Content-Type': 'multipart/form-data',
          ...headers
        },
        withCredentials,
        data: formData ? result : {
          ...data,
          [name]: file
        },
        onUploadProgress (e) {
          console.log(e)
          map.set(id, {
            ...map.get(id),
            progress: +((e.loaded / e.total) * 100).toFixed(2),
            status: 'progress'
          })
          setUploadFileList(new Map(map.entries()))
        },
        signal: controlller.signal
      }).then((res) => {
        // debugger
        map.set(id, {
          ...map.get(id),
          status: 'success'
        })
        console.log(res)
        setUploadFileList(new Map(map.entries()))
        onUpload?.('success', res.response.data)
      }).catch((err) => {
        // debugger
        map.set(id, {
          ...map.get(id),
          status: 'error'
        })
        console.log(map)
        setUploadFileList(new Map(map.entries()))
        onUpload?.('error', err.response.data)
      })
    }
  }

  const uploadFile = (fileList: FileList) => {
    const result = beforeUpload?.(fileList)
    onChange?.(fileList)

    if (typeof result === 'boolean') {
      if (autoUpload) {
        request ? request(fileList) : baseUpload(fileList)
      }
    } else if (result?.then) {
      result.then(res => {
        if (typeof res === 'boolean') {
          if (autoUpload) {
            res && request ? request(fileList) : baseUpload(fileList)
          }
        }
      })
    } else {
      if (autoUpload) {
        request ? request(fileList) : baseUpload(fileList)
      }
    }
  }

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) uploadFile(e.target.files)
  }
  
  const drop = () => {
    // console.log(e.dataTransfer.items)
  }

  return (
    <div className='otaku-upload-container'>
      {drag ? (
        <DragUpload onDrop={drop}>
            <Icon name='add-bold' className='add'></Icon>
        </DragUpload>
      ) : (
        <label className='otaku-upload-label'>
          <input 
            type='file' 
            name='upload' 
            webkitdirectory={directory ? 'webkitdirectory' : undefined } 
            multiple={multiple}
            onChange={change}
            accept={accept}/>
          {/* {children} */}
          <div className='otaku-upload'>
            <Icon name='add-bold' className='add'></Icon>
          </div>
        </label>
      )}
      <ul>
        {
          [...uploadFileList.entries()].map((item) => {
            const [id, data] = item

            return (
              <li key={id}>
                <Progress percentage={data.progress}></Progress>
                <span>{id} --- {data.file.name} --- {data.status}</span>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
