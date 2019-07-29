<template>
  <tool-card title="Calculators">
    <template #toolbar>
      <v-btn icon color="secondary" @click="setAllCalculatorsActive(true)">
        <v-icon>check_box</v-icon>
      </v-btn>
      <v-btn icon color="secondary" @click="setAllCalculatorsActive(false)">
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
        <template #activator>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ category.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-list-item
          v-for="calc in calcsInCategory(category.id)"
          :key="calc.id"
          @click="() => {}"
        >
          <v-list-item-action>
            <v-checkbox
              :value="calc.active"
              @click.stop="toggleActivateCalculator(calc.id)"
            ></v-checkbox>
          </v-list-item-action>

          <v-list-item-content @click="toggleActivateCalculator(calc.id)">
            <v-list-item-title>{{ calc.title }}</v-list-item-title>
            <v-list-item-sub-title>{{ calc.subtitle }}</v-list-item-sub-title>
          </v-list-item-content>
        </v-list-item>
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
    ...mapState('calcs', ['categories']),
    ...mapGetters('calcs', ['calcsInCategory'])
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
