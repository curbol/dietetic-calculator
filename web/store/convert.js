import { convert } from '@/functions/equation-processor.js'

export default {
  state() {
    return {
      category: undefined,
      from: {
        value: undefined,
        unit: undefined,
      },
      to: {
        value: undefined,
        unit: undefined,
      },
    }
  },

  mutations: {
    Set_Category(state, category) {
      state.category = category
    },
    Set_From_Value(state, value) {
      state.from.value = value
    },
    Set_From_Unit(state, unit) {
      state.from.unit = unit
    },
    Set_To_Value(state, value) {
      state.to.value = value
    },
    Set_To_Unit(state, unit) {
      state.to.unit = unit
    },
  },

  actions: {
    setCategory({ commit, dispatch, rootGetters }, category) {
      commit('Set_Category', category)

      const unitsInCategory = rootGetters['units/unitsInCategory'](category)
      if (unitsInCategory[0]) {
        dispatch('setFromUnit', unitsInCategory[0].symbol)
      }
      if (unitsInCategory[1]) {
        dispatch('setToUnit', unitsInCategory[1].symbol)
      }

      dispatch('setFromValue', 1)
    },
    setFromValue({ commit, dispatch }, value) {
      commit('Set_From_Value', value)
      dispatch('calculateToValue')
    },
    setFromUnit({ state, commit, dispatch }, unit) {
      const prevFromUnit = state.from.unit
      commit('Set_From_Unit', unit)

      if (state.to.unit === unit) {
        dispatch('setToUnit', prevFromUnit)
      }

      dispatch('calculateToValue')
    },
    setToValue({ commit, dispatch }, value) {
      commit('Set_To_Value', value)
      dispatch('calculateFromValue')
    },
    setToUnit({ state, commit, dispatch }, unit) {
      const prevToUnit = state.to.unit
      commit('Set_To_Unit', unit)

      if (state.from.unit === unit) {
        dispatch('setFromUnit', prevToUnit)
      }

      dispatch('calculateToValue')
    },
    calculateFromValue({ state, commit, rootGetters }) {
      const fromValue = convert({
        units: rootGetters['units/unitsInCategory'](state.category),
        value: state.to.value,
        fromUnit: state.to.unit,
        toUnit: state.from.unit,
      })
      commit('Set_From_Value', fromValue)
    },
    calculateToValue({ state, commit, rootGetters }) {
      const toValue = state.from.value
        ? convert({
            units: rootGetters['units/unitsInCategory'](state.category),
            value: state.from.value,
            fromUnit: state.from.unit,
            toUnit: state.to.unit,
          })
        : undefined
      const rounded = isNaN(toValue) ? toValue : parseFloat(toValue.toFixed(5))
      commit('Set_To_Value', rounded)
    },
    clearValues({ dispatch }) {
      dispatch('setFromValue', undefined)
      dispatch('setToValue', undefined)
    },
  },

  getters: {},
}
