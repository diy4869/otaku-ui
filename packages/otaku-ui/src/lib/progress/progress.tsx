import React, { useRef, useLayoutEffect, useState } from 'react'
import './style.scss'

interface ProgressProps {
  inner?: boolean
  percentage?: number
  max?: number
  color?: string
  type?: 'circle'
  direction: 'vertical' | 'horizontal'
  children: React.ReactNode
}


export function Progress (props: ProgressProps) {
  const {
    percentage = 10,
    direction = 'horizontal',
    type,
    inner,
    color,
    children
  } = props
  const canvas = useRef<HTMLCanvasElement>(null)

  useLayoutEffect(() => {


    const ctx = canvas.current?.getContext('2d')
    const devicePixelRatio = window.devicePixelRatio || 1
    const backingStoreRatio = 2 || 1
    const ratio = devicePixelRatio / backingStoreRatio

    console.log(devicePixelRatio)
    canvas.current?.width = ratio * 200
    canvas.current?.height = ratio * 200

    canvas.style?.width = 165 + "px";
    canvas.style?.height = 165 + "px";
    //然后将画布缩放，将图像放大两倍画到画布上
    ctx?.scale(ratio, ratio)


    if (ctx) {
      ctx.beginPath()
      ctx.lineWidth = 10
      ctx.strokeStyle = 'rgba(44, 104, 255, 0.06)'
      ctx.arc(100, 100, 50, 0, Math.PI * 2)
      ctx.stroke()

      ctx.beginPath()
      ctx.lineWidth = 10
      ctx.strokeStyle = 'red'
      ctx.font = '20px sans-serif'
      ctx.arc(100, 100, 50, 0, Math.PI * 1)
      ctx.stroke()

      const measureText = ctx?.measureText(`${percentage}%`)
      ctx?.beginPath()      
      ctx.textAlign = 'center'
      ctx?.fillText(`${percentage}%`, 100, 100 + measureText.fontBoundingBoxAscent / 2)
      console.log(measureText)
      console.log(ctx)
    }

  }, [])

  return (
    type === 'circle' ?
      <canvas ref={canvas}></canvas>
    : direction === 'horizontal' ? 
      <div className="otaku-progress-box">
        <div className="otaku-progress-container">
          <div className="otaku-progress" style={{
            width: `${percentage}%`,
            backgroundColor: color
          }}>{inner && children }</div>
        </div>
        <span className="otaku-progress-text">{ !inner && children }</span>
      </div>
      :
      <div className="otaku-progress-vertical">
        <div className="otaku-progress" style={{
            height: `${percentage}%`,
            backgroundColor: color
        }}>{children}</div>
      </div>
  )
}
