import { Model } from '@vuex-orm/core'
import CalculatorCategory from './CalculatorCategory'
import CalculatorInput from './CalculatorInput'
import Input from './Input'
import Select from './Select'
import CalculatorSelect from './CalculatorSelect'

export const INVALID_INPUTS = 'Invalid Inputs'

export default class Calculator extends Model {
  static entity = 'calculators'

  static beforeCreate(calculator: any) {
    if (!calculator.selectedOutputUnit) {
      calculator.selectedOutputUnit = calculator.defaultOutputUnit
    }
  }

  static fields() {
    return {
      id: this.string(''),
      key: this.string(''),
      name: this.string(''),
      defaultOutputUnit: this.string(''),
      selectedOutputUnit: this.string(''),
      description: this.string(''),
      active: this.boolean(false),
      result: this.string(INVALID_INPUTS),
      categoryId: this.string(''),
      category: this.belongsTo(CalculatorCategory, 'categoryId'),
      inputs: this.belongsToMany(
        Input,
        CalculatorInput,
        'calculatorId',
        'inputId'
      ),
      selects: this.belongsToMany(
        Select,
        CalculatorSelect,
        'calculatorId',
        'selectId'
      ),
    }
  }
}
