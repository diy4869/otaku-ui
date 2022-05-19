import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Icon } from '../icon/icon'
import { Checkbox } from '../checkbox'
import { Collapse } from '../collapse/collapse'
import { Store } from './store'
import { Node } from './store/node'
import { Space } from '../space/space'
import { VShow } from '../../directive/vShow'
import './style.scss'

export interface TreeOptions {
  id: string
  name: string
  children?: string
}

export interface TreeProps {
  data: Record<string, unknown>[]
  options: TreeOptions
  loadTree?: (node?: Node, resolve?: (res?: unknown) => void, reject?: (err?: unknown) => void) => void
}

export function Tree (props: TreeProps) {
  const {
    options = {
      id: 'id',
      name: 'name',
      children: 'children'
    },
    data,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    loadTree = () => {}
  } = props

  const store = new Store(data, options)
  const [tree, setTree] = useState(store.createTree(data))

  useEffect(() => {
    setTree(store.createTree(data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const createTree = (data: Node[] | null) => {
    if (!data) return
    return (
      <ul className={classNames('otaku-tree')}>
        {
          data.map(node => {
            return (
              <li key={node.id} className={classNames('otaku-tree-node')}>
                <Space gap={5} center>
                  <div style={{
                    width: '14px'
                  }}>
                    <VShow show={!!loadTree || !!node.children && node?.children?.length !== 0}>
                      <Icon 
                        name='caret-right'
                        className={classNames('otaku-tree-arrow', {
                          'otaku-tree-arrow-rotate': node.collapse
                        })}
                        color="#c8c8c8"
                        size={14}
                        onClick={() => {
                          node?.load((resolve, reject) => {
                            if (!node.loaded) {
                              loadTree?.(node, resolve, reject)
                            }
                          }).then(() => {
                            setTree([...tree])
                          })
                          node.setCollapse(!node.collapse)
                          setTree([...tree])
                        }}></Icon>
                    </VShow>
                  </div>
                  <VShow show={node.loading && !node.loaded}>
                    <Icon name='loading' className='otaku-tree-loading'></Icon>
                  </VShow>
                  <Checkbox 
                    checked={node.checked} 
                    indeterminate={node.indeterminate}
                    onChange={(e) => {
                      node.setChecked(e?.target.checked)
                      setTree([...tree])
                    }}></Checkbox>
                  <span>{node.name} --- loading: {'' + node.loading} --- loaded: {'' + node.loaded}</span>
                </Space>
                
                {/* <span>depth: {node.depth}</span> */}
                <Collapse collapse={node.collapse}>
                  {createTree(node.children)}
                </Collapse>
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
