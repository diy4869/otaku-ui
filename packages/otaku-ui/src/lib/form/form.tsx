import React, { Component, useState } from 'react'
import { Rules } from 'async-validator'
import FormValidate from './store'
import './style.scss'

export {
  FormValidate

}

export const formValidate = new FormValidate()

export interface BaseForm {
  labelAlign?: 'left' | 'right'
  requiredAlign?: 'left' | 'right'
  model?: object
  labelWidth?: string
  disabled?: boolean
  rules?: Rules
}

export interface FormProps extends BaseForm {
  children: React.ReactNode[]
  onSubmit?: () => void
  onValidate?: () => void
  getFormInstance?: (instance: FormValidate) => void
}

export function Form (props: FormProps) {
  const {
    model = {},
    rules = {},
    children,
    labelAlign = 'right',
    requiredAlign = 'left',
    disabled = false,
    labelWidth = '80px',
    getFormInstance
  } = props

  formValidate.setOptions({
    labelAlign,
    requiredAlign,
    disabled,
    labelWidth,
    model,
    rules
  })
  getFormInstance?.(formValidate)
  
  return (
    <form>
      <ul className="otaku-form" >{children}</ul>
    </form>
  )
}
