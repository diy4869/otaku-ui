import React, { useState } from 'react'
import { Link } from '../../lib/link/link'
import './style.scss'

interface AnchorProps {
  children: React.ReactNode
}

interface AnchorItemProps {
  href?: string
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
  const { href, title } = props

  return (
    <li className='otaku-anchor-item'>
      <Link href={href}>{title}</Link>
    </li>
  )
}