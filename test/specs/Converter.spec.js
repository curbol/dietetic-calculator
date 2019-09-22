import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import test from 'ava'
import Converter from '@/components/Converter.vue'
import convertStore from '@/store/convert.js'
import unitsStore from '@/store/units.js'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

let store

test.beforeEach((t) => {
  store = new Vuex.Store({
    modules: {
      convert: { ...convertStore, namespaced: true },
      units: { ...unitsStore, namespaced: true }
    }
  })
})

test('component should mount', (t) => {
  const wrapper = shallowMount(Converter, { localVue, store })
  t.is(wrapper.isVueInstance(), true)
})
