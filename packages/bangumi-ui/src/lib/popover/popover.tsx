import React, { useRef, useEffect } from 'react'
import { createPopper } from '@popperjs/core'
import './style.scss'

type A = 'top' | 'left' | 'right' | 'bottom'
type B = 'start' | 'end'
type C = `${A}-${B}` | A

interface PopoverProps {
  children?: React.ReactNode
  content: React.ReactNode
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
    placement = 'bottom',
    theme,
    trigger,
    interactive = true,
    delay,
    duration,
    maxWidth
  } = props

  useEffect(() => {
    createPopper(container.current!, popover.current!, {
      placement,
      modifiers: [
        {
          name: 'flip',
          enabled: true,
          options: {
            fallbackPlacements: ['top', 'bottom'],
          }
        },
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    })
    // tippy(ref.current!, {
    //   content,
    //   placement,
    //   arrow,
    //   theme,
    //   trigger,
    //   interactive,
    //   duration,
    //   delay,
    //   maxWidth
    // })
  })

  return (
    <>
      <div className="b-popover-container">
        <div ref={container}>{children}</div>
        <div ref={popover} className="b-popover-tooltip">
          {content}
          <div className="b-popover-arrow" data-popper-arrow></div>
        </div>
      </div>
    </>
  )
}
