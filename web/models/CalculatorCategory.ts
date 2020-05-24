import { Model } from '@vuex-orm/core'
import Calculator from './Calculator'

export default class CalculatorCategory extends Model {
  static entity = 'calculatorCategories'

  static fields() {
    return {
      id: this.string(''),
      name: this.string(''),
      icon: this.string(null).nullable(),
      active: this.boolean(true),
      calculators: this.hasMany(Calculator, 'categoryId'),
    }
  }
}
