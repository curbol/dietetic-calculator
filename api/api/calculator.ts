import { schema } from 'nexus'

const opts = {
  filtering: true,
  ordering: true,
  pagination: false,
}

schema.objectType({
  name: 'CalculatorCategory',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.icon()
    t.model.calculators(opts)
  },
})

schema.objectType({
  name: 'Calculator',
  definition(t) {
    t.model.id()
    t.model.key()
    t.model.name()
    t.model.description()
    t.model.defaultOutputUnit()
    t.model.category()
    t.model.categoryId()
    t.model.inputs(opts)
    t.model.selects(opts)
  },
})

schema.objectType({
  name: 'Input',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.defaultUnit()
    t.model.icon()
    t.model.unitCategory()
    t.model.unitCategoryId()
    t.model.calculators(opts)
  },
})

schema.objectType({
  name: 'SelectOption',
  definition(t) {
    t.model.id()
    t.model.text()
    t.model.select()
    t.model.selectId()
  },
})

schema.objectType({
  name: 'Select',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.icon()
    t.model.options(opts)
    t.model.calculators(opts)
  },
})

schema.objectType({
  name: 'UnitCategory',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.units(opts)
    t.model.inputs(opts)
  },
})

schema.objectType({
  name: 'Unit',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.symbol()
    t.model.factor()
    t.model.category()
    t.model.categoryId()
  },
})

schema.queryType({
  definition(t) {
    t.crud.calculatorCategories(opts)
    t.crud.calculators(opts)
    t.crud.inputs(opts)
    t.crud.selects(opts)
    t.crud.unitCategories(opts)
    t.crud.units(opts)
  },
})
