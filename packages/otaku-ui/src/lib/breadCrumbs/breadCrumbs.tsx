import React, { useContext } from 'react'
import './style.scss'

export interface BreadCrumbsProps {
  separator?: React.ReactNode
  children?: React.ReactNode
}

export interface BreadCrumbsItemProps extends BreadCrumbsProps {
  icon?: React.ReactNode
}

const Context = React.createContext<BreadCrumbsProps| null>(null)
  
export function BreadCrumbsItem (props: BreadCrumbsItemProps) {
  const {
    icon,
    children
  } = props

  const data = useContext(Context)

  return (
    <li className="otaku-bread-crumbs-item">
      {icon && <span className="otaku-bread-crumbs-icon">{icon}</span>}
      <span className="otaku-bread-crumbs-content">{children}</span>
      <span className="otaku-bread-crumbs-separator">{data?.separator}</span>
    </li>
  )
}

export function BreadCrumbs (props: BreadCrumbsProps) {
  const {
    separator = <span className={`iconfont otaku-icon-right`}></span>,
    children
  } = props

  return (
    <Context.Provider value={{
      separator
    }}>
      <ul className="otaku-bread-crumbs">
        {children}
      </ul>
    </Context.Provider>
  )
}
