import React, { useState, useEffect } from 'react'
// import { fromEvent, interval } from 'rxjs'
// import { throttleTime } from 'rxjs/operators'
import throttle from 'lodash/throttle'

import './style.scss'

interface RateProps {
  count?: number
  showScore?: boolean
  score?: number
  maxScore?: number
  size?: number
  color?: string
  textRender?: (index: number, score: number) => string
  readonly?: boolean
}

export default (props: RateProps) => {
  const {
    readonly,
    color,
    showScore,
    size,
    count = 5,
    score = 0,
    maxScore = 10,
    textRender
  } = props

  const [star, setStar] = useState(new Array(count).fill(undefined).map(item => {
    return {
      checked: false,
      half: false,
      click: false
    }
  }))
  const [text, setText] = useState('')

  useEffect(() => {
    init()
  }, [])

  const render = (start: number, end: number, checked: boolean, half: boolean) => {
    for (let i = start; i < end; i++) {
      star[i].checked = checked
      star[i].half = half

      if (textRender) setText(textRender(i, score))
    }

    setStar([...star])
  }

  const init = () => {
    const average = maxScore / count

    if (score % average === 0) {
      const end = score / average

      render(0, end, true, false)
    }

    if (score % 2 !== 0) {
      const a = score % 2
      const b = score - a
      const c = b / average

      render(0, c, true, false)
      render(c, c + 1, false, true)
    }
  }

  const paint = (e, type: 'click' | 'mousemove' | 'mouseout') => {
    return () => {
      const target = e.target
      const index = +target.dataset.index

      if (readonly) return
      if (e.target.classList.contains('b-star')) {
        if (type === 'mousemove') {
          render(0, index + 1, true, false)
        } else if (type === 'mouseout') {
          for (let i = index; index > 0; i--) {
            if (!star[i]?.click) {
              star[i].checked = false
            }

            if (textRender) setText(textRender(i, score))
          }
        } else {
          for (let i = 0; i < index; i++) {
            star[i].checked = true
            star[i].click = true

            if (textRender) setText(textRender(i, score))
          }
        }

        setStar([...star])
      }
    }
  }

  return (
    <div className="b-rate">
      <ul
        className="b-star-container"
        onClick={(e) => paint(e, 'click')()}
        onMouseMove={(e) => throttle(paint(e, 'mousemove'), 20)()}
        onMouseOut={(e) => throttle(paint(e, 'mouseout'), 20)()}>
        {
          star?.map((item, index) => {
            return (
              <li
                className={`b-star iconfont ${item.checked ? 'b-icon-star-fill' : item.half ? 'b-icon-star-half' : 'b-icon-star'}`}
                style={{
                  color,
                  fontSize: size
                }}
                key={index}
                data-index={index}
              ></li>
            )
          })
        }
        {
          text ? <li className="b-rate-text">{text}</li> : ''
        }
        {
          showScore ? <li className="b-rate-score">{score}</li> : ''
        }
      </ul>
    </div>
  )
}
