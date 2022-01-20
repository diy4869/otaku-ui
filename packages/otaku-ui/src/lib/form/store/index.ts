import { BaseForm } from '../form'
import Schema, { ValidateError } from 'async-validator'

export default class FormValidate {
  options: BaseForm
  status: 'pending' | 'success' | 'error'
  validateErrors: ValidateError[]

  constructor(options = {}) {
    this.options = options
    this.status = 'pending'
    this.validateErrors = []
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
        console.log(errors, fields)
        if (errors) {
          this.validateErrors = errors
          this.status = 'error'
          reject(errors)
        } else {
          this.status = 'success'
          resolve(fields)
        }
      })
    })
  }

  resetValidate() {
    console.log('reset')
  }
}
