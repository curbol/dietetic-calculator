import { Model } from '@vuex-orm/core'
import SelectOption from './SelectOption'
import Calculator from './Calculator'
import CalculatorSelect from './CalculatorSelect'

export default class Select extends Model {
  static entity = 'selects'

  static fields() {
    return {
      id: this.string(''),
      name: this.string(''),
      icon: this.string(null).nullable(),
      value: this.string(null).nullable(),
      options: this.hasMany(SelectOption, 'selectId'),
      calculators: this.belongsToMany(
        Calculator,
        CalculatorSelect,
        'selectId',
        'calculatorId'
      ),
    }
  }
}
