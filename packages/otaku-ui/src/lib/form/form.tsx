import React, { useState } from 'react'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import { formStore, formState } from './store'
import './style.scss'

export interface FormProps {
  model?: object
  disabled?: boolean
  labelWidth?: string
  children: React.ReactChildren
}

export function Form (props: FormProps) {
  const { disabled, children } = props
  // const setFormPorps = useSetRecoilState(formStore)

  return (
    <RecoilRoot>
      <form>
        <ul className='otaku-form'>{children}</ul>
      </form>
    </RecoilRoot>
  )
}

