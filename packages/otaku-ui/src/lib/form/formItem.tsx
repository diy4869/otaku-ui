import React, { useState, useEffect, useContext } from 'react'
import { formValidate, FormContext, BaseForm } from './form'
import './style.scss'

interface FormItemProps {
  label?: string
  name?: string
  required?: boolean
  children?: React.ReactNode
}

export function FormItem (props: FormItemProps) {
  const {
    label,
    required,
    children
  } = props

  const FormOptions = useContext(FormContext) as BaseForm
  const { labelWidth, labelAlign, requiredAlign } = FormOptions
  const [validateErrors] = useState(formValidate.validateErrors)

  useEffect(() => {
    console.log(formValidate, validateErrors, FormOptions)
  }, [FormOptions, validateErrors])

  
  return (
    <li className="otaku-form-item" style={{
      gridTemplateColumns: `${labelWidth} 1fr`
      
    }}>
      <div className="otaku-form-item-label" style={{
        textAlign: labelAlign
      }}>
        {
          requiredAlign === 'left' && required && <span className="is-required">*</span>
        }
        {label}
        {
          requiredAlign === 'right' && required && <span className='is-required'>*</span>
        }
      </div>
      <div className="otaku-form-item-content">
        {children}
      </div>
      <span></span>
      <span className="otaku-form-item-error-message"> </span>
    </li>
  )
}
