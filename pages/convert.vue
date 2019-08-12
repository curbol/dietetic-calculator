<template>
  <v-container my-1>
    <v-layout align-start justify-center>
      <converter></converter>
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
