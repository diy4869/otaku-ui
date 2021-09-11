import React, {
  useLayoutEffect,
  useRef,
  } from 'react';
;
import { Teleport as Tel } from '../../utils/index';

interface TelportProps {
  className?: string
  children: React.ReactNode
  visible?: boolean
  onShow?:() => void
  onHide?:() => void
}

export function Telport (props: TelportProps) {
  const container = useRef(null)
  const {
    children,
    className,
    visible = false,
    onShow,
    onHide
  } = props

  useLayoutEffect(() => {
    const el = document.getElementsByClassName(`${className}`)
    console.log(document.getElementsByClassName(`b-popup`)[0].getBoundingClientRect())
    new Tel({
      el: container.current!,
      show: visible
    })
    console.log(visible)
  }, [visible]);
 
  return (
    <div className={`b-popup ${className ?? ''}`} ref={container} role="tooltip">
      { children }
    </div>
  )
}