import { convert } from '@/services/equation-processor.js'

export default {
  state() {
    return {
      category: undefined,
      from: {
        value: undefined,
        unit: undefined
      },
      to: {
        value: undefined,
        unit: undefined
      }
    }
  },

  mutations: {
    Set_Category(state, { category }) {
      state.category = category
    },
    Set_From_Value(state, { value }) {
      state.from.value = value
    },
    Set_From_Unit(state, { unit }) {
      state.from.unit = unit
    },
    Set_To_Value(state, { value }) {
      state.to.value = value
    },
    Set_To_Unit(state, { unit }) {
      state.to.unit = unit
    }
  },

  actions: {
    setCategory({ rootGetters, commit, dispatch }, { category }) {
      commit('Set_Category', { category })
      const unitsInCategory = rootGetters['units/unitsInCategory'](category)
      dispatch('setFromUnit', {
        unit: unitsInCategory[0].symbol
      })
      dispatch('setToUnit', {
        unit: unitsInCategory[1].symbol
      })
      dispatch('setFromValue', { value: 1 })
    },
    setFromValue({ commit, dispatch }, { value }) {
      commit('Set_From_Value', { value })
      dispatch('calculateToValue')
    },
    setFromUnit({ state, commit, dispatch }, { unit }) {
      const prevFromUnit = state.from.unit
      commit('Set_From_Unit', { unit })
      if (state.to.unit === unit) {
        dispatch('setToUnit', { unit: prevFromUnit })
      }
      dispatch('calculateToValue')
    },
    setToValue({ commit, dispatch }, { value }) {
      commit('Set_To_Value', { value })
      dispatch('calculateFromValue')
    },
    setToUnit({ state, commit, dispatch }, { unit }) {
      const prevToUnit = state.to.unit
      commit('Set_To_Unit', { unit })
      if (state.from.unit === unit) {
        dispatch('setFromUnit', { unit: prevToUnit })
      }
      dispatch('calculateToValue')
    },
    calculateFromValue({ rootGetters, state, commit }) {
      const fromValue = convert({
        unitData: rootGetters['units/unitsInCategory'](state.category),
        value: state.to.value,
        fromUnit: state.to.unit,
        toUnit: state.from.unit
      })
      commit('Set_From_Value', { value: fromValue })
    },
    calculateToValue({ rootGetters, state, commit }) {
      const toValue = state.from.value
        ? convert({
            unitData: rootGetters['units/unitsInCategory'](state.category),
            value: state.from.value,
            fromUnit: state.from.unit,
            toUnit: state.to.unit
          })
        : undefined
      const rounded = isNaN(toValue) ? toValue : parseFloat(toValue.toFixed(5))
      commit('Set_To_Value', { value: rounded })
    },
    clearValues({ dispatch }) {
      dispatch('setFromValue', { value: undefined })
      dispatch('setToValue', { value: undefined })
    }
  },

  getters: {}
}
