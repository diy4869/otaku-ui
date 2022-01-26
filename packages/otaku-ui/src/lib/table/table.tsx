import React, { useState, useEffect } from 'react'
import { Checkbox } from '../checkbox/checkbox'
import get from 'lodash/get'
import './style.scss'

interface renderArgs {
  row: {
    [key: string]: unknown
  },
  rowIndex: number
  columnIndex: number
}
interface tableColumnOptions {
  label: string
  prop: string
  defaultValue?: React.ReactNode
  render?: (data: renderArgs) => React.ReactNode
}

interface TableProps {
  data: {
    [key: string]: unknown
  }[]
  children?: React.ReactNode
  multiple?: boolean
  border?: boolean
  stripe?: boolean
  tableColumn: tableColumnOptions[]
}

export function Table(props: TableProps) {
  const {
    data,
    tableColumn,
    multiple = false
  } = props
  const [tableData, setTableData] = useState(data)

  useEffect(() => {
    setTableData(data)
  }, [data])

  return (
    <table className="otaku-table">
      <thead>
        <th className="otaku-table-header">
          {
            multiple && <td className="otaku-table-multiple">
              <Checkbox></Checkbox>
            </td>
          }
          {
            tableColumn.map((item, index: number) => {
              return (
                <td key={index}>{ item.label }</td>
              )
            })
          }
        </th>
      </thead>
      <tbody className="otaku-table-body">
        {
          tableData.map((item, index) => {
            return (
              <tr className="otaku-table-row" key={index}>
                {
                  multiple && <td className="otaku-table-multiple">
                    <Checkbox></Checkbox>
                  </td>
                }
                {
                  tableColumn.map((children, childrenIndex: number) => {
                    const data = {
                      row: item,
                      rowIndex: index,
                      columnIndex: childrenIndex
                    }

                    return (
                      <>
                        <td key={childrenIndex}>
                          {
                            children.render ? 
                            children.render(data) : 
                            get(item, children.prop, children.defaultValue)
                          }
                        </td>
                      </>
                    )
                  })
                }
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
