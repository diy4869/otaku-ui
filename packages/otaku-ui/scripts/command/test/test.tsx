import React, { useState } from 'react'
import './style.scss'

interface TestProps {
  children: React.ReactNode
}


export function Test (props: TestProps) {
  const {
    children
  } = props

  return (
    <div></div>
  )
}
