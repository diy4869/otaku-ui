import React from 'react'
import ReactDOM from 'react-dom/client'
import { Message } from './message'
import { styleToStr } from '../../utils'
// import debounce from 'lodash/debounce'


type MessageType = 'info' | 'success' | 'warning' | 'error'

interface Options {
  duration?: number
  type?: MessageType
  content?: React.ReactNode
}

let noticeId = 1
const noticeInstance: number[] = []

export class Notice {
  id: number
  finish: boolean

  container: HTMLDivElement | null
  timer: unknown

  constructor () {
    this.id = noticeId
    this.finish = false
    this.container = null
    this.timer = undefined

    this.init()
  }

  init() {
    const container = document.getElementById('otaku-notice-container')
    if (!container) {
      this.container = document.createElement('div')
      this.container.id = `otaku-notice-container`
      this.container.style.cssText = styleToStr({
        position: 'fixed',
        top: '20px',
        left: '50%'
      })
      document.body.appendChild(this.container)
    }
  }

  create(options: Options) {
    const { content, duration = 3000, type = 'info' } = options
    const container = document.createElement('div')
    
    noticeInstance.push(noticeId)
    container.id = `notice-${noticeId++}`
    container.style.marginBottom = '10px'
    this.container?.appendChild(container)
    ReactDOM.createRoot(container).render(<Message type={type}>{content}</Message>)

    setTimeout(() => {
      this.destory()
    }, duration)
  }

  destory() {
    if (noticeInstance.length === 0) return

    const id = noticeInstance.shift()
    const container = document.getElementById(`notice-${id}`) as HTMLElement
        
    this.container?.removeChild(container)

  }
}

let instance: Notice | null = null

interface message {
  info? (message: React.ReactNode, time: number): void
  success?(message: React.ReactNode, time: number): void
  warning?(message: React.ReactNode, time: number): void
  error?(message: React.ReactNode, time: number): void
}


const type = ['info', 'success', 'warning', 'error']

if (!instance) {
  instance = new Notice()
}

const message: message = {}

type.forEach((current) => {
  message[current as MessageType] = (content: React.ReactNode, duration = 3000) => {
      instance?.create({
        type: current as Options['type'],
        content,
        duration: duration
      })
  }
})

export {
  message
}

