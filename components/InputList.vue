<template>
  <tool-card title="Inputs">
    <template #toolbar>
      <v-btn
        flat
        icon
        color="secondary"
        @click="setAllCalculatorsSelected(true)"
      >
        <v-icon>check_box</v-icon>
      </v-btn>
      <v-btn
        flat
        icon
        color="secondary"
        @click="setAllCalculatorsSelected(false)"
      >
        <v-icon>check_box_outline_blank</v-icon>
      </v-btn>
    </template>
    <v-container>
      <v-layout column align-center>
        <v-flex v-for="input in inputs" :key="input.id">
          <v-layout>
            <v-text-field :label="input.name"></v-text-field>
            <v-select
              outlined
              class="units"
              :items="items"
              label="Units"
            ></v-select>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </tool-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ToolCard from '@/components/ToolCard.vue'

export default {
  components: {
    ToolCard
  },
  data() {
    return {
      items: ['kg', 'lb']
    }
  },
  computed: {
    ...mapState('calcs', ['categories', 'calculators', 'inputs']),
    ...mapGetters('calcs', ['getCalcsByCategoryId'])
  },
  methods: {
    ...mapActions('calcs', [
      'toggleActivateCategory',
      'toggleSelectCalculator',
      'setAllCalculatorsSelected'
    ])
  }
}
</script>

<style lang="scss" scoped>
.units {
  width: 60px;
}
</style>
