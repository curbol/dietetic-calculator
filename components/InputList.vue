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
        <v-flex>
          <v-text-field>
            <v-icon slot="append" color="red">check_box</v-icon>
            <v-icon slot="prepend" color="green">check_box</v-icon>
          </v-text-field>
        </v-flex>
        <v-flex>
          <v-text-field>
            <v-icon slot="append" color="red">check_box</v-icon>
            <v-icon slot="prepend" color="green">check_box</v-icon>
          </v-text-field>
        </v-flex>
        <v-flex>
          <v-layout>
            <v-flex>
              <v-text-field></v-text-field>
            </v-flex>
            <v-flex sm3 d-flex>
              <v-select :items="items" label="kg"></v-select>
            </v-flex>
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
    ...mapState('calcs', ['categories', 'calculators']),
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

<style lang="scss" scoped></style>
