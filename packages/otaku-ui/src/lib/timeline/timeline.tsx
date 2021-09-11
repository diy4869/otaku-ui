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
    <li className={'otaku-timeline-item'}>
      <div className="otaku-timeline-separator"></div>
      <div className="otaku-timeline-container">
        <div className="otaku-timeline-title">{title}</div>
        <div className={`otaku-timeline-content ${className ?? ''}`}>{children}</div>
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
    <ul className={`otaku-timeline ${className ?? ''}`}>
      {children}
    </ul>
  )
}
