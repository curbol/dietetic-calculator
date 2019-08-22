import _ from 'lodash'
import CalcService from '@/services/calcs.js'
import { equationProcessor } from '@/services/equation-processor.js'

const INVALID_INPUTS = 'Invalid Inputs'

export default {
  state() {
    return {
      categories: [],
      calculators: [],
      selections: [],
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
    Set_Inputs(state, inputs) {
      state.inputs = inputs
    },
    Set_Selections(state, selections) {
      state.selections = selections
    },
    Toggle_Activate_Category(state, id) {
      state.categories = state.categories.map((x) =>
        x.id === id ? { ...x, active: !x.active } : x
      )
    },
    Toggle_Activate_Calculator(state, id) {
      state.calculators = state.calculators.map((x) =>
        x.id === id ? { ...x, active: !x.active } : x
      )
    },
    Set_All_Categories_Active(state, active) {
      state.categories = state.categories.map((x) => ({
        ...x,
        active
      }))
    },
    Set_All_Calculators_Active(state, active) {
      state.calculators = state.calculators.map((x) => ({
        ...x,
        active
      }))
    },
    Set_Selection_Value(state, { id, value }) {
      state.selections = state.selections.map((x) =>
        x.id === id ? { ...x, value } : x
      )
    },
    Set_Input_Value(state, { id, value }) {
      state.inputs = state.inputs.map((x) =>
        x.id === id ? { ...x, value } : x
      )
    },
    Set_Input_Selected_Unit(state, { id, selectedUnit }) {
      state.inputs = state.inputs.map((x) =>
        x.id === id ? { ...x, selectedUnit } : x
      )
    },
    Clear_Inputs(state) {
      state.inputs = state.inputs.map((x) => ({ ...x, value: undefined }))
      state.selections = state.selections.map((x) => ({
        ...x,
        value: undefined
      }))
    },
    Set_Result_Selected_Unit(state, { id, selectedUnit }) {
      state.calculators = state.calculators.map((x) =>
        x.id === id ? { ...x, selectedUnit } : x
      )
    },
    Set_Result(state, { calcId, result }) {
      state.calculators = state.calculators.map((x) =>
        x.id === calcId ? { ...x, result } : x
      )
    }
  },
  actions: {
    async fetchCategories({ state, commit }) {
      if (state.categories.length) return
      const { data } = await CalcService.getCategories()
      const categories = _(data)
        .map((category) => ({
          ...category,
          active: true
        }))
        .orderBy('name')
        .value()
      commit('Set_Categories', categories)
    },
    async fetchCalculators({ state, commit }) {
      if (state.calculators.length) return
      const { data } = await CalcService.getCalculators()
      const calculators = _(data)
        .map((calc) => ({
          ...calc,
          active: false,
          result: INVALID_INPUTS,
          selectedUnit: calc.defaultUnit
        }))
        .orderBy('title')
        .orderBy('category')
        .value()
      commit('Set_Calculators', calculators)
    },
    async fetchInputs({ state, commit }) {
      if (state.inputs.length && state.selections.length) return
      const { data: inputData } = await CalcService.getInputs()
      const inputs = _(inputData)
        .map((input) => ({
          ...input,
          value: undefined,
          selectedUnit: input.defaultUnit
        }))
        .orderBy('type')
        .value()
      commit('Set_Inputs', inputs)
      const { data: selectData } = await CalcService.getSelections()
      const selections = _(selectData)
        .map((select) => ({
          ...select,
          value: undefined
        }))
        .orderBy('id')
        .value()
      commit('Set_Selections', selections)
    },
    toggleActivateCategory({ commit }, id) {
      commit('Toggle_Activate_Category', id)
    },
    toggleActivateCalculator({ commit }, id) {
      commit('Toggle_Activate_Calculator', id)
    },
    setAllCalculatorsActive({ commit }, active) {
      commit('Set_All_Calculators_Active', active)
      if (active) {
        commit('Set_All_Categories_Active', true)
      }
    },
    setSelectionValue({ commit, dispatch }, { id, value }) {
      commit('Set_Selection_Value', { id, value })
      dispatch('calculateResults')
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
    calculateResults({ rootState, state, commit }) {
      const processEquation = equationProcessor({
        unitData: rootState.units.units,
        inputs: state.inputs,
        selections: state.selections
      })
      state.calculators.forEach((calc) => {
        const result = processEquation(calc) || INVALID_INPUTS
        const rounded = isNaN(result) ? result : parseFloat(result.toFixed(1))
        commit('Set_Result', { calcId: calc.id, result: rounded })
      })
    }
  },
  getters: {
    calcsInCategory: (state) => (categoryId) =>
      state.calculators.filter((calc) => calc.category === categoryId),
    activeCalculators: (state) =>
      state.calculators.filter((calc) => calc.active),
    activeCalcsWithResults: (state, getters) =>
      getters.activeCalculators.filter((calc) => !isNaN(calc.result)),
    /** @returns {Input[]} */
    activeInputs: (state) =>
      _(state.calculators)
        .filter((calc) => calc.active)
        .map((calc) => calc.inputs)
        .flatten()
        .uniq()
        .map((id) => state.inputs.find((input) => input.id === id))
        .value(),
    /** @returns {Selection[]} */
    activeSelections: (state) =>
      _(state.calculators)
        .filter((calc) => calc.active)
        .map((calc) => calc.selections)
        .flatten()
        .uniq()
        .map((id) => state.selections.find((selection) => selection.id === id))
        .value()
  }
}
