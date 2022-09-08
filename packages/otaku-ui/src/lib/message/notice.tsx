import React from 'react'
import { Notice } from '../../utils/notice'
import { Message } from './message'

type MessageType = 'info' | 'success' | 'warning' | 'error'

const type = ['info', 'success', 'warning', 'error']

// type message = {
//   [K in MessageType]?: (message: React.ReactNode, time?: number) => void
// }

const message = type.reduce((o: any, current) => {
  o[current as MessageType] = function createMessage (content: string, time = 3000) {
    const instance = new Notice({
      rootStyle: {
        position: 'fixed',
        top: '10px',
        left: '50%'
      }
    })
    const timeout = setTimeout(() => {
      instance.destory()
    }, time)

    instance.create({
      style: {
        'margin-top': '20px',
        'transition': 'all 0.3s linear'
      },
      content: <Message type={current as MessageType} onClose={() => {
        instance.destory()
        clearTimeout(timeout)
  
      }}>{content}</Message>
    })
  }
  
  return o
}, {})

export {
  message,
  Notice
}
