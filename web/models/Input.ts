import { Model } from '@vuex-orm/core'
import Calculator from '@/models/Calculator'
import CalculatorInput from './CalculatorInput'
import UnitCategory from './UnitCategory'

export default class Input extends Model {
  static entity = 'inputs'

  static beforeCreate(input: any) {
    if (!input.selectedUnit) {
      input.selectedUnit = input.defaultUnit
    }
  }

  static fields() {
    return {
      id: this.string(''),
      name: this.string(''),
      icon: this.string(null).nullable(),
      defaultUnit: this.string(''),
      selectedUnit: this.string(''),
      value: this.number(null).nullable(),
      calculators: this.belongsToMany(
        Calculator,
        CalculatorInput,
        'inputId',
        'calculatorId'
      ),
      unitCategoryId: this.string(''),
      unitCategory: this.belongsTo(UnitCategory, 'unitCategoryId'),
    }
  }
}
