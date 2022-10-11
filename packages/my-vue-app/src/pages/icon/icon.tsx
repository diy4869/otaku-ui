import React  from 'react'
import classNames from 'classNames'
import groupBy from 'lodash/groupBy'
import { Grid, GridItem } from 'otaku-ui'

import icon from '../../../../otaku-icons/iconfont/iconfont.json'
import * as demo from '../../../../otaku-icons/src/lib/index'
import '../../../../otaku-icons/iconfont/iconfont.js'
import './icon.scss'

console.log(demo.Add)

export default () => {
  const data = groupBy(icon.icons, (item) => {
    return item.section
  })

  return (
    <div className='otaku-icon-example'>
      {
        Object.entries(data).map(item => {
          const [key, data] = item

          return (
            <section>
              <h2>{key}</h2>
               <Grid border count={6}>
                {
                  data.map(item => {
                    return (
                      <GridItem>
                        {
                          React.createElement(demo[item.class_name], {
                            key: item.class_name
                          })
                        }
                        {/* <svg className="icon" aria-hidden="true">
                          <use xlinkHref={`#icon-${item.class_name}`}></use>
                        </svg> */}
                        <span>{item.class_name}</span>
                      </GridItem>
                    )
                  })
                }
              </Grid>
            </section>
          )
        })
      }
     
    </div>
  )
}
