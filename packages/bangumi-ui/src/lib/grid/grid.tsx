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
    <ul className="b-grid">{children}</ul>
  )
}

export function GridItem (props: GridItemProps) {
  const {
    children
  } = props

  return (
    <li className="b-grid-item">{children}</li>
  )
}