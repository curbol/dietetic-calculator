<template>
  <v-container my-1>
    <v-layout align-start justify-center>
      <unit-converter></unit-converter>
    </v-layout>
  </v-container>
</template>

<script>
import UnitConverter from '@/components/UnitConverter.vue'

export default {
  components: {
    UnitConverter,
  },
  async middleware({ store, error }) {
    const dispatcher = process.server ? store : store.cache
    try {
      await dispatcher.dispatch('units/fetchUnits')
    } catch (e) {
      error({ statusCode: 503, message: `Unable to fetch units` })
    }
  },
  head: () => ({
    title: 'Unit Converter',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Tool for unit conversions',
      },
    ],
  }),
}
</script>

<style lang="scss" scoped></style>
