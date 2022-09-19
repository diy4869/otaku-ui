import React, { useState } from 'react'
import { Picker } from '../picker'
import './style.scss'

export interface TimePickerProps {
  children: React.ReactNode
}


export function TimePicker (props: TimePickerProps) {
  const {
    children
  } = props

  const generator = (count: number) => {
    return Array.from({
      length: count
    }).map((_, index) => {
      return {
        id: index,
        name: `${index}`.padStart(2, '0')
      }
    })
  }
  return (
    <section className='otaku-time-panel'>
      <Picker columns={generator(24)}></Picker>
      <Picker columns={generator(59)}></Picker>
      <Picker columns={generator(59)}></Picker>
    </section>
  )
}
