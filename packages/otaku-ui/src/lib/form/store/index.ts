import { atom } from 'recoil'
import { FormProps } from '../form'

type FormStore = Omit<FormProps, 'children'>

export const formStore = atom<FormStore>({
  key: 'formProps',
  default: {
    disabled: false
  }
})

export const formState = atom({
  key: 'formState',
  default: {}
})
