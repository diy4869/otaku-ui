import React, { useState, useContext, useEffect, useLayoutEffect } from 'react'
import classNames from 'classnames'
import { findDataset } from '../../utils'
import './style.scss'

interface AnchorProps {
  target?: string | HTMLElement
  active?: string
  children: React.ReactNode
}

interface AnchorItemProps {
  href?: string
  title?: string
}

const AnchorContext = React.createContext<Omit<AnchorProps, 'children'>>({
  target: document.body
})

export function Anchor (props: AnchorProps) {
  const { target = document.body, active, children } = props
  const [current, setCurrent] = useState(active)

  const getScroll = (target: string | HTMLElement): HTMLElement => {
    if (typeof target === 'string') {
      const el = document.querySelector(target)

      if (el) return el as HTMLElement
    }
    return target as HTMLElement
  }

  useLayoutEffect(() => {
    const container = getScroll(target)
    const result = React.Children.map(children, (item: React.ReactElement) => {
      const id = encodeURIComponent(item.props.href.substring(1))

      return {
        href: item.props.href,
        offsetTop: document.getElementById(id)?.offsetTop
      }
    })

    container.addEventListener('scroll', e => {
      const scrollTop = (e.target as HTMLElement)?.scrollTop

      for (let i = result.length - 1; i >= 0; i--) {
        if (scrollTop <= result[i].offsetTop) {
          setCurrent(result[i].href)
        }
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setCurrent(active)
  }, [active])

  const scrollTo = (target: Window | HTMLElement, el: HTMLElement) => {
    target.scrollTo({
      top: el.offsetTop,
      behavior: 'smooth'
    })
  }

  const jump = (e: React.MouseEvent<HTMLUListElement>) => {
    const item = findDataset(e.target as HTMLElement, 'href')

    if (item) {
      const href = item.dataset.href
      const id = encodeURIComponent(href.substring(1))
      const el = document.getElementById(id)

      scrollTo(getScroll(target), el)
      setCurrent(href)
    }
  }

  return (
    <ul className='otaku-anchor' onClick={jump}>
      <AnchorContext.Provider
        value={{
          active: current
        }}>
        {children}
      </AnchorContext.Provider>
    </ul>
  )
}

export function AnchorItem (props: AnchorItemProps) {
  const { href, title } = props
  const context = useContext(AnchorContext)

  return (
    <li
      data-href={href}
      className={classNames('otaku-anchor-item', {
        'otaku-anchor-item-active': context.active === href
      })}>
      {title}
    </li>
  )
}
