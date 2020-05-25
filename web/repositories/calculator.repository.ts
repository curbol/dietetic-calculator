import { GraphQLClient } from 'graphql-request'

const endpoint = process.env.CALC_API_URL || ''
console.log('CALC_API_URL:', process.env.CALC_API_URL)
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
    try {
      const data = await api.request(query)
      return data.calculators
    } catch (e) {
      console.log(e)
    }
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
    try {
      const data = await api.request(query)
      return data.units
    } catch (e) {
      console.log(e)
    }
  },
}
