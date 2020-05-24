<template>
  <v-card color="app darken-3" elevation="3">
    <v-toolbar flat dense color="primary">
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-tooltip color="app darken-2" bottom open-delay="800">
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            color="icon"
            v-on="on"
            @click="setAllCalculatorsActive(true)"
          >
            <v-icon>mdi-checkbox-multiple-marked</v-icon>
          </v-btn>
        </template>

        <span>Select All</span>
      </v-tooltip>

      <v-tooltip color="app darken-2" bottom open-delay="800">
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            color="icon"
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
          v-for="category in query('calculatorCategories')
            .with('calculators')
            .get()"
          :key="category.name"
          xs12
          sm6
          md12
          lg12
          xl6
          ma-0
          pa-0
        >
          <v-list color="app darken-3" expand flat>
            <v-list-group
              :value="category.active"
              :prepend-icon="category.icon"
              @click.stop.capture="toggleCalculatorCategoryActive(category.id)"
            >
              <template #activator>
                <v-list-item-content>
                  <v-list-item-title v-text="category.name" />
                </v-list-item-content>
              </template>

              <v-list-item-group
                :value="
                  category.calculators.filter((x) => x.active).map((x) => x.key)
                "
                multiple
              >
                <v-list-item
                  v-for="calc in category.calculators"
                  :key="calc.key"
                  :value="calc.key"
                  active-class="v-list-item--active secondary--text"
                  two-line
                  @click="toggleCalculatorActive(calc.id)"
                >
                  <v-list-item-action>
                    <v-checkbox
                      :input-value="calc.active"
                      :true-value="calc.key"
                      color="secondary"
                    ></v-checkbox>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title v-text="calc.name" />
                    <v-list-item-subtitle v-text="calc.description" />
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CalculatorList',
  data: () => ({
    title: 'Calculators',
  }),
  computed: {
    ...mapGetters('entities', ['query']),
  },
  methods: {
    ...mapActions('calculators', [
      'toggleCalculatorCategoryActive',
      'toggleCalculatorActive',
      'setAllCalculatorsActive',
    ]),
  },
}
</script>

<style lang="scss" scoped></style>
