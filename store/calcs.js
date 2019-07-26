import _ from 'lodash'
import CalcService from '@/services/CalcService.js'

export default {
  state() {
    return {
      categories: [],
      calculators: [],
      inputs: [],
      units: []
    }
  },
  mutations: {
    Set_Categories(state, categories) {
      state.categories = categories
    },
    Set_Calculators(state, calculators) {
      state.calculators = calculators
    },
    Set_Inputs(state, inputs) {
      state.inputs = inputs
    },
    Set_Units(state, units) {
      state.units = units
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
    },
    Set_Input_Value(state, { id, value }) {
      state.inputs = state.inputs.map(x => (x.id === id ? { ...x, value } : x))
    },
    Set_Input_Selected_Unit(state, { id, selectedUnit }) {
      state.inputs = state.inputs.map(x =>
        x.id === id ? { ...x, selectedUnit } : x
      )
    },
    Clear_Inputs(state) {
      state.inputs = state.inputs.map(x => ({ ...x, value: undefined }))
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
    async fetchInputs({ commit }) {
      const { data } = await CalcService.getInputs()
      const _data = _(data)
        .map(input => ({
          ...input,
          value: undefined,
          selectedUnit: input.defaultUnit
        }))
        .orderBy('type')
      commit('Set_Inputs', _data)
    },
    async fetchUnits({ commit }) {
      const { data } = await CalcService.getUnits()
      commit('Set_Units', data)
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
    },
    setInputValue({ commit }, { id, value }) {
      commit('Set_Input_Value', { id, value })
    },
    setInputSelectedUnit({ commit }, { id, selectedUnit }) {
      commit('Set_Input_Selected_Unit', { id, selectedUnit })
    },
    clearInputs({ commit }) {
      commit('Clear_Inputs')
    }
  },
  getters: {
    getCalcsByCategoryId: state => id =>
      state.calculators.filter(x => x.category === id),
    activeInputs: state => {
      const inputIds = _(state.calculators)
        .filter(x => x.selected)
        .map(x => x.inputs)
        .flatten()
        .uniq()
      return state.inputs.filter(x => inputIds.includes(x.id))
    },
    getUnitsByType: state => type => state.units.filter(x => x.type === type)
  }
}
