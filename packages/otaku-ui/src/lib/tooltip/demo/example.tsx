import React, { useRef } from 'react'
import { Tooltip, Button } from 'otaku-ui'
import './style.scss'
export default function Example() {
  const a = ['top', 'left', 'right', 'bottom']
  const b = ['start', 'end']
  const c = a.reduce((total, current) => {
      total.push(`${current}-${b[0]}` as never)
      total.push(current as never)
      total.push(`${current}-${b[1]}` as never)
      
    return total
  }, [])

  console.log(c)
  return (
    <div className='example-tooltip'>
      {
        c.map(item => {
          return (
            <Tooltip placement={item} content={item}>
              <Button>tooltip</Button>
            </Tooltip>
          )
        })
      }
    </div>
  )
}
