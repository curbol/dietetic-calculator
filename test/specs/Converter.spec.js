import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import test from 'ava'
import Converter from '@/components/Converter.vue'
import convertStore from '@/store/convert.js'
import unitsStore from '@/store/units.js'

const localVue = createLocalVue()
localVue.use(Vuex)

const getWrapper = () => {
  const vuetify = new Vuetify({
    mocks: {
      $vuetify: {
        breakpoint: {
          xsOnly: () => false
        }
      }
    }
  })

  const store = new Vuex.Store({
    modules: {
      convert: { ...convertStore, namespaced: true },
      units: {
        ...unitsStore,
        state() {
          return {
            categories: [
              {
                name: 'Length',
                units: [
                  {
                    name: 'Millimeters',
                    symbol: 'mm',
                    factor: 0.001
                  },
                  {
                    name: 'Meters',
                    symbol: 'm',
                    factor: 1
                  },
                  {
                    name: 'Inches',
                    symbol: 'in',
                    factor: 0.0254
                  }
                ]
              }
            ]
          }
        },
        namespaced: true
      }
    }
  })

  return shallowMount(Converter, { localVue, vuetify, store })
}

// test.beforeEach((t) => {})

test('component should mount', (t) => {
  const wrapper = getWrapper()
  t.is(wrapper.isVueInstance(), true)
})

test('component should match snapshot', (t) => {
  const wrapper = getWrapper()
  t.snapshot(wrapper.html)
})
