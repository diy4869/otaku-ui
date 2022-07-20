import React from 'react'
import { GridTableBody } from './grid-table-body'
import { GridTableHeader } from './grid-table-header'
import { GridTableProps } from './types'
import './style.scss'

export function GridTable (props: GridTableProps) {
  return (
    <section className='otaku-grid-table-container'>
      <GridTableHeader {...props}></GridTableHeader>
      <GridTableBody {...props}></GridTableBody>
    </section>
  )
}
