import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:4000`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getCategories() {
    return apiClient.get('/categories')
  },
  getCalculators() {
    return apiClient.get('/calculators')
  }
}
