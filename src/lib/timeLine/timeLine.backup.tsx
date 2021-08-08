import React from 'react'
import './style.scss'

interface TimelineItemProps {
  title?: React.ReactNode
  children?: React.ReactNode
}

export const TimelineItem = (props: TimelineItemProps) => {
  const {
    title,
    children
  } = props

  return (
    <li className="b-timeline-item">
      <div className="b-timeline-separator"></div>
      <div className="b-timeline-container">
        <div className="b-timeline-title">{title}</div>
        <div className="b-timeline-content">{children}</div>
      </div>
    </li>
  )
}

interface TimelineProps {
  title?: React.ReactNode
  children?: React.ReactNode
}

export const Timeline = (props: TimelineProps) => {
  const {
    children
  } = props

  console.log(children)
  return (
    <ul className="b-timeline">
      {children}
    </ul>
  )
}
