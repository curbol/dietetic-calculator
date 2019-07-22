import CalcService from '@/services/CalcService.js'

export default {
  state() {
    return {
      categories: [],
      calculators: []
    }
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories
    },
    setCalculators(state, calculators) {
      state.calculators = calculators
    },
    activateCategory(state, category) {
      state.categories = state.categories.map(x =>
        x.id === category.id ? category : x
      )
    },
    selectCalculator(state, calc) {
      state.calculators = state.calculators.map(x =>
        x.id === calc.id ? calc : x
      )
    }
  },
  actions: {
    async fetchCategories({ commit }) {
      const { data } = await CalcService.getCategories()
      data.map(category => ({
        ...category,
        active: true
      }))
      commit('setCategories', data)
    },
    async fetchCalculators({ commit }) {
      const { data } = await CalcService.getCalculators()
      data.map(calc => ({
        ...calc,
        selected: true
      }))
      commit('setCalculators', data)
    },
    async activateCategory({ commit, getters }, id) {
      const category = getters.getCategoryById(id)
      commit('setEvent', category)
    },
    async selectCalculator({ commit, getters }, id) {
      const event =
        getters.getEventById(id) || (await CalcService.getEvent(id)).data
      commit('setEvent', event)
    }
  },
  getters: {
    getCategoryById: state => id =>
      state.categories.find(category => category.id === id),
    getCalcById: state => id => state.calculators.find(calc => calc.id === id)
  }
}
