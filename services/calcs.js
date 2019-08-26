import { GraphQLClient } from 'graphql-request'

const endpoint = 'http://35.224.32.89'
const api = new GraphQLClient(endpoint)

export default {
  getCalculatorCategories() {
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

    const data = api.request(query)
    return data.calculatorCategories
  },

  getInputs() {
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

    const data = api.request(query)
    return data.inputs
  },

  getSelects() {
    const query = /* GraphQL */ `
      query {
        selects(orderBy: name_ASC) {
          name
          options
          icon
        }
      }
    `

    const data = api.request(query)
    return data.selects
  },

  getUnitCategories() {
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

    const data = api.request(query)
    return data.unitCategories
  }
}
