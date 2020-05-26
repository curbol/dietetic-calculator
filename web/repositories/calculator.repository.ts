import { GraphQLClient } from 'graphql-request'

const endpoint = 'https://dietetic-calculator-prod.herokuapp.com/graphql'
const api = new GraphQLClient(endpoint)

export default {
  async getCalculators() {
    const query = /* GraphQL */ `
      query {
        calculators {
          id
          key
          name
          description
          defaultOutputUnit
          categoryId
          category {
            id
            name
            icon
          }
          inputs {
            id
            name
            unitCategoryId
            unitCategory {
              id
              name
            }
            defaultUnit
            icon
          }
          selects {
            id
            name
            options {
              id
              text
              selectId
            }
            icon
          }
        }
      }
    `
    const data = await api.request(query)
    return data.calculators
  },

  async getUnits() {
    const query = /* GraphQL */ `
      query {
        units {
          id
          name
          symbol
          factor
          categoryId
          category {
            id
            name
          }
        }
      }
    `
    const data = await api.request(query)
    return data.units
  },
}
