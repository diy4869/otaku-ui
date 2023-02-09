import React from 'react'
import { Rules } from 'async-validator'
import FormValidate from './store'
// import { Space } from '../space/space'
import './style.scss'

export interface BaseForm {
  labelAlign?: 'left' | 'right'
  requiredAlign?: 'left' | 'right'
  model?: {
    [key: string | number]: unknown
  }
  labelWidth?: string
  disabled?: boolean
  readonly?: boolean
  rules?: Rules
}

export const FormContext = React.createContext<BaseForm | null>(null)
export const formValidate = new FormValidate()

export interface FormProps extends BaseForm {
  children?: React.ReactNode[]
  onSubmit?: () => void
  onValidate?: () => void
  getFormInstance?: (instance: FormValidate) => void
}

export const Form = React.forwardRef((props: FormProps, ref) => {

  console.log('ref', ref)
  const {
    model = {},
    rules = {},
    children,
    labelAlign = 'right',
    requiredAlign = 'left',
    disabled = false,
    readonly = false,
    labelWidth = '80px',
    getFormInstance
  } = props

  const options = {
    labelAlign,
    requiredAlign,
    disabled,
    labelWidth,
    model,
    rules
  }
  formValidate.setOptions({
    labelAlign,
    requiredAlign,
    disabled,
    readonly,
    labelWidth,
    model,
    rules
  })
  getFormInstance?.(formValidate)
  
  // React.forwardRef((props))
  return (
    <FormContext.Provider value={options}>
      <form>
        <ul className="otaku-form">{children}</ul>
      </form>
    </FormContext.Provider>
  )
})

Form.displayName = 'Form'

export {
  FormValidate
}