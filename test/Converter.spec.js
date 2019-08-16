import '@testing-library/jest-dom/extend-expect'
import { cleanup, render, fireEvent } from '@testing-library/vue'

import Converter from '~/components/Converter.vue'
import convertStore from '~/store/convert.js'
import unitsStore from '~/store/units.js'

afterEach(cleanup)

const unitsTestState = {
  state() {
    return {
      units: [
        {
          symbol: 'mg',
          type: 'Mass',
          name: 'Milligrams',
          factor: 0.001
        },
        {
          symbol: 'g',
          type: 'Mass',
          name: 'Grams',
          factor: 1
        },
        {
          symbol: 'kg',
          type: 'Mass',
          name: 'Kilograms',
          factor: 1000
        }
      ]
    }
  }
}

function renderVuexTestComponent() {
  const store = {
    modules: {
      convert: { namespaced: true, ...convertStore },
      units: { namespaced: true, ...unitsStore, ...unitsTestState }
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

test('can render with vuex with defaults', async () => {
  const { getByTestId, getByText } = renderVuexTestComponent()
  await fireEvent.click(getByText('Value'))

  expect(getByTestId('count-value')).toHaveTextContent('1')
})
