import React, { useEffect, useState } from 'react'
import NP from 'number-precision'
import classNames from 'classnames'
import throttle from 'lodash/throttle'
import './style.scss'

interface RateProps {
  count?: number
  showScore?: boolean
  score?: number
  maxScore?: number
  size?: number
  color?: string
  readonly?: boolean
  children?: React.ReactNode
  textRender?: (index: number, score: number) => React.ReactNode
}

export function Rate (props: RateProps) {
  const {
    readonly,
    color,
    showScore,
    size,
    count = 5,
    score = 0,
    maxScore = 10,
    textRender,
    children
  } = props

  const [
    star,
    setStar
  ] = useState(new Array(count).fill(undefined)
    .map(() => ({
      checked: false,
      half: false,
      click: false
    })))
  const [
    text,
    setText
  ] = useState<React.ReactNode>()

  useEffect(() => {
      init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  const render = (start: number, end: number, checked: boolean, half: boolean) => {
    if (end >= count) end = count
    for (let i = start; i < end; i++) {
      star[i].checked = checked
      star[i].half = half

      if (textRender) {
        setText(textRender(
          i,
          score
        ))
      }
    }

    setStar([...star])
  }

  const init = () => {
    const average = maxScore / count

    if (score % average === 0) {
      const end = score / average

      
      render(
        0,
        end,
        true,
        false
      )
    }

    if (score % 2 !== 0) {
      const a = score % 2
      const b = NP.minus(score, a) // score - a
      const c = Math.floor(NP.divide(b, average)) // b / average
      
      render(
        0,
        c,
        true,
        false
      )
      render(
        c,
        c + 1 >= count ? count : c + 1,
        false,
        true
      )
    }
  }


  const paint = (e: React.MouseEvent<HTMLUListElement, MouseEvent>, type: 'click' | 'mousemove' | 'mouseout') => () => {
    const { target } = e
    const index = Number(target.dataset.index)

    if (readonly) return
    if (target.classList.contains('otaku-star')) {
      if (type === 'mousemove') {
        render(
          0,
          index + 1,
          true,
          false
        )
        if (textRender) {
          setText(textRender(
            index + 1,
            score
          ))
        }
      } else if (type === 'mouseout') {
        // eslint-disable-next-line no-unmodified-loop-condition
        for (let i = index; index > 0; i--) {
          if (!star[i]?.click) {
            star[i].checked = false
          }

          if (textRender) {
            setText(textRender(
              i + 1,
              score
            ))
          }
        }
      } else {
        for (let i = 0; i < index; i++) {
          star[i].checked = true
          star[i].click = true

          if (textRender) {
            setText(textRender(
              i + 1,
              score
            ))
          }
        }
      }

      console.log(star)
      setStar([...star])
    }
  }

  return (
    <div className="otaku-rate">
      <ul
        className="otaku-star-container"
        onClick={(e) => paint(
          e,
          'click'
        )()}
        onMouseMove={(e) => throttle(
          paint(
            e,
            'mousemove'
          ),
          20
        )()}
        onMouseOut={(e) => throttle(
          paint(
            e,
            'mouseout'
          ),
          20
        )()}>
        {
          star?.map((item, index) => {
            const className = item.checked ? 'otaku-icon-star-fill' : 
            item.half ? 'otaku-icon-star-half' : 'otaku-icon-star'

            return (
              <li
                className={classNames('otaku-star',  'iconfont', className)}
                style={{
                  color,
                  fontSize: size
                }}
                key={index}
                data-index={index}
              >
                <span className={classNames()}></span>
              </li>
            )
         })
        }
        {
          showScore ? (
            <li className="otaku-rate-score">{score}</li>
          ) : text ? <li className="otaku-rate-text ">{text}</li> : ''
        }
      </ul>
    </div>
  )
}
