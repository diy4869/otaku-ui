/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useContext, useEffect } from 'react'
import classNames from 'classnames'
import { findDataset } from '../../utils/index'
import './style.scss'

interface TabProps {
  active: number | string | undefined
  center?: boolean
  children?: React.ReactElement[]
  onChange?: (val: {
    value: number | string | undefined
    index: number
  }) => void
}

interface TabPaneProps {
  name: React.ReactNode
  id: number | string
  children?: React.ReactNode
}

interface tabContext {
  current: number | string
}

const Context = React.createContext<tabContext>({ current: 0 })

export function TabPane (props: TabPaneProps) {
  const { id, name } = props
  const { current } = useContext(Context)

  return (
    <li
      className={classNames('otaku-tab-pane', {
        'otaku-tab-pane-active': current === `${id}`
      })}
      data-id={id}>
      <span data-id={id}>{name}</span>
    </li>
  )
}

export function Tab (props: TabProps) {
  const { center, active, onChange } = props

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const children = props.children
    ? Array.isArray(props.children)
      ? props.children
      : [props.children]
    : []
  const [current, setCurrent] = useState(active)
  const [tabData, setTabData] = useState<React.ReactElement>()

  useEffect(() => {
    const findIndex = children.findIndex(item => item.props.id === active)

    if (findIndex !== -1) {
      setTabData(children[findIndex])
      setCurrent(children[findIndex].props.id)
    }
  }, [active, children])

  const tabClick = (e: React.BaseSyntheticEvent) => {
    const element = findDataset(e.target as HTMLElement, 'id')
    const id = element?.dataset.id

    if (element) {
      const findIndex = children.findIndex(item => `${item.props.id}` === id)

      if (findIndex !== -1) {
        // 如果 2 次 点击的都是同一个 则取消当前选中状态
        if (current === children[findIndex].props.id) {
          setTabData(undefined)
          setCurrent(undefined)

          onChange?.({
            value: undefined,
            index: -1
          })
        } else {
          setTabData(children[findIndex])
          setCurrent(children[findIndex].props.id)

          onChange?.({
            value: children[findIndex].props.id,
            index: findIndex
          })
        }
      }
    }
  }

  return (
    <Context.Provider
      value={{
        current: `${current}`
      }}>
      <ul
        className={classNames('otaku-tab', {
          'otaku-tab-center': center,
          'otaku-tab-active': current !== undefined
        })}
        role='presentation'
        onClick={tabClick}>
        {React.Children.map(children, node => {
          return React.cloneElement<TabPaneProps>(node, {
            ...node.props
            // index: index
          })
        })}
      </ul>
      <aside className="otaku-tab-content">{tabData?.props.children}</aside>
    </Context.Provider>
  )
}
