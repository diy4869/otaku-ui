import React, { useRef, useEffect } from 'react'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import 'tippy.js/themes/light-border.css'
import 'tippy.js/themes/material.css'
import 'tippy.js/themes/translucent.css'

type A = 'top' | 'left' | 'right' | 'bottom'
type B = 'start' | 'end'
type C = `${A}-${B}` | A

interface TooltipProps {
  children?: React.ReactNode
  content: string
  placement?: C
  arrow?: boolean
  theme?: "light" | "light-border" | "material" | "translucent"
  trigger?: "click" | "focus"
  interactive?: boolean,
  delay?: number | [number, number]
  duration?: number | [number, number]
  maxWidth?: number | 'none'
}

export function Tooltip(props: TooltipProps) {
  const ref = useRef(null)
  const {
    children,
    content,
    arrow,
    placement,
    theme,
    trigger,
    interactive = true,
    delay,
    duration,
    maxWidth
  } = props

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    tippy(ref.current!, {
      content,
      placement,
      arrow,
      theme,
      trigger,
      interactive,
      duration,
      delay,
      maxWidth
    })
  })

  return (
    <div className="otaku-tooltip" ref={ref}>{children}</div>
  )
}
