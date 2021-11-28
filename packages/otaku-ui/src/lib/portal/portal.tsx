import React, {
  useLayoutEffect,
  useRef,
  } from 'react';
import { Teleport } from '../../utils/index';


interface TelportProps {
  className?: string
  children: React.ReactNode
  visible?: boolean
  onShow?:() => void
  onHide?: () => void
  clickOutSide?: () => void
}

export function Portal (props: TelportProps) {
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
    // eslint-disable-next-line no-new
    new Teleport({
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