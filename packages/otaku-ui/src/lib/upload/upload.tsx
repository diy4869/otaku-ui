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

interface DragDirectory {
  type: "file" | "directory"
  name: string
  size: number
  files?: DragDirectory[]
  file?: File
}

export function Upload (props: UploadProps) {
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
    const travserse = () => {
      const fileList = []

      const dfs = (files: FileSystemDirectoryEntry) => {
        const directory: DragDirectory[] = []

        if (files?.isDirectory) {
          const reader = files.createReader()

          reader.readEntries(entries => {
            for (const item of entries) {
              if (item.isDirectory) {
                directory.push({
                  name: item.name,
                  type: "directory",
                  size: 0,
                  files: dfs(item as FileSystemDirectoryEntry)
                })
              } else {
                ;(item as FileSystemFileEntry).file((children: File) => {
                  directory.push({
                    type: "file",
                    name: children.name,
                    size: children.size,
                    file: children
                  })
                })
              }
            }
          })

          return directory
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
            files: dfs(result as FileSystemDirectoryEntry)
          })
        }
      }

      return fileList
    }

    const fileList = travserse()
    console.log(fileList)

    const flat = (fileList) => {
      return fileList.reduce((total, current) => {
        return total.concat(
          current.type === 'directory' ? flat(current.files) : current
        )
      }, [])
    }

    Promise.resolve().then(() => {
      console.log(flat(fileList))
    })



    setDragState("drop")
    e.preventDefault()
  }

  return (
    <div className='otaku-upload-container'>
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
        <label className='otaku-upload-label'>
          <input type='file' name='upload' ref={file} onChange={change} />
          {/* {children} */}
          <div className='otaku-upload'>
            <Icon name='add-bold' className='add'></Icon>
          </div>
        </label>
      )}
    </div>
  )
}
