import CalcService from '@/services/calcs.js'
import { equationProcessor } from '@/services/equation-processor.js'

const INVALID_INPUTS = 'Invalid Inputs'

export default {
  state() {
    return {
      categories: [],
      calculators: [],
      inputs: [],
      selects: []
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
    Set_Selects(state, selects) {
      state.selects = selects
    },
    Toggle_Activate_Category(state, name) {
      state.categories = state.categories.map((x) =>
        x.name === name ? { ...x, active: !x.active } : x
      )
    },
    Toggle_Activate_Calculator(state, key) {
      state.calculators = state.calculators.map((x) =>
        x.key === key ? { ...x, active: !x.active } : x
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
    Set_Select_Value(state, { id, value }) {
      state.selects = state.selects.map((x) =>
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
      state.selects = state.selects.map((x) => ({
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
    async fetchCategories({ commit }) {
      const data = await CalcService.getCalculatorCategories()
      const categories = data.map((category) => ({
        ...category,
        active: true
      }))
      commit('Set_Categories', categories)
    },
    async fetchCalculators({ commit }) {
      const data = await CalcService.getCalculators()
      const calculators = data.map((calc) => ({
        ...calc,
        active: false,
        result: INVALID_INPUTS,
        selectedUnit: calc.defaultUnit
      }))
      commit('Set_Calculators', calculators)
    },
    async fetchInputs({ commit }) {
      const inputData = await CalcService.getInputs()
      const inputs = inputData.map((input) => ({
        ...input,
        value: undefined,
        selectedUnit: input.defaultUnit
      }))
      commit('Set_Inputs', inputs)

      const selectData = await CalcService.getSelects()
      const selects = selectData.map((select) => ({
        ...select,
        value: undefined
      }))
      commit('Set_Selects', selects)
    },
    toggleActivateCategory({ commit }, name) {
      commit('Toggle_Activate_Category', name)
    },
    toggleActivateCalculator({ commit }, key) {
      commit('Toggle_Activate_Calculator', key)
    },
    setAllCalculatorsActive({ commit }, active) {
      commit('Set_All_Calculators_Active', active)
      if (active) {
        commit('Set_All_Categories_Active', true)
      }
    },
    setSelectValue({ commit, dispatch }, { id, value }) {
      commit('Set_Select_Value', { id, value })
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
        selects: state.selects
      })
      state.calculators.forEach((calc) => {
        const result = processEquation(calc) || INVALID_INPUTS
        const rounded = isNaN(result) ? result : parseFloat(result.toFixed(1))
        commit('Set_Result', { calcId: calc.id, result: rounded })
      })
    }
  },

  getters: {
    activeCalcs: (state) => state.calculators.filter((calc) => calc.active),
    calcsInCategory: (state) => (name) =>
      state.calculators.filter((calc) => calc.category.name === name),
    activeCalcsInCategory: (state, getters) => (name) =>
      getters.activeCalcs.filter((calc) => calc.category.name === name),
    activeCalcsWithResults: (state, getters) =>
      getters.activeCalcs.filter((calc) => !isNaN(calc.result)),
    activeInputs: (state, getters) =>
      getters.activeCalcs
        .map((calc) => calc.inputs.map((x) => x.name))
        .reduce((acc, cur) => [...new Set([...acc, ...cur])])
        .map((name) => state.inputs.find((input) => input.name === name)),
    activeSelects: (state, getters) =>
      getters.activeCalcs
        .map((calc) => calc.selects.map((x) => x.name))
        .reduce((acc, cur) => [...new Set([...acc, ...cur])])
        .map((name) => state.select.find((select) => select.name === name))
  }
}
