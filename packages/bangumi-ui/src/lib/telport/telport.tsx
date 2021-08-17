import React, {
  useLayoutEffect,
  useRef,
  } from 'react';
;
import { Telport as Tel } from '../../utils/index';

interface TelportProps {
  className?: string
  children: React.ReactNode
}

export function Telport (props: TelportProps) {
  const container = useRef(null)
  const {
    children,
    className
  } = props

  useLayoutEffect(() => {
    // debugger
    const el = document.getElementsByClassName(`${className}`)
    console.log(document.getElementsByClassName(`${className}`)[0].parentElement?.getBoundingClientRect())
      // setTimeout(() =>{
      //   new Tel({
      //     el: container.current!
      //   })
      // }, 0)
    // createPopper(document.querySelector(`body`) as Element, document.getElementsByClassName(`b-popup`)[0] as HTMLElement, {
    //   placement: 'bottom'
    // })

  }, []);
 
  return (
    <div className={`b-popup ${className ?? ''}`} ref={container} role="tooltip">
      { children }
    </div>
  )
}