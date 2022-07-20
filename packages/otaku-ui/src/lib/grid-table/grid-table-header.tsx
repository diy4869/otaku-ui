import React from 'react'
import { GridTableProps } from './types'


export function GridTableHeader (props: GridTableProps) {
  const { tableColumn = [] } = props

  return (
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
  )
}