import React from 'react'
import generator from 'otaku-ui/src/theme/index'
import './color.scss'


export default () => {
  return (
    <section className='color'>
      {
        ['#1F4BFF', 'red', 'orange', 'green', 'purple'].map(item => {
          return (
            <ul>
              {
                generator(item).map((color, colorIndex) => {
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