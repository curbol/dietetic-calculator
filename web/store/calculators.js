import CalculatorRepository from '@/repositories/calculator.repository.ts'
import { equationProcessor } from '@/services/equation-processor.js'
import { INVALID_INPUTS } from '@/models/Calculator'

export default {
  actions: {
    async fetchCalculators({ dispatch }) {
      const data = await CalculatorRepository.getCalculators()
      dispatch(
        'entities/insertOrUpdate',
        { entity: 'calculators', data },
        { root: true }
      )
    },
    toggleCalculatorCategoryActive({ dispatch }, id) {
      dispatch(
        'entities/update',
        {
          entity: 'calculatorCategories',
          where: id,
          data(c) {
            c.active = !c.active
          },
        },
        { root: true }
      )
    },
    toggleCalculatorActive({ dispatch }, id) {
      dispatch(
        'entities/update',
        {
          entity: 'calculators',
          where: id,
          data(c) {
            c.active = !c.active
          },
        },
        { root: true }
      )
    },
    setAllCalculatorsActive({ dispatch }, active) {
      dispatch(
        'entities/update',
        {
          entity: 'calculators',
          where: () => true,
          data: {
            active: active,
          },
        },
        { root: true }
      )
      dispatch(
        'entities/update',
        {
          entity: 'calculators',
          where: () => true,
          data(c) {
            c.active = active || c.active
          },
        },
        { root: true }
      )
    },
    setSelectValue({ dispatch }, { id, value }) {
      dispatch(
        'entities/update',
        {
          entity: 'selects',
          where: id,
          data: { value },
        },
        { root: true }
      )
      dispatch('calculateResults')
    },
    setInputValue({ dispatch }, { id, value }) {
      dispatch(
        'entities/update',
        {
          entity: 'inputs',
          where: id,
          data: { value },
        },
        { root: true }
      )
      dispatch('calculateResults')
    },
    setInputSelectedUnit({ dispatch }, { id, selectedUnit }) {
      dispatch(
        'entities/update',
        {
          entity: 'inputs',
          where: id,
          data: { selectedUnit },
        },
        { root: true }
      )
      dispatch('calculateResults')
    },
    clearInputValues({ dispatch }) {
      dispatch(
        'entities/update',
        {
          entity: 'selects',
          where: () => true,
          data: { value: null },
        },
        { root: true }
      )
      dispatch(
        'entities/update',
        {
          entity: 'inputs',
          where: () => true,
          data: { value: null },
        },
        { root: true }
      )
      dispatch('calculateResults')
    },
    setCalculatorSelectedOutputUnit({ dispatch }, { id, selectedOutputUnit }) {
      dispatch(
        'entities/update',
        {
          entity: 'calculators',
          where: id,
          data: { selectedOutputUnit },
        },
        { root: true }
      )
      dispatch('calculateResults')
    },
    calculateResults({ rootGetters, dispatch }) {
      const query = rootGetters['entities/query']
      const calculators = query('calculators').all()
      const inputs = query('inputs').all()
      const selects = query('selects').all()
      const units = query('units').all()

      const processEquation = equationProcessor({ units, inputs, selects })

      calculators.forEach((calculator) => {
        const result = processEquation(calculator) || INVALID_INPUTS
        const rounded = isNaN(result) ? result : parseFloat(result.toFixed(1))
        dispatch(
          'entities/update',
          {
            entity: 'calculators',
            where: calculator.id,
            data: { result: rounded },
          },
          { root: true }
        )
      })
    },
  },

  getters: {
    activeCalculators: (_s, _g, _r, rootGetters) =>
      rootGetters['entities/query']('calculators')
        .where((c) => c.active)
        .get(),
    activeCalculatorsWithResults: (_s, _g, _r, rootGetters) =>
      rootGetters['entities/query']('calculators')
        .where((c) => c.active && !isNaN(c.result))
        .get(),
    activeInputs: (_s, _g, _r, rootGetters) =>
      rootGetters['entities/query']('inputs')
        .whereHas('calculators', (c) => c.where('active', true))
        .with('unitCategory.units')
        .get(),
    activeSelects: (_s, _g, _r, rootGetters) =>
      rootGetters['entities/query']('selects')
        .whereHas('calculators', (c) => c.where('active', true))
        .with('options')
        .get(),
  },
}
