import { Model } from '@vuex-orm/core'
import Input from './Input'
import Unit from './Unit'

export default class UnitCategory extends Model {
  static entity = 'unitCategories'

  static fields() {
    return {
      id: this.string(''),
      name: this.string(''),
      units: this.hasMany(Unit, 'categoryId'),
      inputs: this.hasMany(Input, 'unitCategoryId'),
    }
  }
}
