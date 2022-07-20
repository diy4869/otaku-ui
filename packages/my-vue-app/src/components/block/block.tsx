import React, { useState } from 'react'
import './style.scss'

interface Props {
  children: string
}

export default (props: Props) => {
  console.log(props)
  return (
    <div className="site-block-container">
      {props.children}
    </div>
  )
}
