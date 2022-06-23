import React, { useRef, useLayoutEffect, useMemo } from 'react'
import './style.scss'

interface ProgressProps {
  inner?: boolean
  percentage?: number
  max?: number
  color?: string
  type?: 'circle'
  direction?: 'vertical' | 'horizontal'
  lineWidth?: number
}

export function Progress (props: ProgressProps) {
  const {
    percentage = 0,
    direction = 'horizontal',
    max = 100,
    type,
    inner,
    lineWidth = 8,
    color
  } = props
  
  const canvas = useRef<HTMLCanvasElement>(null)
  const value = useMemo(() => {
    const result = percentage >= max ? max : percentage

    return result + '%'
  }, [percentage, max])

  useLayoutEffect(() => {
    const ctx = canvas.current?.getContext('2d')
    const ratio = window.devicePixelRatio || 1
    const w = 150
    const h = 150

    if (canvas.current && ctx) {
      canvas.current.width = w * ratio // 实际渲染像素
      canvas.current.height = h * ratio // 实际渲染像素
      canvas.current.style.width = `${w}px` // 控制显示大小
      canvas.current.style.height = `${h}px` // 控制显示大小
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    if (ctx) {
      ctx.beginPath()
      ctx.lineWidth = 5
      ctx.strokeStyle = 'rgba(44, 104, 255, 0.06)'
      ctx.arc(w / 2, h / 2, 50, 0, Math.PI * 2)
      ctx.stroke()

      ctx.beginPath()
      ctx.lineWidth = 5
      ctx.strokeStyle = color

      // (Math.PI / 180) * 360
      ctx.arc(
        w / 2,
        h / 2,
        50,
        0,
        (percentage >= max ? max : percentage / 100) * Math.PI * 2,
        false
      )
      ctx.stroke()

      // const measureText = ctx?.measureText(`${percentage}%`)
      ctx?.beginPath()
      ctx.font = '20px sans-serif'
      ctx.textAlign = 'center'
      ctx?.fillText(value, w / 2, h / 2 + 10)
    }
  }, [percentage])

  return type === 'circle' ? (
    <canvas ref={canvas}></canvas>
  ) : direction === 'horizontal' ? (
    <div className='otaku-progress-box'>
      <div
        className='otaku-progress-container'
        style={{
          height: `${lineWidth}px`
        }}>
        <div
          className='otaku-progress'
          style={{
            width: value,
            backgroundColor: color
          }}>
          {inner && value}
        </div>
      </div>
      <span className='otaku-progress-text'>{!inner && value}</span>
    </div>
  ) : (
    <div
      className='otaku-progress-vertical'
      style={{
        width: `${lineWidth}px`
      }}>
      <div
        className='otaku-progress'
        style={{
          height: value,
          backgroundColor: color
        }}>
        {!inner && value}
      </div>
    </div>
  )
}
