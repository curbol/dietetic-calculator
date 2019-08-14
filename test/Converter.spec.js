import '@testing-library/jest-dom/extend-expect'
import { cleanup, render, fireEvent } from '@testing-library/vue'

import Converter from '~/components/Converter.vue'
import convertStore from '~/store/convert.js'
import unitsStore from '~/store/units.js'

afterEach(cleanup)

// A common testing pattern is to create a custom renderer for a specific test
// file. This way, common operations such as registering a Vuex store can be
// abstracted out while avoiding sharing mutable state.
//
// Tests should be completely isolated from one another.
// Read this for additional context: https://kentcdodds.com/blog/test-isolation-with-react
function renderVuexTestComponent(customStore) {
  // Render the component and merge the original store and the custom one
  // provided as a parameter. This way, we can alter some behaviors of the
  // initial implementation.

  const store = {
    modules: {
      convert: { namespaced: true, ...convertStore },
      units: { namespaced: true, ...unitsStore }
    }
  }

  console.log('store: ', store)

  return render(Converter, {
    store,
    mocks: {
      $vuetify: { breakpoint: {} }
    }
  })
}

test('Setup correctly', () => {
  expect(true).toBe(true)
})

test('can render with vuex with defaults', async () => {
  const { getByTestId, getByText } = renderVuexTestComponent()
  await fireEvent.click(getByText('Milligrams Value'))

  expect(getByTestId('count-value')).toHaveTextContent('1')
})

// test('can render with vuex with custom initial state', async () => {
//   const { getByTestId, getByText } = renderVuexTestComponent({
//     state: { count: 3 }
//   })
//   await fireEvent.click(getByText('-'))

//   expect(getByTestId('count-value')).toHaveTextContent('2')
// })

// test('can render with vuex with custom store', async () => {
//   jest.spyOn(console, 'error').mockImplementation(() => {})

//   // This is a silly store that can never be changed.
//   const store = { state: { count: 1000 } }

//   // Notice how here we are not using the helper method, because there's no
//   // need to do that.
//   const { getByTestId, getByText } = render(VuexTest, { store })

//   await fireEvent.click(getByText('+'))
//   expect(getByTestId('count-value')).toHaveTextContent('1000')

//   await fireEvent.click(getByText('-'))
//   expect(getByTestId('count-value')).toHaveTextContent('1000')

//   expect(console.error).toHaveBeenCalled()
// })
