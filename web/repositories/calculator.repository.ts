import { GraphQLClient } from 'graphql-request'

const endpoint = process.env.CALC_API_URL || ''
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
          category {
            id
            name
            icon
          }
          inputs {
            id
            name
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
