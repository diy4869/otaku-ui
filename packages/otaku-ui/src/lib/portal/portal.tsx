import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { fromEvent } from 'rxjs'
// import { throttleTime } from 'rxjs/operators'
// import throttle from 'lodash/throttle'

interface TelportProps {
  className?: string
  children: React.ReactNode
  visible?: boolean
  zIndex?: number
  mountNode?: HTMLBodyElement
  visibleChange?: (show?: boolean) => void
  clickOutSide?: () => void
}

interface HTMLDivElement extends HTMLElement {
  numberId?: number
  teleportId?: symbol
}

let id = 1

export function Portal (props: TelportProps) {
  const container = useRef<HTMLDivElement>()
  // 防止 modal 关闭后，portal 渲染的元素为空
  const [mountContainer, setMountContainer] = useState(
    document.createElement('div')
  )
  const {
    children,
    className,
    mountNode = document.querySelector('body') as HTMLBodyElement,
    zIndex = 2000,
    visible = false,
    visibleChange,
    clickOutSide
  } = props

  const boundary = (modal: HTMLDivElement, node: HTMLDivElement) => {
    if (node) {
      const position = modal.children[1].getBoundingClientRect()

      node.style.top = `${position.top}px`
      node.style.left = `${position.left}px`

      // 处理上边界
      // 处理下边界
      const h = node.offsetHeight
      const minHeight = Math.floor(node.offsetHeight + position.top)
      const maxHeight = mountNode.offsetHeight
      const parentElement = container.current?.parentElement as HTMLDivElement
      const parentHeight = parentElement.offsetHeight
      // console.log(minHeight, maxHeight)
      if (minHeight > maxHeight) {
        const top = position.top - h - parentHeight - 5
        node.style.top = `${top}px`
      } else {
        node.style.top = `${position.top}px`
      }
    }
  }

  const findNode = (node: HTMLDivElement) => {
    const children = Array.of(...mountNode.children)

    return children.find((ele) => {
      if (ele.numberId) {
        return ele?.numberId === node?.numberId
      }
      return false
    }) as HTMLDivElement | undefined
  }

  const showNode = () => {
    const modal = container.current?.parentElement

    if (modal) {
      const el = findNode(modal)

      if (el) {
        el.style.display = 'block'
        boundary(modal, el)
      }
    }
  }

  const hideNode = () => {
    const modal = container.current?.parentElement

    if (modal) {
      const el = findNode(modal)
      if (el) el.style.display = 'none'
    }
  }

  const init = () => {
    const el: HTMLDivElement = mountContainer
    const modal = (container.current as HTMLDivElement).parentElement as HTMLDivElement
    const position = modal.children[1].getBoundingClientRect()
    const node = findNode(modal)

    if (!node) {
      el.className = 'otaku-teleport-container'
      el.style.cssText = `
        display: ${visible ? 'block' : 'none'};
        z-index: ${zIndex};
        position: fixed;
        top: ${position.top}px;
        left: ${position.left}px;
      `
      modal.numberId = id
      modal.teleportId = Symbol(id)

      if (!el.numberId) {
        el.numberId = id
        el.teleportId = Symbol(id)
        mountNode?.appendChild(el)

        id++
      }
      boundary(modal, el)
      setMountContainer(el)
    }
  }

  useEffect(() => {
    // 解决浏览器大小改变，导致弹窗位置错位
    const observer = new ResizeObserver(() => {
      console.log()
      if (visible) {
        init()
      }
    })

    if (mountNode) observer.observe(mountNode)
    if ((container.current?.parentElement as HTMLDivElement).numberId) {
      visible ? showNode() : hideNode()
    }

    visibleChange?.(visible)

    const doc = fromEvent(document, 'click').subscribe(e => {
      const parentElement = container.current?.parentElement

      if (!parentElement?.contains(e.target as Node)) {
        if (visible) {
          clickOutSide?.()
        }
      }
    })

    return () => {
      doc.unsubscribe()
      observer.disconnect()
    }
  }, [visible])

  useEffect(() => {
    const observer = fromEvent(window, 'scroll').subscribe(() => {
      if (visible) {
        const modal = container.current?.parentElement as HTMLDivElement
        const node = findNode(modal)

        if (node) boundary(modal, node)
      }
    })

    return () => {
      observer.unsubscribe()
    }
  }, [visible])

  return (
    <div
      className={`otaku-popup ${className ?? ''}`}
      ref={container}
      role='tooltip'>
      {createPortal(children, (mountContainer as unknown) as Element)}
    </div>
  )
}
