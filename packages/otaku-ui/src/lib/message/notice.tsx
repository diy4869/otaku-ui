import React from 'react'
import ReactDOM from 'react-dom'
import { message, Message } from './message'
import { styleToStr } from '../../utils'
import debounce from 'lodash/debounce'


interface Options {
  duration?: number
  type?: 'info' | 'success' | 'warning' | 'error'
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
    ReactDOM.render(<Message type={type}>{content}</Message>, container)

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
  info? (message: React.ReactNode): void
  success?(message: React.ReactNode): void
  warning?(message: React.ReactNode): void
  error?(message: React.ReactNode): void
}


const type = ['info', 'success', 'warning', 'error']

if (!instance) {
  instance = new Notice()
}

const message: message = {}

type.forEach(current => {
  message[current as Options['type']] = (content: React.ReactNode, duration = 3000) => {
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

