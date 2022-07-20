export interface renderArgs {
  row: Record<string, unknown>
  rowIndex: number
  columnIndex: number
}

export interface mergeSpan {
  colspan?: number
  rowspan: number
}

export interface tableColumnOptions {
  label?: number | string
  prop?: string
  defaultValue?: React.ReactNode
  render?: (data?: renderArgs) => React.ReactNode
  merge?: (data: renderArgs) => mergeSpan
}

export interface GridTableProps {
  data: Record<string, any>[]
  tableColumn: tableColumnOptions[]
  children?: React.ReactNode
}
