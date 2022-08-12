import React, { useRef, useEffect } from 'react'
// import { createPopper } from '@popperjs/core'
import tippy from 'tippy.js'
import 'tippy.js/themes/light.css'
import './style.scss'

type A = 'top' | 'left' | 'right' | 'bottom'
type B = 'start' | 'end'
type C = `${A}-${B}` | A

interface PopoverProps {
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

export function Popover (props: PopoverProps) {
  const container = useRef(null)
  const popover = useRef(null)
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
    // createPopper(container.current!, popover.current!, {
    //   placement,
    //   modifiers: [
    //     {
    //       name: 'flip',
    //       enabled: true,
    //       options: {
    //         fallbackPlacements: ['top', 'bottom'],
    //       }
    //     },
    //     {
    //       name: 'offset',
    //       options: {
    //         offset: [0, 8],
    //       },
    //     },
    //   ],
    // })
    if (container.current) {
      tippy(container.current, {
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
    }
  })

  return (
    <>
      <div className="otaku-popover-container">
        <div ref={container}>{children}</div>
        <div ref={popover} className="otaku-popover-tooltip">
          {content}
          <div className="otaku-popover-arrow" data-popper-arrow></div>
        </div>
      </div>
    </>
  )
}
