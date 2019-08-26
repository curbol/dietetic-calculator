import { GraphQLClient } from 'graphql-request'

const endpoint = 'http://35.224.32.89'
const api = new GraphQLClient(endpoint)

export default {
  async getCalculatorCategories() {
    const query = /* GraphQL */ `
      query {
        calculatorCategories(orderBy: name_ASC) {
          name
          icon
          calculators(orderBy: name_ASC) {
            key
            name
            description
            defaultUnit
          }
        }
      }
    `

    const data = await api.request(query)
    return data.calculatorCategories
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
