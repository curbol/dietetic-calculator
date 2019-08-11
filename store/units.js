import _ from 'lodash'
import CalcService from '@/services/calcs.js'

export default {
  state() {
    return {
      units: []
    }
  },
  mutations: {
    Set_Units(state, units) {
      state.units = units
    }
  },
  actions: {
    async fetchUnits({ state, commit, dispatch, getters }) {
      if (state.units.length) return
      const { data } = await CalcService.getUnits()
      commit('Set_Units', data)
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
      _.get(state.units.find((x) => x.symbol === symbol), 'type')
  }
}
