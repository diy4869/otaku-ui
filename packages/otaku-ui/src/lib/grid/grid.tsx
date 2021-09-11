import React, { useState } from 'react'
import './style.scss'

interface GridProps {
  children: React.ReactNode[]
}

interface GridItemProps {
  children: React.ReactNode[]
}

export function Grid (props: GridProps) {
  const {
    children
  } = props

  return (
    <ul className="otaku-grid">{children}</ul>
  )
}

export function GridItem (props: GridItemProps) {
  const {
    children
  } = props

  return (
    <li className="otaku-grid-item">{children}</li>
  )
}