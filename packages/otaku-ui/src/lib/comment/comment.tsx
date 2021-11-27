import React, { useState } from 'react'
import './style.scss'
import { Avatar } from 'otaku-ui'

interface Actions {
  icon?: React.ReactNode
  active?: boolean
  count?: number
  render?: () => React.ReactNode | React.ReactNode[]
}

interface CommonetProps {
  avatar?: React.ReactNode
  commentUser?: string
  replyUser?: string
  time?: string
  content?: string
  actions?: Actions[]

  children?: React.ReactNode
  reply?: boolean
  iconClick?: (index: number) => void
  actionsClick?: (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => void
}



export function Comment (props: CommonetProps) {
  const {
    content,
    reply,
    replyUser,
    children,
    actions = [
      {
        active: true,
        render () {
          return (
            <>
              <span
                className={`
                iconfont 
                ${
                  this.active
                    ? 'otaku-icon-thumotaku-up-fill'
                    : 'otaku-icon-like'
                }
                ${this.active ? 'otaku-comment-like-active' : ''}
              `}
                data-icon></span>
              <span>{this.count}</span>
            </>
          )
        },
        count: 0
      },
      {
        render () {
          return (
            <>
              <span
                className={`
                iconfont 
                ${
                  this.active
                    ? 'otaku-icon-thumotaku-down-fill'
                    : 'otaku-icon-unlike'
                }
                ${this.active ? 'otaku-comment-like-active' : ''}
              `}
                data-icon></span>
              <span>{this.count}</span>
            </>
          )
        },
        active: false,
        count: 0
      },
      {
        render () {
          return (
            <>
              <span></span>
              <span
                onClick={() => {
                  console.log(2)
                }}>
                回复
              </span>
            </>
          )
        }
      }
    ],
    actionsClick,
    iconClick
  } = props

  const actionClick = (e: any, item: Actions, index: number) => {
    console.log(e)
    const icon = e.target.dataset?.icon
    actionsClick?.(e, index)

    if (!item.render) {
      if (icon === 'true') {
        iconClick?.(index)
        console.log(index)
      }
    }
  }

  return (
    <aside className='otaku-comment'>
      <Avatar size={35}></Avatar>
      <div className='otaku-comment-container'>
        <div className='otaku-comment-username'>last order</div>
        <div className='otaku-comment-time'>2021-07-06 01:21:31</div>
        <p className='otaku-comment-content'>
          {reply ? (
            <>
              <span>回复</span>
              <span className='otaku-comment-reply'>@{replyUser}：</span>
              <span>{content}</span>
            </>
          ) : (
            content
          )}
        </p>
        <ul className='otaku-comment-actions'>
          {actions.map((item, index) => (
            <li
              className='otaku-comment-actions-item'
              key={index}
              onClick={e => actionClick(e, item, index)}>
              {item.render ? (
                item.render()
              ) : (
                <>
                  {item?.icon}
                  <span>{item?.count}</span>
                </>
              )}
            </li>
          ))}
        </ul>
        {children}
      </div>
    </aside>
  )
}
