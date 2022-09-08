import React from 'react'
import ReactDOM from 'react-dom/client'
import { styleToStr } from './index'

let noticeId = 1

interface noticeCreateOptions {
  content: React.ReactChild
  style?: Record<string, string>
  className?: string
}

interface noticeOptions {
  rootStyle?: Record<string, string>
  zIndex?: number
}

export class Notice {
  id: number
  container: HTMLElement | null
  rootStyle: Record<string, string>
  zIndex: number

  constructor (options: noticeOptions) {
    const { rootStyle = {}, zIndex = 2000 } = options
    this.id = noticeId
    this.container = null
    this.rootStyle = rootStyle
    this.zIndex = zIndex

    this.init()
  }

  init() {
    const container = document.getElementById('otaku-notice-container')
    if (!container) {
      this.container = document.createElement('section')
      this.container.id = `otaku-notice-container`
      this.container.style.cssText = styleToStr({
        ...this.rootStyle,
        'z-index': this.zIndex
      })
      document.body.appendChild(this.container)
    } else {
      this.container = container
    }   
  }

  create(options: noticeCreateOptions) {
    const { content, style = {}, className = '' } = options
    const container = document.createElement('div')
    
    container.id = `notice-${noticeId++}`
    container.className = className
    container.style.cssText = styleToStr(style)
    this.container?.appendChild(container)
    ReactDOM.createRoot(container).render(content)
  }

  destory() {
    const container = document.querySelector(`#otaku-notice-container #notice-${this.id}`) as HTMLElement        
    this.container?.removeChild(container)
  }
}
