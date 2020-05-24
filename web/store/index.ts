import VuexORM, { Database } from '@vuex-orm/core'
import CalculatorCategory from '@/models/CalculatorCategory'
import Calculator from '@/models/Calculator'
import CalculatorInput from '@/models/CalculatorInput'
import CalculatorSelect from '@/models/CalculatorSelect'
import Input from '@/models/Input'
import Select from '@/models/Select'
import SelectOption from '@/models/SelectOption'
import UnitCategory from '@/models/UnitCategory'
import Unit from '@/models/Unit'

const database = new Database()

database.register(CalculatorCategory)
database.register(Calculator)
database.register(CalculatorInput)
database.register(CalculatorSelect)
database.register(Input)
database.register(Select)
database.register(SelectOption)
database.register(UnitCategory)
database.register(Unit)

export const plugins = [VuexORM.install(database)]
