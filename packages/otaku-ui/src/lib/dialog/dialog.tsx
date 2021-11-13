import React, { useState } from 'react'
import { Portal } from '../portal/portal'
import './style.scss'

interface DialogProps {
  children: React.ReactNode
}

export function Dialog (props: DialogProps) {
  const { children } = props

  return (
    <Portal visible={true}>
      <div className='otaku-dialog-mask'>
        <div className='otaku-dialog'>
          <header className='otaku-dialog-header'>title</header>
          <main className='otaku-dialog-content'>{children}</main>
          <footer className='otaku-dialog-footer'></footer>
        </div>
      </div>
    </Portal>
  )
}
