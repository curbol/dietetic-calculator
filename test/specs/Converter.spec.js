import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import test from 'ava'
import Converter from '@/components/Converter.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

test('component should mount', (t) => {
  const wrapper = shallowMount(Converter, { localVue })
  t.is(wrapper.isVueInstance(), true)
})
