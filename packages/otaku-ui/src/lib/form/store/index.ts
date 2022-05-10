import { BaseForm } from '../form'
import Schema, { ValidateError } from 'async-validator'

export type status = 'pending' | 'success' | 'error'

export default class FormValidate {
  options: BaseForm
  status: status
  validateErrors: ValidateError[]
  listeners: Map<string, Array<(store: this) => void>>

  constructor(options = {}) {
    this.options = options
    this.status = 'pending'
    this.validateErrors = []
    this.listeners = new Map()
  }

  setOptions(options: BaseForm) {
    this.options = options
  }

  getOptions() {
    return this.options
  }

  get validateStatus () {
    return this.status
  }

  validate() {
    const {
      model = {},
      rules = {}
    } = this.options
    const validator = new Schema(rules)
    return new Promise((resolve, reject) => {
      validator.validate(model, {
        firstFields: true
      }, (errors, fields) => {
        console.log(this)
        if (errors) {
          this.validateErrors = errors
          this.status = 'error'
          this.emit('validate')
          reject(errors)
        } else {
          this.status = 'success'
          this.emit('validate')
          resolve(fields)
        }
      })
    })
  }

  on (event: string, callback: (store: this) => void) {
    if (this.listeners.has(event)) {
      this.listeners.get(event)?.push(callback)
    } else {
      this.listeners.set(event, [callback])
    }
  }

  emit (event: string) {
    const listeners = this.listeners.get(event)

    if (listeners) {
      for (const current of listeners) {
        current(this)
      }
    }
  }
  


  resetValidate() {
    console.log('reset')
  }
}
