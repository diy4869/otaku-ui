import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { Icon } from '../icon/icon'
import './style.scss'

export interface InputProps {
  value?: string | number
  placeholder?: string
  readonly?: boolean
  disabled?: boolean
  border?: boolean
  bgcolor?: string
  rows?: number
  cols?: number
  clear?: boolean
  showPassword?: boolean
  resize?: boolean
  className?: string
  style?: React.CSSProperties
  type?: 'text' | 'search' | 'password' | 'textarea'
  size?: 'small' | 'middle' | 'large'
  beforeIcon?: React.ReactNode
  beforeNode?: React.ReactNode
  afterIcon?: React.ReactNode
  afterNode?: React.ReactNode
  onChange?:(val: string) => void
  onInput?:(val: string) => void
  onFocus?:() => void
  onBlur?:() => void
  onClear?: () => void
  leftClick?:() => void
  rightClick?:() => void
  onEnter?:(e: React.BaseSyntheticEvent) => void
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
    onEnter,
    onClear,
    leftClick,
    rightClick
  } = props

  const [inputValue,setInputValue] = useState(value)
  const [inputType, setInputType] = useState(type)
  
  let [
    show,
    setShow
  ] = useState(showPassword)

  useEffect(() => {
    setInputValue(value)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[value])
    

  const change = (e: React.BaseSyntheticEvent) => {
    setInputValue(e.target.value)
    onChange?.(e.target.value)
    onInput?.(e.target.value)
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
                className={classNames('otaku-input-container', className, {
                  'otaku-input-after-border': afterNode,
                  'otaku-input-disabled': disabled
                })}
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
                    style={{
                      background: bgcolor
                    }}
                    className="otaku-input"
                    placeholder={placeholder}
                    type={inputType}
                    value={inputValue}
                    disabled={disabled}
                    readOnly={readonly}
                    onChange={change}
                    onInput={change}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      console.log(e)
                      if (e.code === 'Enter') {
                        onEnter?.(e)
                      }
                    }}
                  ></input>
                  {
                    type === 'password'
                      ? <span
                      className={
                        classNames(
                          'otaku-input-icon-right iconfont show-password', 
                          show ? 'otaku-icon-eye-line' : show === false ? 'otaku-icon-eye-off-line' : ''
                      )}
                      onClick={() => {
                        show = !show
                        setShow(show)
                        show ? setInputType('text') : setInputType('password')
                      }}></span>
                      : ''
                  }
                  {
                    clear && inputValue?.length !== 0
                      ? <span
                      className={classNames('otaku-input-icon-right iconfont close otaku-icon-close-circle-line')}
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
          <div 
            className={classNames('otaku-textarea-container', className)} 
            style={{
              borderWidth: border ? '1px' : '0px',
              background: bgcolor,
              ...style
            }}>
            <textarea
              className={
                classNames('otaku-input-textarea', {
                  'otaku-input-disabled': disabled,
                })}
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
