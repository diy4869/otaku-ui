import React, { useState } from 'react'
import './style.scss'

interface Props {
  title: string,
  children: React.ReactChildren
}

export default (props: Props) => {
  
  const {
    title,
    children
  } = props
  return (
    <div className="b-desc">
      <div className="title">{title}</div>
      <div className="content"></div>
    </div>
  )
}
