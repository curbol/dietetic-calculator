import { GraphQLClient } from 'graphql-request'

const endpoint = process.env.CALC_API_HTTP
console.log('endpoint: ', endpoint)
const api = new GraphQLClient(endpoint)

export default {
  async getCalculatorCategories() {
    const query = /* GraphQL */ `
      query {
        calculatorCategories(orderBy: name_ASC) {
          name
          icon
        }
      }
    `

    const data = await api.request(query)
    return data.calculatorCategories
  },

  async getCalculators() {
    const query = /* GraphQL */ `
      query {
        calculators(orderBy: name_ASC) {
          key
          name
          description
          defaultUnit
          category {
            name
          }
          inputs {
            name
          }
          selects {
            name
          }
        }
      }
    `

    const data = await api.request(query)
    return data.calculators
  },

  async getInputs() {
    const query = /* GraphQL */ `
      query {
        inputs(orderBy: name_ASC) {
          name
          category {
            name
          }
          defaultUnit
          icon
        }
      }
    `

    const data = await api.request(query)
    return data.inputs
  },

  async getSelects() {
    const query = /* GraphQL */ `
      query {
        selects(orderBy: name_ASC) {
          name
          options
          icon
        }
      }
    `

    const data = await api.request(query)
    return data.selects
  },

  async getUnitCategories() {
    const query = /* GraphQL */ `
      query {
        unitCategories(orderBy: name_ASC) {
          name
          units(orderBy: factor_ASC) {
            name
            symbol
            factor
          }
        }
      }
    `
    const data = await api.request(query)
    return data.unitCategories
  }
}
