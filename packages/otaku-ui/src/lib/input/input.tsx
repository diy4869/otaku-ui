import React, { useEffect, useState } from 'react'
import { Icon } from '../icon/icon'
import './style.scss';

interface InputProps {
  value?: string
  placeholder?: string
  readonly?: boolean
  disabled?: boolean
  border?: boolean
  bgcolor?: string
  rows?: number
  cols?: number
  beforeIcon?: React.ReactNode
  beforeNode?: React.ReactNode
  afterIcon?: React.ReactNode
  clear?: boolean
  afterNode?: React.ReactNode
  showPassword?: boolean
  resize?: boolean
  className?: string
  style?: React.CSSProperties
  type?: 'text' | 'search' | 'password' | 'textarea'
  size?: 'small' | 'middle' | 'large'
  onChange?:(val: string) => void
  onInput?:(val: string) => void
  onFocus?:() => void
  onBlur?:() => void
  onClear?: () => void
  leftClick?:() => void
  rightClick?:() => void
}

export function Input (props: InputProps) {
  const {
    value,
    placeholder,
    readonly,
    disabled,
    cols,
    rows,
    className,
    style,
    beforeIcon,
    beforeNode,
    afterIcon,
    afterNode,
    clear,
    resize = true,
    showPassword = false,
    type = 'text',
    bgcolor = 'white',
    border = true,
    size = 'middle',
    onBlur,
    onFocus,
    onChange,
    onInput,
    onClear,
    leftClick,
    rightClick
  } = props

  const [
    inputValue,
    setInputValue
  ] = useState('')
  
  let [
    show,
    setShow
  ] = useState(showPassword)

  useEffect(
    () => {
      if (value) {
        setInputValue(value)
        onChange?.(inputValue)
      }
    },
    [value]
  )

  const change = (e) => {
    setInputValue(e.target.value)
    onChange?.(inputValue)
    onInput?.(inputValue)
  }

  return (
    <>
      {
        // text search password
        type !== 'textarea'
          ? (
              <div className={`otaku-input-box otaku-input-size-${size}`}>
                {
                  beforeNode ? <div className="otaku-input-before">{beforeNode}</div> : ''
                }
              <div
                className={`
                  otaku-input-container
                  ${className ?? ''}
                  ${afterNode ? 'otaku-input-after-border' : ''}
                  ${disabled ? 'otaku-input-disabled' : ''}
                `}
                style={{
                  borderWidth: border ? '1px' : '0px',
                  background: disabled ? '#f7f7f7' : bgcolor,
                  ...style
                }}>
                  {
                    typeof beforeIcon === 'string' ? <Icon 
                    className='otaku-input-icon-left'
                    name={beforeIcon} 
                    onClick={leftClick}></Icon> : beforeIcon
                  }
                  <input
                    className={`
                      otaku-input
                    `}
                    placeholder={placeholder}
                    type={type}
                    value={inputValue}
                    disabled={disabled}
                    readOnly={readonly}
                    onChange={change}
                    onInput={change}
                    onBlur={onBlur}
                    onFocus={onFocus}
                  ></input>
                  {
                    type === 'password'
                      ? <span
                      className={`
                        otaku-input-icon-right 
                        iconfont 
                        show-password
                        ${show ? 'otaku-icon-eye-line' : show === false ? 'otaku-icon-eye-off-line' : ''}
                      `}
                      onClick={() => {
                        show = !show
                        setShow(show)
                      }}></span>
                      : ''
                  }
                  {
                    clear && inputValue.length !== 0
                      ? <span
                      className={`
                        otaku-input-icon-right 
                        iconfont 
                        close
                        otaku-icon-close-circle-line
                      `}
                      onClick={() => {
                        setInputValue('')
                        onClear?.()
                      }}></span>
                      : ''
                  }
                  {
                     typeof afterIcon === 'string' ? <Icon 
                      className='otaku-input-icon-right'
                      name={afterIcon} 
                      onClick={rightClick}></Icon> : afterIcon
                  }
                </div>
                {
                  afterNode ? <div className="otaku-input-after">{afterNode}</div> : ''
                }
              </div>
            )
          : (
          <div className={`otaku-textarea-container ${className}`} style={{
            borderWidth: border ? '1px' : '0px',
            background: bgcolor,
            ...style
          }}>
            <textarea
              className={`
                ${disabled ? 'otaku-input-disabled' : ''}
                otaku-input-textarea
                ${className}
              `}
              style={{
                background: bgcolor,
                resize: !resize ? 'none' : 'initial'
              }}
              cols={cols}
              rows={rows}
              placeholder={placeholder}
              value={inputValue}
              disabled={disabled}
              readOnly={readonly}
              onChange={change}
              onInput={change}
              onBlur={onBlur}
              onFocus={onFocus}></textarea>
          </div>
        )
      }
    </>
  )
}
