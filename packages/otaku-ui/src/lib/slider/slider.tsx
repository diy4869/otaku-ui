import React, { useState, useEffect, useRef } from 'react'
import './style.scss'

export interface SliderProps {
  value: [number, number]
  children: React.ReactNode
}


interface SliderItemOptions {
  id: number
  value: number
  offset: number
}

export function Slider (props: SliderProps) {
  const {
    value = [20, 50],
  } = props
  const sliderRef = useRef(null)
  const [width, setWidth] = useState(0)
  const [rect, setRect] = useState<Pick<DOMRect, 'width' | 'x'>>({ width: 0, x: 0})
  const [offset, setOffset] = useState(0)
  const [data, setData] = useState<SliderItemOptions[]>([])
  
  useEffect(() => {
    if (sliderRef.current) {
      setRect((sliderRef.current as HTMLElement)?.getBoundingClientRect())
    }
  }, [])

  useEffect(()  => {
    const result = value.map((item, index) => {
      const offset = (rect.width / 100) * item

      return {
        id: index,
        value: item,
        offset: offset
      }
    })

    update(result)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rect])

  const update = (list: SliderItemOptions[]) => {
    setData(list)
    setWidth(list?.[1]?.offset - list?.[0]?.offset)
    setOffset(list?.[0]?.offset)
  }

  const mousedown = (e: React.BaseSyntheticEvent, index: number) => {
    e.preventDefault()
    e.target.addEventListener('mousemove', ({ clientX }) => {

      const el = e.target as HTMLElement
      const w = el.offsetWidth
      const max = rect.width - w

      let left = clientX - rect.x - w / 2

      if (left < 0) {
        left = 0
      } else if (left > max) {
        left = max
      }

      data[index].offset = left
      data[index].value = left === max ? 100 : Number((left / max * 100).toFixed(0)) 

      console.log(data.map(item => item.offset), data.map(item => item.value))
      
      data.sort((a, b) => a.offset - b.offset)
      update(data)
    })
  }

  const mouseup = (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    e.target.onmousemove = null
  }

  document.addEventListener('mouseup', (e) => {
    e.preventDefault()
    document.onmousemove = () => {
      e.preventDefault()
    }
  })

  return (
    <>
      <div className="otaku-slider-container" ref={sliderRef}>
        <section className="otaku-slider">
          <div className="otaku-slider-line" style={{
            width: width + 'px',
            left: offset + 'px'
          }}>
          </div>
        </section>
        <ul className="otaku-slider-bar-container">
          {
            data.map((item, index) => {
              return (
                <li 
                  key={item.id} 
                  // onMouseMove={e => mousemove(e, index)} 
                  onMouseUp={mouseup}
                  onMouseDown={(e) => mousedown(e, index)}
                  style={{
                    left: item.offset + 'px'
                  }}>
                    <span></span>
                    <span>{item.value}</span>
                </li>
              )
            })
          }
        </ul>
      </div>
    </> 
  )
}
