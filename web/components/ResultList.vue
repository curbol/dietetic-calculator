<template>
  <v-card color="app darken-3" elevation="3">
    <v-toolbar flat dense color="primary">
      <v-toolbar-title v-text="title" />
    </v-toolbar>

    <v-form ref="form">
      <v-container grid-list-lg pa-4>
        <transition-group
          name="slide"
          tag="div"
          class="layout align-start justify-left wrap"
        >
          <v-flex
            v-for="calc in activeCalculators"
            :key="calc.name"
            xs12
            sm6
            md12
            lg12
            xl6
            d-flex
          >
            <v-text-field
              readonly
              :label="calc.name"
              :value="calc.result"
              @focus="$event.target.select()"
            ></v-text-field>

            <v-select
              v-if="
                unitsInCategoryWithSymbol(calc.defaultOutputUnit).length > 1
              "
              class="units"
              item-text="symbol"
              item-value="symbol"
              label="Units"
              :items="unitsInCategoryWithSymbol(calc.defaultOutputUnit)"
              :value="calc.selectedOutputUnit"
              @input="
                setCalculatorSelectedOutputUnit({
                  id: calc.id,
                  selectedOutputUnit: $event,
                })
              "
            >
              <template slot="item" slot-scope="data">
                <span>{{ data.item.name }} ({{ data.item.symbol }})</span>
              </template>
            </v-select>

            <v-text-field
              v-else
              readonly
              class="units"
              label="Units"
              :value="calc.selectedOutputUnit"
            ></v-text-field>
          </v-flex>
        </transition-group>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ResultList',
  data: () => ({
    title: 'Results',
  }),
  computed: {
    ...mapGetters('calculators', ['activeCalculators']),
    ...mapGetters('units', ['unitsInCategoryWithSymbol']),
  },
  methods: {
    ...mapActions('calculators', ['setCalculatorSelectedOutputUnit']),
  },
}
</script>

<style lang="scss" scoped>
.units {
  width: 65px;
  min-width: 65px;
  max-width: 65px;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
