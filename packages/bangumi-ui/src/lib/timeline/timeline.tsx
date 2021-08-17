import React from 'react'
import './style.scss'

interface TimelineProps {
  children?: React.ReactNode
  className?: string
}

interface TimelineItemProps {
  className?: string
  title?: React.ReactNode
  children?: React.ReactNode
}

export const TimelineItem = (props: TimelineItemProps) => {
  const {
    title,
    className,
    children
  } = props

  return (
    <li className={'b-timeline-item'}>
      <div className="b-timeline-separator"></div>
      <div className="b-timeline-container">
        <div className="b-timeline-title">{title}</div>
        <div className={`b-timeline-content ${className ?? ''}`}>{children}</div>
      </div>
    </li>
  )
}

export const Timeline = (props: TimelineProps) => {
  const {
    children,
    className
  } = props

  return (
    <ul className={`b-timeline ${className ?? ''}`}>
      {children}
    </ul>
  )
}
