import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Checkbox } from '../checkbox'
import { Store } from './store'
import { Node } from './store/node'
import './style.scss'

export interface TreeOptions {
  id: string
  name: string
  children?: string
}

export interface TreeProps {
  data: Record<string, unknown>[]
  options: TreeOptions
}

export function Tree (props: TreeProps) {
  const {
    options = {
      id: 'id',
      name: 'name',
      children: 'children'
    },
    data
  } = props

  const store = new Store(data, options)
  const [tree, setTree] = useState(store.createTree(data))

  const createTree = (data: Node[] | null) => {
    if (!data) return
    return (
      <ul className={classNames('otaku-tree')}>
        {
          data.map(node => {
            return (
              <li key={node.id} className={classNames('otaku-tree-node')}>
                <section>
                  <Checkbox 
                    checked={node.checked} 
                    indeterminate={node.indeterminate}
                    onChange={(e) => {
                      node.setChecked(e?.target.checked)
                      setTree([...tree])
                    }}></Checkbox>
                  <span>{node.name} ---- checked: {node.checked + ''} --- indeterminate: {node.indeterminate + ''} </span>
                </section>
                
                {/* <span>depth: {node.depth}</span> */}
                {createTree(node.children)}
              </li>
            )
          })
        }
      </ul>
    )
  }
  console.log(tree)
  return createTree(tree)
}
