import { objectType, extendType } from 'nexus'

const defaultOptions = {
  filtering: true,
  ordering: true,
  pagination: false,
}

const Query = extendType({
  type: 'Query',
  definition(t) {
    t.crud.calculatorCategories(defaultOptions)
    t.crud.calculators(defaultOptions)
    t.crud.inputs(defaultOptions)
    t.crud.selects(defaultOptions)
    t.crud.unitCategories(defaultOptions)
    t.crud.units(defaultOptions)
  },
})

const CalculatorCategory = objectType({
  name: 'CalculatorCategory',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.icon()
    t.model.calculators(defaultOptions)
  },
})

const Calculator = objectType({
  name: 'Calculator',
  definition(t) {
    t.model.id()
    t.model.key()
    t.model.name()
    t.model.description()
    t.model.defaultOutputUnit()
    t.model.category()
    t.model.inputs(defaultOptions)
    t.model.selects(defaultOptions)
  },
})

const Input = objectType({
  name: 'Input',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.defaultUnit()
    t.model.icon()
    t.model.unitCategory()
    t.model.calculators(defaultOptions)
  },
})

const SelectOption = objectType({
  name: 'SelectOption',
  definition(t) {
    t.model.id()
    t.model.text()
    t.model.select()
  },
})

const Select = objectType({
  name: 'Select',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.icon()
    t.model.options(defaultOptions)
    t.model.calculators(defaultOptions)
  },
})

const UnitCategory = objectType({
  name: 'UnitCategory',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.units(defaultOptions)
    t.model.inputs(defaultOptions)
  },
})

const Unit = objectType({
  name: 'Unit',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.symbol()
    t.model.factor()
    t.model.category()
  },
})

export default [
  Query,
  CalculatorCategory,
  Calculator,
  Input,
  SelectOption,
  Select,
  UnitCategory,
  Unit,
]
