import { Model } from '@vuex-orm/core'
import Select from '@/models/Select'

export default class SelectOption extends Model {
  static entity = 'selectOptions'

  static fields() {
    return {
      id: this.string(''),
      text: this.string(''),
      selectId: this.string(''),
      select: this.belongsTo(Select, 'selectId'),
    }
  }
}
