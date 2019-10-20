<template>
  <v-container grid-list-lg my-1>
    <v-layout align-start justify-left wrap>
      <v-flex sm12 md4>
        <calc-list></calc-list>
      </v-flex>
      <v-fade-transition>
        <v-flex v-if="activeCalcs.length" sm12 md4>
          <input-list></input-list>
        </v-flex>
      </v-fade-transition>
      <v-fade-transition>
        <v-flex v-if="activeCalcsWithResults.length" sm12 md4>
          <result-list></result-list>
        </v-flex>
      </v-fade-transition>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import CalcList from '@/components/CalcList.vue'
import InputList from '@/components/InputList.vue'
import ResultList from '@/components/ResultList.vue'

export default {
  head: () => ({
    title: 'Calculator',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Tool for common dietitian calculations'
      }
    ]
  }),
  components: {
    CalcList,
    InputList,
    ResultList
  },
  computed: {
    ...mapGetters('calcs', ['activeCalcs', 'activeCalcsWithResults'])
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('calcs/fetchCategories')
    } catch (e) {
      error({
        statusCode: 503,
        message: `Unable to fetch calculator categories. Please try again.`
      })
    }
    try {
      await store.dispatch('calcs/fetchCalculators')
    } catch (e) {
      error({
        statusCode: 503,
        message: `Unable to fetch calculators. Please try again.`
      })
    }
    try {
      await store.dispatch('calcs/fetchInputs')
    } catch (e) {
      error({
        statusCode: 503,
        message: `Unable to fetch inputs. Please try again.`
      })
    }
    try {
      await store.dispatch('units/fetchUnits')
    } catch (e) {
      error({
        statusCode: 503,
        message: `Unable to fetch units. Please try again.`
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
