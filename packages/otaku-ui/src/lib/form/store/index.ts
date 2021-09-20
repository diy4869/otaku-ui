import { BaseForm } from '../form'
// import rxjs from 'rxjs'
import Schema, { ValidateError } from 'async-validator'

export default class FormValidate {
  options: BaseForm
  status: 'pending' | 'success' | 'error'
  validateErrors: ValidateError[]
  
  constructor (options = {}) {
    this.options = options
    this.status = 'pending'
    this.validateErrors =  []
  }

  get validateError () {
    return this.validateErrors
  }

  set validateError (val) {
    this.validateErrors = val  
  }

  setOptions (options: BaseForm) {
    this.options = options
  }

  getOptions () {
    return this.options
  }

  validate () {
    const {
      model = {},
      rules = {}
    } = this.options
    const validator = new Schema(rules)
    console.log(rules)
    return new Promise((resolve, reject) => {
      validator.validate(model, {
        firstFields: true
      }, (errors, fields) => {
        console.log(errors, fields)
        if (errors) {
          this.validateError = errors
          this.status = 'error'
          reject(errors) 
        } else {
          this.status = 'success'
          resolve(fields)
        }
      })
    })
  }

  resetValidate () {}
}
