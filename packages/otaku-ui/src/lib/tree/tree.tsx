import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Icon } from '../icon/icon'
import { Checkbox } from '../checkbox'
// import { Collapse } from '../collapse/collapse'
import { Store } from './store'
import { Node } from './store/node'
import { Space } from '../space/space'
import { VShow } from '../../directive/vShow'
import { flattern } from '../../utils'
import './style.scss'

export interface TreeOptions {
  id: string
  name: string
  children?: string
}

export interface TreeProps {
  data?: Record<string, unknown>[]
  options?: TreeOptions
  accordion?: boolean
  loadTree?: (node?: Node, resolve?: (res?: unknown) => void, reject?: (err?: unknown) => void) => void
}

export function Tree (props: TreeProps) {
  const {
    options = {
      id: 'id',
      name: 'name',
      children: 'children'
    },
    data = [],
    accordion = true,
    loadTree
  } = props
  const async = typeof loadTree === 'function'
  const store = new Store(data, {
    treeOptions: options,
    async,
    accordion
  })
  const [tree, setTree] = useState(store.createTree(data))
  const [flatternTree, setFlatternTree] = useState<Node[]>(flattern(tree) as Node[])

  useEffect(() => {
    setTree(store.createTree(data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    setFlatternTree(flattern(tree) as Node[])
  }, [tree])

  const showNode = (node: Node | null): boolean => {
    if (!node) return false
    if (node.parent?.collapse === false) return false
    if (node.depth === 1) return true
    
    return showNode(node.parent)
  }

  return (
    <ul className={classNames('otaku-tree')}>
    {
      flatternTree.map((node) => {
        return (
          <li key={node.id} className={classNames('otaku-tree-node')} style={{
            marginLeft: `${(node.depth - 1) * 20}px`,
            display: showNode(node) ? 'block' : 'none'
          }}>
            <Space gap={3} center>
              <div style={{
                width: '14px'
              }}>
                <VShow show={async || !!node.children && node?.children?.length !== 0}>
                  <Icon 
                    name='caret-right'
                    className={classNames('otaku-tree-arrow', {
                      'otaku-tree-arrow-rotate': node.collapse
                    })}
                    color="#c8c8c8"
                    size={14}
                    onClick={ () => {
                      node.setLoading(true)
                      setTree([...tree])
                      
                      if (async && !node.loaded) {
                        node?.load?.((resolve, reject) => {
                          if (!node.loaded) {
                            loadTree?.(node, resolve, reject)
                          }
                        })?.then(() => {
                          node.setCollapse(!node.collapse)
                          setTree([...tree])
                        })
                      } else {
                        node.setCollapse(!node.collapse)
                        setTree([...tree])
                      }                          
                    }}></Icon>
                </VShow>
              </div>
              <VShow show={async && node.loading && !node.loaded}>
                <Icon name='loading' className='otaku-tree-loading'></Icon>
              </VShow>
              <Checkbox 
                checked={node.checked} 
                indeterminate={node.indeterminate}
                onChange={(e) => {
                  node.setChecked(e?.target.checked)
                  setTree([...tree])
                }}></Checkbox>
              <span>{node.name} --- collapse: {'' + node.collapse} --- loaded: {'' + node.loaded}</span>
            </Space>
            
          </li>
        )
      })
    }
  </ul>
  )
}
