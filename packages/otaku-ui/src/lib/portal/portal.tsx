import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
// import throttle from 'lodash/throttle'

interface TelportProps {
  className?: string
  children: React.ReactNode
  visible?: boolean
  zIndex?: number
  visibleChange?: () => void
  onHide?: () => void
  clickOutSide?: () => void
}

interface HTMLElement {
  numberId: number
  telportId: symbol
}

let id = 1

export function Portal (props: TelportProps) {
  const container = useRef<HTMLDivElement>(null)
  // 防止 modal 关闭后，portal 渲染的元素为空
  const [mountContainer, setMountContainer] = useState(
    document.createElement('div')
  )
  const {
    children,
    className,
    zIndex = 2000,
    visible = false,
    visibleChange,
    clickOutSide
  } = props

  const selector = 'body'
  const modalRoot = document.querySelector(selector)

  const findNode = (node: Element) => {
    const children = Array.of(...modalRoot?.children)

    return children.find(ele => {
      if (ele.numberId) {
        return ele?.numberId === node?.numberId
      }
    })
  }

  const showNode = () => {
    const modal = container.current?.parentElement

    if (modal) {
      const el = findNode(modal)
      // @ts-ignore
      el.style.display = 'block'
    }
  }

  const hideNode = () => {
    const modal = container.current?.parentElement

    if (modal) {
      const el = findNode(modal)
      // @ts-ignore
      el.style.display = 'none'
    }
  }

  const init = () => {
    const el: HTMLDivElement = mountContainer
    const modal = container.current?.parentElement
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
        modalRoot?.appendChild(el)

        id++
      }

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

    if (modalRoot) observer.observe(modalRoot)
    if (container.current?.parentElement.numberId) {
      visible ? showNode() : hideNode()
    }

    visibleChange?.(visible)

    const fn = (doc: Document) => {
      const parentElement = container.current.parentElement

      // @ts-ignore
      if (!parentElement?.contains(doc.target)) {
        if (visible) {
          clickOutSide?.()
        }
      }
    }

    // @ts-ignore
    document.addEventListener('click', fn)

    return () => {
      document.removeEventListener('click', fn)
      observer.disconnect()
    }
  }, [visible])

  useEffect(() => {
    window?.addEventListener('scroll', e => {
      if (visible) {
        const modal = container.current?.parentElement
        const node = findNode(modal)

        if (node) {
          const position = modal.children[1].getBoundingClientRect()

          node.style.top = `${position.top}px`
          node.style.left = `${position.left}px`

          console.log(node, position)
        }
      }
    })
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
