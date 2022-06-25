import React from 'react'
import { Avatar } from 'otaku-ui'
import './style.scss'

export interface CommonetProps {
  avatar?: React.ReactNode
  cover?: string
  commentUser?: string
  replyUser?: string
  reply?: boolean
  content?: string
  time?: React.ReactNode
  actions?: React.ReactNode
  children?: React.ReactNode
}

export function Comment (props: CommonetProps) {
  const {
    cover,
    content,
    reply,
    commentUser,
    replyUser,
    time,
    children,
    actions
  } = props

  return (
    <aside className='otaku-comment'>
      <Avatar size={35} src={cover}></Avatar>
      <div className='otaku-comment-container'>
        <div className='otaku-comment-username'>{commentUser}</div>
        <div className='otaku-comment-time'>{time}</div>
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
        <aside className='otaku-comment-actions'>
          {actions}
        </aside>
        {children}
      </div>
    </aside>
  )
}
