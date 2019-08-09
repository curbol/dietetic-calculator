<template>
  <v-container>
    <v-layout align-start justify-center>
      <v-flex sm12 md8>
        <converter></converter>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Converter from '@/components/Converter.vue'

export default {
  components: {
    Converter
  },
  async fetch({ store, error, params }) {
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

<style lang="scss" scoped></style>
