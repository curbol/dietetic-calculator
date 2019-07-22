<template>
  <tool-card title="Calculators">
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
    <v-list expand>
      <v-list-group
        v-for="category in categories"
        :key="category.id"
        :value="category.active"
        :prepend-icon="category.icon"
        @click="toggleActivateCategory(category.id)"
      >
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{ category.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>

        <v-list-tile
          v-for="calc in getCalcsByCategoryId(category.id)"
          :key="calc.id"
          @click="() => {}"
        >
          <v-list-tile-action>
            <v-checkbox
              :value="calc.selected"
              @click.stop="toggleSelectCalculator(calc.id)"
            ></v-checkbox>
          </v-list-tile-action>

          <v-list-tile-content @click="toggleSelectCalculator(calc.id)">
            <v-list-tile-title>{{ calc.title }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ calc.subtitle }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </tool-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ToolCard from '@/components/ToolCard.vue'

export default {
  components: {
    ToolCard
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
