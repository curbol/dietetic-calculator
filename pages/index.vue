<template>
  <v-container fluid grid-list-xl>
    <v-layout wrap>
      <v-flex xs12 sm12 md4 lg4 xl4>
        <calc-list></calc-list>
      </v-flex>
      <v-flex xs12 sm12 md4 lg4 xl4>
        <input-list></input-list>
      </v-flex>
      <v-flex xs12 sm12 md4 lg4 xl4>
        <input-list></input-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CalcList from '@/components/CalcList.vue'
import InputList from '@/components/InputList.vue'

export default {
  components: {
    CalcList,
    InputList
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
  }
}
</script>
