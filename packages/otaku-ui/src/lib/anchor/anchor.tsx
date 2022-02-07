import React, { useState } from 'react'
import './style.scss'

interface AnchorProps {
  children: React.ReactNode
}

interface AnchorItemProps {
  title?: string
}


export function Anchor (props: AnchorProps) {
  const {
    children
  } = props

  return (
    <ul className='otaku-anchor'>
      { children }
    </ul>
  )
}

export function AnchorItem (props: AnchorItemProps) {
  const { title } = props

  return (
    <li className='otaku-anchor-item'>{title}</li>
  )
}