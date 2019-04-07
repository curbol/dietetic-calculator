<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <section>
        <calculator />
      </section>
    </v-flex>
  </v-layout>
</template>

<script>
import Calculator from '~/components/Calculator.vue'

export default {
  components: {
    Calculator
  }
}
</script>
