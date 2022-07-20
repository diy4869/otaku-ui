import React from "react"
import get from "lodash/get"
import { GridTableProps } from "./types"

export function GridTableBody(props: GridTableProps) {
  const { data = [], tableColumn = [] } = props

  const row = () => {
    // 记录所有需要合并的区间
    const mergeMap = new Map()

    let mergeStartRowIndex: number
    let mergeStartColumnIndex: number
    let mergeEndRowIndex: number
    let mergeEndColumnIndex: number

    return data.reduce((vnode, row, rowIndex) => {
      let columnIndex = 0

      const colEnd = tableColumn.length

      while (columnIndex < colEnd) {
        const children = tableColumn[columnIndex]
        const data = {
          row,
          rowIndex: rowIndex,
          columnIndex: columnIndex
        }

        const render = get(
          row,
          children.prop as string,
          children.defaultValue
        ) as string

        if (children.merge) {
          const { colspan = 1, rowspan = 1 } = children.merge(data)

          if (colspan !== 1 || rowspan !== 1) {
            const start = [rowIndex, columnIndex]
            const end = [rowIndex + (rowspan - 1), columnIndex + (colspan - 1)]


            mergeMap.set(start.join("-"), {
              start,
              end
            });

            [mergeStartRowIndex, mergeStartColumnIndex] = start;
            [mergeEndRowIndex, mergeEndColumnIndex] = end;
            // split(';')[0].match(/\d+(-)\d+/)[0].split('-')
          }
          

          // const current = [rowIndex, columnIndex]
          // const mergeMapData = mergeMap.get(current.join("-")) || {}
         

      
          if (
            rowIndex === mergeStartRowIndex &&
            columnIndex === mergeStartColumnIndex
          ) {

            const column = (
              <div
                key={`${rowIndex}-${columnIndex}`}
                className='otaku-grid-table-cell'
                style={{
                  gridColumn: `${columnIndex + 1} / ${
                    colspan + columnIndex + 1
                  }`,
                  gridRow: `${rowIndex + 1} / ${rowspan + rowIndex + 1}`
                }}
                data-colspan={colspan}
                data-rowspan={rowspan}
                data-key={`${rowIndex}-${columnIndex}`}>
                <div className='otaku-grid-table-cell-content'>
                  {rowIndex}---{columnIndex}
                  {/* {children.render ? children.render(data) : render} */}
                </div>
              </div>
            )
            // columnIndex++
            vnode.push(column)
          }

          if (
            rowIndex >= mergeStartRowIndex &&
            columnIndex >= mergeStartColumnIndex &&
            rowIndex <= mergeEndRowIndex &&
            columnIndex <= mergeEndColumnIndex
          ) {
            columnIndex++
          } else {
            const column = (
              <div
                key={`${rowIndex}-${columnIndex}`}
                className='otaku-grid-table-cell'
                data-key={`${rowIndex}-${columnIndex}`}>
                <div className='otaku-grid-table-cell-content'>
                  {rowIndex}---{columnIndex}
                  {/* {children.render ? children.render(data) : render} */}
                </div>
              </div>
            )
            vnode.push(column)
            columnIndex++
          }
        } else {
          const column = (
            <div
              key={`${rowIndex}-${columnIndex}`}
              className='otaku-grid-table-cell'
              data-key={`${rowIndex}-${columnIndex}`}>
              <div className='otaku-grid-table-cell-content'>
                {rowIndex}---{columnIndex}
                {/* {children.render ? children.render(data) : render} */}
              </div>
            </div>
          )
          vnode.push(column)
          columnIndex++
        }
      }

      return vnode
    }, [])
  }
  return (
    <ul className='otaku-grid-table-body'>
      <li
        className='otaku-grid-table-row'
        style={{
          gridTemplateColumns: `repeat(${tableColumn.length}, 1fr)`
        }}>
        {row() as React.ReactNode}
      </li>
    </ul>
  )
}
