import React, { useState } from 'react'

interface Props {
  children?: React.ReactChildren
}

export default function MdReact (props: Props) {
  return (
    <div>{ props.children }</div>
  )
}
