import React from 'react'
import { generate } from 'otaku-ui/src/theme/index'
import './color.scss'


export default () => {
  return (
    <section className='color'>
      {
        ['#060606', '#1F4BFF', '#f5222d', 'orange', 'green', 'purple'].map(item => {
          return (
            <ul className='colors'>
              {
                generate(item).map((color, colorIndex) => {
                  return (
                    <li 
                      key={colorIndex}
                      style={{
                        backgroundColor: color
                      }}>{color}</li>
                  )
                })
              }
              
            </ul>
          )
        }) 
      }
    </section>
  )
}