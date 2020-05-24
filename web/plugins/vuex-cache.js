import createVuexCache from 'vuex-cache'

export default ({ store }) => {
  const hours = 2
  const options = {
    timeout: hours * 60 * 60 * 1000,
  }

  const setupVuexCache = createVuexCache(options)

  window.onNuxtReady(() => setupVuexCache(store))
}
