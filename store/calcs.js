import _ from 'lodash'
import CalcService from '@/services/calcs.js'
import Equations from '@/services/equations.js'

const INVALID_INPUTS = 'Invalid Inputs'

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
    },
    Set_Result_Selected_Unit(state, { id, selectedUnit }) {
      state.calculators = state.calculators.map(x =>
        x.id === id ? { ...x, selectedUnit } : x
      )
    },
    Set_Result(state, { calcId, result }) {
      state.calculators = state.calculators.map(x =>
        x.id === calcId ? { ...x, result } : x
      )
    }
  },
  actions: {
    async fetchCategories({ commit }) {
      const { data } = await CalcService.getCategories()
      const categories = _(data)
        .map(category => ({
          ...category,
          active: true
        }))
        .orderBy('name')
        .value()
      commit('Set_Categories', categories)
    },
    async fetchCalculators({ commit }) {
      const { data } = await CalcService.getCalculators()
      const calculators = _(data)
        .map(calc => ({
          ...calc,
          selected: false,
          result: INVALID_INPUTS,
          selectedUnit: calc.defaultUnit
        }))
        .orderBy('title')
        .orderBy('category')
        .value()
      commit('Set_Calculators', calculators)
    },
    async fetchInputs({ commit }) {
      const { data } = await CalcService.getInputs()
      const inputs = _(data)
        .map(input => ({
          ...input,
          value: undefined,
          selectedUnit: input.defaultUnit
        }))
        .orderBy('type')
        .value()
      commit('Set_Inputs', inputs)
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
    setInputValue({ commit, dispatch }, { id, value }) {
      commit('Set_Input_Value', { id, value })
      dispatch('calculateResults')
    },
    setInputSelectedUnit({ commit, dispatch }, { id, selectedUnit }) {
      commit('Set_Input_Selected_Unit', { id, selectedUnit })
      dispatch('calculateResults')
    },
    clearInputs({ commit, dispatch }) {
      commit('Clear_Inputs')
      dispatch('calculateResults')
    },
    setResultSelectedUnit({ commit, dispatch }, { id, selectedUnit }) {
      commit('Set_Result_Selected_Unit', { id, selectedUnit })
      dispatch('calculateResults')
    },
    calculateResults({ state, commit }) {
      state.calculators.forEach(calc => {
        const calcId = calc.id
        if (Equations[calcId]) {
          const result =
            Equations[calcId](state.units, state.inputs) || INVALID_INPUTS
          commit('Set_Result', { calcId, result })
        }
      })
    }
  },
  getters: {
    calcsInCategory: state => categoryId =>
      state.calculators.filter(calc => calc.category === categoryId),
    selectedCalculators: state =>
      state.calculators.filter(calc => calc.selected),
    activeInputs: state =>
      _(state.calculators)
        .filter(calc => calc.selected)
        .map(calc => calc.inputs)
        .flatten()
        .uniq()
        .map(id => state.inputs.find(input => input.id === id))
        .value(),
    unitsOfType: state => type => state.units.filter(x => x.type === type),
    symbolType: state => symbol =>
      _.get(state.units.find(x => x.symbol === symbol), 'type')
  }
}
