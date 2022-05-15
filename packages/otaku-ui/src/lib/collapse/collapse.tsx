import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import './style.scss'

interface CollapseProps {
  children: React.ReactNode
  collapse?: boolean
}

export function Collapse (props: CollapseProps) {
  const { children, collapse = false } = props
  const [height, setHeight] = useState<number>()
  const container = useRef<HTMLElement>(null)

  /**
   * @param init 初始化默认不执行动画
   */
  const run = (init = false) => {
    if (container.current) {
      // transform: scaleY(${collapse ? 1 : 0});
      // 
      container.current.style.cssText = `
        height: ${collapse ? 'auto' : '0px'};
        transition: all linear ${init ? '0s' : '0.2s'};
      `
    }
  }
  useLayoutEffect(() => {
    Promise.resolve().then(() => {
      // const rect = container.current?.getBoundingClientRect()
      const h = container.current?.offsetHeight as number
      setHeight(h)
      run(true)
      console.log(h)
    })
  }, [])

  useEffect(() => {
    run()
  }, [collapse])

  return (
    <section className='otaku-collapse' ref={container}>
      {children}
    </section>
  )
}
