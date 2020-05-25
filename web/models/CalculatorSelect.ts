import { Model } from '@vuex-orm/core'

export default class CalculatorSelect extends Model {
  static entity = 'calculatorSelects'
  static primaryKey = ['calculatorId', 'selectId']

  static fields() {
    return {
      calculatorId: this.string(''),
      selectId: this.string(''),
    }
  }
}
