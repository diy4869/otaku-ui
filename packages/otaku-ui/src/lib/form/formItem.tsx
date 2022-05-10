import React, { useState, useEffect, useContext } from 'react'
import { formValidate, FormContext, BaseForm } from './form'
import set from 'lodash/set'
import { status } from './store'
import './style.scss'

interface FormItemProps {
  label?: string
  field?: string
  required?: boolean
  children?: React.ReactNode
}

export function FormItem (props: FormItemProps) {
  const {
    label,
    field,
    required,
    children
  } = props

  const FormOptions = useContext(FormContext) as BaseForm
  const { labelWidth, labelAlign, requiredAlign } = FormOptions
  const [validateStatus, setValidateStatus] = useState<status>('pending')
  const [FormStore, setFormStore] = useState(formValidate)
  const [validateMessage, setValidateMessage] = useState(new Map())

  console.log(children)
  useEffect(() => {
    FormStore.on('validate', (store) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setFormStore(store)
      setValidateStatus(store.status)
      
      const error = store.validateErrors.reduce((map, current) => {
        map.set(current.field, current)

        return map
      }, new Map())

      setValidateMessage(error)
      console.log(error)
    })
  }, [])

  
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
        <div>
          {
            React.Children.map(children, (node) => {
              const el = node as React.ReactElement
              
              return React.cloneElement(el, {
                ...el.props,
                onChange (e: React.BaseSyntheticEvent | string | unknown[]) {
                  let data 

                  if (typeof e === 'string') {
                    data = e
                  } else if (Array.isArray(e)) {
                    data = e
                  } else if (e.target.checked) {
                    data = e
                  } else if (e.target.files) {
                    data = e
                  }
                  
                  console.log(e)
                  // eslint-disable-next-line @typescript-eslint/ban-types
                  const result = set(FormStore.options.model as object, field as string, data)
                  console.log(FormStore, result)
                  
                  FormStore.on('setModel', (store) => {
                    store.setOptions({
                      ...store.options,
                      model: result as Record<string | number, unknown>
                    })
                  })
                  
                  // console.log(val)
                }
              })
            })
          }
          
        </div>
        <span className="otaku-form-item-error-message">
            { validateStatus === 'error' ? validateMessage.get(field)?.message : ''}
          </span>
      </div>
      
      
    </li>
  )
}
