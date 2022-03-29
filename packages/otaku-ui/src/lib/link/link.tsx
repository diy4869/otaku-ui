import React from 'react'
import './style.scss'

export interface LinkProps {
  href?: string
  target?: '_blank' | '_self'
  children?: React.ReactNode
}


export function Link (props: LinkProps) {
  const {
    href,
    target,
    children
  } = props

  return (
    <a href={href} target={target}>{children}</a>
  )
}
