import React, { useState, useRef } from "react"
import { Icon } from "../icon/icon"
import "./style.scss"

interface UploadProps {
  action: string
  accept?: string
  methods?: "get" | "post" | "put"
  multiple?: boolean
  directory?: boolean
  drag?: boolean
  children: React.ReactNode
  beforeUpload?: () => void
}

// interface FileSystemDirectoryReader {
//   readEntries: (callback: (FileEntry?: Array<FileSystemFileEntry | FileSystemDirectoryEntry>) => void) => void
// }

// interface FileSystemEntry {
//   createReader: () => FileSystemDirectoryReader
// }

export function Upload(props: UploadProps) {
  const {
    action,
    accept,
    methods,
    multiple,
    directory,
    drag,
    children,
    beforeUpload
  } = props
  const [dragState, setDragState] = useState("")
  const file = useRef(null)

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e, e.target.files)
  }


  document.addEventListener("drop", e => e.preventDefault())
  document.addEventListener("dragover", e => e.preventDefault())

  const onDragEnter = () => {
    setDragState("dragEnter")
  }

  const onDragLeave = () => {
    setDragState("dragLeave")
  }

  const onDragOver = () => {
    setDragState("dragOver")
  }

  const onDrop = (e: React.DragEvent) => {
    console.log("onDrop", e, e.dataTransfer.files, e.dataTransfer.items)

    const travserse = () => {
      const fileList = []
      const dfs = (files: FileSystemDirectoryEntry) => {
        const directory = []

        if (files?.isDirectory) {
          const reader = files.createReader()

          reader.readEntries((entries) => {
            for (const item of entries) {
              if (item.isDirectory) {
                directory.push({
                  name: item.name,
                  type: "directory",
                  files: dfs(item)
                })
              } else {
                console.log(item)
                item.file((children: File) => {
                  directory.push({
                    type: "file",
                    file: children
                  })
                })
              }
            }
          })
        }
        
        return directory
      }

      for (const item of e.dataTransfer.items) {
        const result = item.webkitGetAsEntry()

        if (result?.isFile) {
          const file = item.getAsFile()
          fileList.push({
            type: "file",
            file
          })
        }
        if (result?.isDirectory) {
          fileList.push({
            type: "directory",
            name: result?.name,
            files: dfs(result)
          })
        }
      }

      console.log(fileList)
    }

    travserse()


    setDragState("drop")
    e.preventDefault()
  }

  return (
    <div className='otaku-upload-container'>
      <label className='otaku-upload-label'>
        <input type='file' name='upload' ref={file} onChange={change} />
        {/* {children} */}
        {drag ? (
          <div
            className={`
                otaku-drag-upload 
                ${
                  ["dragEnter", "dragOver"].includes(dragState)
                    ? "otaku-drag-upload-hover"
                    : ""
                }
              `}
            onDrop={onDrop}
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}>
            拖拽
          </div>
        ) : (
          <div className='otaku-upload'>
            <Icon name='add-bold' className='add'></Icon>
          </div>
        )}
      </label>
    </div>
  )
}
