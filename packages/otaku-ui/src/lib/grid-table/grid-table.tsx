import React, { useState } from 'react'
import get from 'lodash/get'
import './style.scss'

export interface renderArgs {
  row: Record<string, unknown>
  rowIndex: number
  columnIndex: number
}

export interface tableColumnOptions {
  label?: number | string
  prop?: string
  defaultValue?: React.ReactNode
  render?: (data?: renderArgs) => React.ReactNode
}

export interface GridTableProps {
  data: Record<string, any>[]
  tableColumn: tableColumnOptions[]
  children?: React.ReactNode
}

export function GridTable (props: GridTableProps) {
  const { data = [], tableColumn = [] } = props

  return (
    <section className='otaku-grid-table-container'>
      <ul className="otaku-grid-table-header"  style={{
          gridTemplateColumns: `repeat(${tableColumn.length}, 1fr)`
        }}>
        {
          tableColumn.map((item, index) => {
            return (
              <li key={index}>
                <div className="otaku-grid-table-cell">{item.label}</div>
              </li>
            )
          })
        }
      </ul>
      <ul className="otaku-grid-table-body">
        {data.map((item, index) => {
          return (
            <li className='otaku-grid-table-row' key={index} style={{
              gridTemplateColumns: `repeat(${tableColumn.length}, 1fr)`
            }}>
              {tableColumn.map((children, childrenIndex: number) => {
                const data = {
                  row: item,
                  rowIndex: index,
                  columnIndex: childrenIndex
                }

                const render = get(
                  item,
                  children.prop as string,
                  children.defaultValue
                ) as string

                return (
                  <>
                    <div key={childrenIndex} className='otaku-grid-table-cell'>
                      <div className='otaku-grid-table-cell-content'>
                        {children.render ? children.render(data) : render}
                      </div>
                    </div>
                  </>
                )
              })}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
