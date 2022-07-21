import React, { useState } from 'react'
import './style.scss'

interface Props {
  children: string
}

export default (props: Props) => {
  return (
    <div className="site-block-container">
      {props.children}
    </div>
  )
}
