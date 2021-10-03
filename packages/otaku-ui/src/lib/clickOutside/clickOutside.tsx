import React, { useEffect, useRef } from 'react'

interface ClickOutSideProps {
  clickOutSide: () => void
  children: React.ReactNode
}

export function ClickOutSide (props: ClickOutSideProps) {
  const {
    clickOutSide,
    children
  } = props
  const ele = useRef(null)

  useEffect(() => {
    const fn = (doc: Document) => {
      //@ts-ignore
        if (!ele.current?.contains(doc.target)) {
          clickOutSide()
        }
    }

    //@ts-ignore
    document.addEventListener('click', fn)

    return (() => {
      //@ts-ignore
      document.removeEventListener('click', fn)
    })
  }, [])

  return (
    <div ref={ele}>
      {children}
    </div>
  )
}
