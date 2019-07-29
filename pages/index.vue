<template>
  <v-container fluid grid-list-xl>
    <v-layout wrap>
      <v-flex xs12 sm12 md4 lg4 xl4>
        <calc-list></calc-list>
      </v-flex>
      <v-fade-transition appear>
        <v-flex v-if="activeCalculators.length" xs12 sm12 md4 lg4 xl4>
          <input-list></input-list>
        </v-flex>
      </v-fade-transition>
      <v-fade-transition appear>
        <v-flex v-if="activeCalculators.length" xs12 sm12 md4 lg4 xl4>
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
  components: {
    CalcList,
    InputList,
    ResultList
  },
  computed: {
    ...mapGetters('calcs', ['activeCalculators'])
  },
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('calcs/fetchCategories')
    } catch (e) {
      error({
        statusCode: 503,
        message: `Unable to fetch calc groups. Please try again.`
      })
    }
    try {
      await store.dispatch('calcs/fetchCalculators')
    } catch (e) {
      error({
        statusCode: 503,
        message: `Unable to fetch calc groups. Please try again.`
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
      await store.dispatch('calcs/fetchUnits')
    } catch (e) {
      error({
        statusCode: 503,
        message: `Unable to fetch units. Please try again.`
      })
    }
  }
}
</script>
