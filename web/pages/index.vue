<template>
  <v-container grid-list-lg my-1>
    <v-layout align-start justify-left wrap>
      <v-flex sm12 md4>
        <calculator-list></calculator-list>
      </v-flex>
      <v-fade-transition>
        <v-flex v-if="activeCalculators.length" sm12 md4>
          <input-list></input-list>
        </v-flex>
      </v-fade-transition>
      <v-fade-transition>
        <v-flex v-if="activeCalculatorsWithResults.length" sm12 md4>
          <result-list></result-list>
        </v-flex>
      </v-fade-transition>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import CalculatorList from '@/components/CalculatorList.vue'
import InputList from '@/components/InputList.vue'
import ResultList from '@/components/ResultList.vue'

export default {
  components: {
    CalculatorList,
    InputList,
    ResultList,
  },
  async middleware({ store, error }) {
    try {
      await store.dispatch('calculators/fetchCalculators')
    } catch (e) {
      error({ statusCode: 503, message: `Unable to fetch calculators` })
    }
    try {
      await store.dispatch('units/fetchUnits')
    } catch (e) {
      error({ statusCode: 503, message: `Unable to fetch units` })
    }
  },
  computed: {
    ...mapGetters('calculators', [
      'activeCalculators',
      'activeCalculatorsWithResults',
    ]),
  },
  head: () => ({
    title: 'Calculator',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Tool for common dietitian calculations',
      },
    ],
  }),
}
</script>

<style lang="scss" scoped></style>
