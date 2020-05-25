import { Model } from '@vuex-orm/core'

export default class CalculatorInput extends Model {
  static entity = 'calculatorInputs'
  static primaryKey = ['calculatorId', 'inputId']

  static fields() {
    return {
      calculatorId: this.string(''),
      inputId: this.string(''),
    }
  }
}
