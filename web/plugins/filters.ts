import Vue from 'vue'

Vue.filter('capitalize', (value: string) => {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('toUpperCase', (value: string) => {
  if (!value) return ''
  value = value.toString()
  return value.toUpperCase()
})
