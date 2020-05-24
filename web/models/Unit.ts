import { Model } from '@vuex-orm/core'
import UnitCategory from './UnitCategory'

export default class Unit extends Model {
  static entity = 'units'

  static fields() {
    return {
      id: this.string(''),
      name: this.string(''),
      symbol: this.string(''),
      factor: this.number(0),
      categoryId: this.string(''),
      category: this.belongsTo(UnitCategory, 'categoryId'),
    }
  }
}
