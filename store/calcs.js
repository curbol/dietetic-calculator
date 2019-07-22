import _ from 'lodash'
import CalcService from '@/services/CalcService.js'

export default {
  state() {
    return {
      categories: [],
      calculators: [],
      inputs: []
    }
  },
  mutations: {
    Set_Categories(state, categories) {
      state.categories = categories
    },
    Set_Calculators(state, calculators) {
      state.calculators = calculators
    },
    Toggle_Activate_Category(state, id) {
      state.categories = state.categories.map(x =>
        x.id === id ? { ...x, active: !x.active } : x
      )
    },
    Toggle_Select_Calculator(state, id) {
      state.calculators = state.calculators.map(x =>
        x.id === id ? { ...x, selected: !x.selected } : x
      )
    },
    Set_All_Categories_Active(state, active) {
      state.categories = state.categories.map(x => ({
        ...x,
        active
      }))
    },
    Set_All_Calculators_Selected(state, selected) {
      state.calculators = state.calculators.map(x => ({
        ...x,
        selected
      }))
    }
  },
  actions: {
    async fetchCategories({ commit }) {
      const { data } = await CalcService.getCategories()
      const _data = _(data)
        .map(category => ({
          ...category,
          active: true
        }))
        .orderBy('name')
      commit('Set_Categories', _data)
    },
    async fetchCalculators({ commit }) {
      const { data } = await CalcService.getCalculators()
      const _data = _(data)
        .map(calc => ({
          ...calc,
          selected: false
        }))
        .orderBy('title')
      commit('Set_Calculators', _data)
    },
    toggleActivateCategory({ commit }, id) {
      commit('Toggle_Activate_Category', id)
    },
    toggleSelectCalculator({ commit }, id) {
      commit('Toggle_Select_Calculator', id)
    },
    setAllCalculatorsSelected({ commit }, selected) {
      commit('Set_All_Calculators_Selected', selected)
      if (selected) {
        commit('Set_All_Categories_Active', true)
      }
    }
  },
  getters: {
    getCalcsByCategoryId: state => id =>
      state.calculators.filter(x => x.category === id)
  }
}
