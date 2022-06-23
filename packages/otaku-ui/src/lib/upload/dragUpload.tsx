import React, { useState, useEffect } from 'react'
import classNames from "classnames"

export type dragState = 'dragEnter' | 'drop' |  'dragOver' | 'dragLeave'

export interface DragUploadProps {
  children?: React.ReactNode
  onDrag?: (drageState: dragState) => void
  onDrop?: (e: React.DragEvent) => void
}

interface DragDirectory {
  type: 'file' | 'directory'
  name: string
  size: number
  files?: DragDirectory[]
  file?: File
}

export function DragUpload (props: DragUploadProps) {
  const {
    children,
    onDrag,
    onDrop
  } = props

  const [dragState, setDragState] = useState<dragState>()

  document.addEventListener("drop", e => e.preventDefault())
  document.addEventListener("dragover", e => e.preventDefault())

  useEffect(() => {
    if (dragState) onDrag?.(dragState)
  }, [dragState])

  const onDragEnter = () => {
    setDragState('dragEnter')
  }

  const onDragLeave = () => {
    setDragState('dragLeave')
  }

  const onDragOver = () => {
    setDragState('dragOver')
  }

  const drop = (e: React.DragEvent) => {
    const travserse = (): DragDirectory[] => {
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
        }

        return directory
      }

      for (const item of e.dataTransfer.items) {
        const result = item.webkitGetAsEntry()

        if (result?.isFile) {
          const file = item.getAsFile()
          fileList.push({
            type: "file",
            name: file?.name,
            size: file?.size,
            raw: file
          })
        }
        if (result?.isDirectory) {
          fileList.push({
            type: "directory",
            name: result?.name,
            size: 0,
            raw: result,
            files: dfs(result as FileSystemDirectoryEntry)
          })
        }
      }

      return fileList
    }

    Promise.resolve().then(() => {
      const fileList = travserse()
      
      setTimeout(() => {
        console.log(fileList)
        // debugger
      }, 0)

      onDrop?.(fileList)
    })

    setDragState("drop")
    e.preventDefault()
  }

  return (
    <div
      className={classNames('otaku-drag-upload', {
        'otaku-drag-upload-hover': ['dragEnter', 'dragOver'].includes(dragState)
      })}
      onDrop={drop}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}>
      {children}
    </div>
  )
}
