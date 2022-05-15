import React, { useState, useEffect } from 'react'

interface VShowProps {
  show?: boolean
  force?: boolean
  className?: string
  children?: React.ReactNode
}

export function VShow (props: VShowProps) {
  const { show, force = false, className, children } = props
  const [visible, setVisible] = useState(show)

  useEffect(() => {
    setVisible(show)
  }, [show])

  if (force) {
    return (
      <>
        {
          visible ? children : null
        }
      </> 
    )
  } else {
    return (
      <section 
        className={className}
        style={{
        display: visible ? 'block' : 'none'
      }}>{children}</section>
    )
  }
}
