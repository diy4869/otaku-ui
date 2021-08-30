import React, { useState } from 'react'
import './style.scss'
import { Avatar, Input } from 'bangumi-ui'

interface Actions {
  icon?: React.ReactNode
  active?: boolean
  count?: number
  render?:() => React.ReactNode | React.ReactNode[]
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
  iconClick?:(index: number) => void
  actionsClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => void
}

export function Comment (props: CommonetProps) {
  const {
    content = '时间线收束到现在，我也不剧透，香奈乎和碳碳就是官方cp，已认证成功，弹幕里都变成“你就宠她吧”，我自己也粉了起来，那谁知道不超过一两个月前的弹幕？说香香是单恋，说人家单相思，说不要刷cp，还站谁谁，还有腐女当场对线，对不起，碳碳对每个人都很温柔，但唯独对香就是爱情，还有“热血漫看什么爱情”的那部分人，那我告诉你，作为一个热血漫的老粉，爱情元素为作品增色的，热血漫里的爱情线终于绽放，结果也是发自内心的...',
    reply,
    replyUser,
    children,
    actions = [
      {
        active: true,
        render () {
          return (
            <>
              <span className={`
                iconfont 
                ${this.active ? 'b-icon-thumb-up-fill' : 'b-icon-like'}
                ${this.active ? 'b-comment-like-active' : ''}
              `} data-icon></span>
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
              <span className={`
                iconfont 
                ${this.active ? 'b-icon-thumb-down-fill' : 'b-icon-unlike'}
                ${this.active ? 'b-comment-like-active' : ''}
              `} data-icon></span>
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
              <span onClick={() => {
                console.log(2)
              }}>回复</span>
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
    actionsClick?.(
      e,
      index
    )

    if (!item.render) {
      if (icon === 'true') {
        iconClick?.(index)
        console.log(index)
      }
    }
  }

  return (
    <aside className="b-comment">
      <Avatar size={35}></Avatar>
      <div className="b-comment-container">
        <div className="b-comment-username">last order</div>
        <div className="b-comment-time">2021-07-06 01:21:31</div>
        <p className="b-comment-content">
          {
            reply
              ? (
              <>
                <span>回复</span>
                <span className="b-comment-reply">@{replyUser}：</span>
                <span>{content}</span>
              </>
                )
              : content
          }

        </p>
        <ul className="b-comment-actions">
          {
            actions.map((item, index) => (
                <li className="b-comment-actions-item" key={index} onClick={(e) => actionClick(
                  e,
                  item,
                  index
                )}>
                  {
                    item.render
                      ? item.render()
                      : (
                      <>
                        {item?.icon}
                        <span>{item?.count}</span>
                      </>
                        )
                  }
                </li>
            ))
          }
        </ul>
        { children }
      </div>
    </aside>
  )
}
