import React, { useEffect } from 'react'
import { useMemo } from 'react'
import { formValidate } from './form'
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
    name,
    required,
    children
  } = props

  const { labelWidth, model, labelAlign, requiredAlign } = formValidate.getOptions()

  useEffect(() => {
    console.log(formValidate.validateError)
  }, [formValidate.status])

  
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
