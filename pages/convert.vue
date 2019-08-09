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
  }
}
</script>

<style lang="scss" scoped></style>
