<template>
  <tool-card title="Calculators">
    <template #toolbar>
      <v-btn icon color="secondary" @click="setAllCalculatorsActive(true)">
        <v-icon>mdi-checkbox-multiple-marked</v-icon>
      </v-btn>
      <v-btn icon color="secondary" @click="setAllCalculatorsActive(false)">
        <v-icon>mdi-checkbox-multiple-blank-outline</v-icon>
      </v-btn>
    </template>
    <v-list expand flat>
      <v-list-group
        v-for="category in categories"
        :key="category.id"
        :value="category.active"
        :prepend-icon="category.icon"
        @click="toggleActivateCategory(category.id)"
      >
        <template #activator>
          <v-list-item-content>
            <v-list-item-title v-text="category.name" />
          </v-list-item-content>
        </template>

        <v-list-item-group :value="activeCalculators.map((x) => x.id)" multiple>
          <v-list-item
            v-for="calc in calcsInCategory(category.id)"
            :key="calc.id"
            :value="calc.id"
            active-class="accent--text"
            two-line
            @click="toggleActivateCalculator(calc.id)"
          >
            <v-list-item-action>
              <v-checkbox
                :input-value="calc.active"
                :true-value="calc.id"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title v-text="calc.title" />
              <v-list-item-subtitle v-text="calc.subtitle" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list-group>
    </v-list>
  </tool-card>
</template>

<script>
// TODO: add tooltips to icon buttons
// TODO: add divider lines between groups
// TODO: Wait for v-list-group fix so expander works correctly
// * https://github.com/vuetifyjs/vuetify/issues/8166

import { mapState, mapGetters, mapActions } from 'vuex'
import ToolCard from '@/components/ToolCard.vue'

export default {
  components: {
    ToolCard
  },
  computed: {
    ...mapState('calcs', ['categories']),
    ...mapGetters('calcs', ['calcsInCategory', 'activeCalculators'])
  },
  methods: {
    ...mapActions('calcs', [
      'toggleActivateCategory',
      'toggleActivateCalculator',
      'setAllCalculatorsActive'
    ])
  }
}
</script>

<style lang="scss" scoped></style>
