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
  onHide?: () => void
  clickOutSide?: () => void
}

export function Telport (props: TelportProps) {
  const container = useRef(null)
  const {
    children,
    className,
    visible = false,
    onShow,
    onHide,
    clickOutSide
  } = props

  useLayoutEffect(() => {
    // const el = document.getElementsByClassName(`${className}`)
    new Tel({
      el: container.current!,
      show: visible
    })
  }, [visible]);
 
  return (
    <div className={`otaku-popup ${className ?? ''}`} ref={container} role="tooltip">
      { children }
    </div>
  )
}