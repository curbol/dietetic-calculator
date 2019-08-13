<template>
  <v-card elevation="3">
    <v-toolbar flat dense color="primary">
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-tooltip bottom open-delay="800">
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            color="secondary"
            v-on="on"
            @click="setAllCalculatorsActive(true)"
          >
            <v-icon>mdi-checkbox-multiple-marked</v-icon>
          </v-btn>
        </template>

        <span>Select All</span>
      </v-tooltip>

      <v-tooltip bottom open-delay="800">
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            color="secondary"
            v-on="on"
            @click="setAllCalculatorsActive(false)"
          >
            <v-icon>mdi-checkbox-multiple-blank-outline</v-icon>
          </v-btn>
        </template>

        <span>Deselect All</span>
      </v-tooltip>
    </v-toolbar>

    <v-container grid-list-xs>
      <v-layout align-start justify-center wrap>
        <v-flex
          v-for="category in categories"
          :key="category.id"
          xs12
          sm6
          md12
          lg12
          xl6
          ma-0
          pa-0
        >
          <v-list expand flat>
            <v-list-group
              :value="category.active"
              :prepend-icon="category.icon"
              @click="toggleActivateCategory(category.id)"
            >
              <template #activator>
                <v-list-item-content>
                  <v-list-item-title v-text="category.name" />
                </v-list-item-content>
              </template>

              <v-list-item-group
                :value="activeCalculators.map((x) => x.id)"
                multiple
              >
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
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
// TODO: add option to show formula for calculator if possible
// TODO: add helper text somewhere to explain how to use the app? Helper tooltips maybe?
// !BUG: Wait for v-list-group fix so expander works correctly https://github.com/vuetifyjs/vuetify/issues/8166

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    title: 'Calculators'
  }),
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
