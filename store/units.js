import _ from 'lodash'
import CalcService from '@/services/calcs.js'

export default {
  state() {
    return {
      unitCategories: []
    }
  },

  mutations: {
    Set_Unit_Categories(state, unitCategories) {
      state.unitCategories = unitCategories
    }
  },

  actions: {
    async fetchUnits({ state, commit, dispatch, getters }) {
      if (state.units.length) return
      const unitCategories = await CalcService.getUnitCategories()
      commit('Set_Unit_Categories', unitCategories)
      const firstType = getters.typesWithMultipleUnits[0]
      dispatch('convert/setType', { type: firstType }, { root: true })
    }
  },

  getters: {
    typesWithMultipleUnits: (state) =>
      Object.entries(_.groupBy(state.units, 'type'))
        .filter(([type, units]) => units.length >= 2)
        .map(([type, units]) => type),
    unitsOfType: (state) => (type) =>
      state.units.filter((x) => x.type === type),
    symbolType: (state) => (symbol) =>
      _.get(state.units.find((x) => x.symbol === symbol), 'type'),
    unitWithSymbol: (state) => (symbol) =>
      state.units.find((unit) => unit.symbol === symbol)
  }
}
