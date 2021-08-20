import React, { useEffect, useState } from 'react'
import { Telport } from '../telport/telport'
import { Button, ButtonProps } from '../button/button'
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
  beforeIcon?: string,
  beforeNode?: React.ReactNode,
  afterIcon?: string,
  clear?: boolean
  afterNode?: React.ReactNode,
  showPassword?: boolean
  resize?: '-moz-initial' | 'inherit' | 'initial' | 'revert' | 'unset' | 'none' | 'block' | 'both' | 'horizontal' | 'inline' | 'vertical'
  className?: string
  style?: React.CSSProperties
  type?: 'text' | 'search' | 'password' | 'textarea'
  size?: 'mini' | 'small' | 'middle' | 'large'
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
    resize,
    className,
    style,
    beforeIcon,
    beforeNode,
    afterIcon,
    afterNode,
    showPassword,
    clear,
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
              <div className="b-input-box">
                {
                  beforeNode ? <div className="b-input-container-before">{beforeNode}</div> : ''
                }
              <div
                className={`b-input-container ${className ?? ''} ${afterNode ? 'b-input-after-border' : ''}`}
                style={{
                  borderWidth: border ? '1px' : '0px',
                  background: bgcolor,
                  ...style
                }}>
                  {
                    beforeIcon ? <span className={`b-input-icon-left iconfont ${beforeIcon}`} onClick={leftClick}></span> : ''
                  }
                  <input
                    className={`
                      ${disabled ? 'b-input-disabled' : ''}
                      b-input
                      b-input-size-${size}
                    `}
                    style={{
                      background: bgcolor
                    }}
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
                        b-input-icon-right 
                        iconfont 
                        show-password
                        ${show ? 'b-icon-eye-line' : show === false ? 'b-icon-eye-off-line' : ''}
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
                        b-input-icon-right 
                        iconfont 
                        close
                        b-icon-close-circle-line
                      `}
                      onClick={() => {
                        setInputValue('')
                        onClear?.()
                      }}></span>
                      : ''
                  }
                  {
                    afterIcon ? <span className={`b-input-icon-right iconfont ${afterIcon}`} onClick={rightClick}></span> : ''
                  }
                </div>
                {
                  afterNode ? <div className="b-input-after">{afterNode}</div> : ''
                }
              </div>
            )
          : (
          <div className={`b-textarea-container ${className}`} style={{
            borderWidth: border ? '1px' : '0px',
            background: bgcolor,
            ...style
          }}>
            <textarea
              className={`
                ${disabled ? 'b-input-disabled' : ''}
                b-input-textarea
                ${className}
              `}
              style={{
                background: bgcolor,
                resize: resize || 'none'
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

interface SearchButtonProps {
  inputProps?: InputProps,
  buttonProps?: ButtonProps,
  children: React.ReactNode
}

export const SearchButton = (props: SearchButtonProps) => {
  const {
    inputProps,
    buttonProps,
    children
  } = props

  return (
    <div className={'b-search-button'}>
      {/* <div> */}
        <Input
          {
            ...inputProps
          }
          type="search"
          afterNode={
            <Button {
              ...buttonProps
            }>{children}</Button>
          }
        ></Input>
      {/* </div> */}

      {/* <Telport className="b-search-popup">
        <ul className="b-search-list">
          {
            Array(10).fill(undefined).map((_, index) => {
              return (
              <li className="b-search-item">{index}</li>
              )
            })
          }
        </ul>
      </Telport> */}
    </div>
  )
}
