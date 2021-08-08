import React, { useState } from 'react'
import './style.scss'
import Avatar from '@lib/avatar/avatar'

interface CommonetProps {
  avatar?: React.ReactNode
  commentUser?: string
  replyUser?: string
  time?: string
  content?: string
  actions?: React.ReactNode[]
  children?: React.ReactNode
  reply?: boolean
}

export default (props: CommonetProps) => {
  const {
    content = '时间线收束到现在，我也不剧透，香奈乎和碳碳就是官方cp，已认证成功，弹幕里都变成“你就宠她吧”，我自己也粉了起来，那谁知道不超过一两个月前的弹幕？说香香是单恋，说人家单相思，说不要刷cp，还站谁谁，还有腐女当场对线，对不起，碳碳对每个人都很温柔，但唯独对香就是爱情，还有“热血漫看什么爱情”的那部分人，那我告诉你，作为一个热血漫的老粉，爱情元素为作品增色的，热血漫里的爱情线终于绽放，结果也是发自内心的...',
    reply,
    replyUser,
    children
  } = props

  return (
    <aside className="b-comment">
      <Avatar size={35}></Avatar>
      <div className="b-comment-container">
        <div className="b-comment-username">last order</div>
        <div className="b-comment-time">2021-07-06 01:21:31</div>
        <p className="b-comment-content">
          {
            reply ? (
              <>
                <span>回复</span>
                <span className="b-comment-reply">@{replyUser}：</span>
                <span>{content}</span>
              </>
            ) : content
          }
          
        </p>
        <ul className="b-comment-actions">
          <li className="b-comment-actions-item">
            <span className="iconfont b-icon-thumb-up-fill b-comment-like-active"></span>
            <span>1</span>
          </li>
          <li className="b-comment-actions-item">
            <span className="iconfont  b-icon-thumb-down-fill"></span>
            <span>0</span>
          </li>
          <li className="b-comment-actions-item">
            <span></span>
            <span>回复</span>
          </li>
        </ul>
        { children }
      </div>
    </aside>
  )
}
