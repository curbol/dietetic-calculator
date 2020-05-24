import CalculatorRepository from '@/repositories/calculator.repository.ts'

export default {
  actions: {
    async fetchUnits({ dispatch, getters, rootState }) {
      const data = await CalculatorRepository.getUnits()
      dispatch(
        'entities/insertOrUpdate',
        { entity: 'units', data },
        { root: true }
      )

      const selectedCategory = rootState.convert.category
      if (!selectedCategory) {
        const category = getters.categoriesWithMultipleUnits[0]
        dispatch('convert/setCategory', category, { root: true })
      }
    },
  },

  getters: {
    unitsInCategory: (_s, _g, _rs, rootGetters) => (categoryName) => {
      const category = rootGetters['entities/query']('unitCategories')
        .where('name', categoryName)
        .with('units')
        .first()
      return category ? category.units : []
    },
    unitsInCategoryWithSymbol: (_s, _g, _r, rootGetters) => (symbol) => {
      const category = rootGetters['entities/query']('unitCategories')
        .whereHas('units', (u) => u.where('symbol', symbol))
        .with('units')
        .first()
      return category ? category.units : []
    },
    categoriesWithMultipleUnits: (_s, _g, _r, rootGetters) =>
      rootGetters['entities/query']('unitCategories')
        .has('units', '>=', 2)
        .get()
        .map((c) => c.name),
    unitWithSymbol: (_s, _g, _r, rootGetters) => (symbol) =>
      rootGetters['entities/query']('units').where('symbol', symbol).first(),
  },
}
