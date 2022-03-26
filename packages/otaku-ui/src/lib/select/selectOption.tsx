import React, { useContext } from 'react'
import { SelectContext } from './select'
import classNames from 'classnames'
import { Icon } from '../icon/icon'

export interface SelectOptionsProps {
  value?: number | string
  children?: React.ReactNode[]
}

export function SelectOption (props: SelectOptionsProps) {
  const { value, children } = props
  const { selected, multiple } = useContext(SelectContext)

  const className = multiple && 
    Array.isArray(selected) &&
    selected.includes(value) ? 
    'otaku-select-option-multiple-active' : selected === value ? 'otaku-select-option-active' : ''

  return (
    <li 
      className={classNames('otaku-select-option', className)}
      value={value}>
      <span value={value}>{children}</span>
        {
          multiple && 
          Array.isArray(selected) && 
          selected.includes(value) && 
          <Icon name="select-bold"></Icon>
        }
    </li>
  )
}
