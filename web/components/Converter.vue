<template>
  <v-card elevation="3" class="converter">
    <v-toolbar flat dense color="primary">
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-tooltip bottom open-delay="800">
        <template v-slot:activator="{ on }">
          <v-btn text icon color="secondary" v-on="on" @click="clearValues()">
            <v-icon>mdi-delete-sweep</v-icon>
          </v-btn>
        </template>

        <span>Clear All</span>
      </v-tooltip>
    </v-toolbar>

    <v-form ref="form">
      <v-container grid-list-lg pa-4>
        <v-layout align-center justify-center>
          <v-flex>
            <v-select
              required
              :items="categoriesWithMultipleUnits"
              :value="category"
              @change="setCategory($event)"
            ></v-select>
          </v-flex>
        </v-layout>

        <v-layout
          :wrap="$vuetify.breakpoint.xsOnly"
          align-center
          justify-center
        >
          <v-flex d-flex>
            <v-text-field
              type="number"
              :label="fromUnit.name"
              :value="from.value"
              required
              @focus="$event.target.select()"
              @input="setFromValue($event)"
            ></v-text-field>

            <v-select
              class="units"
              item-text="symbol"
              item-value="symbol"
              label="Units"
              :items="unitsInCategory(category)"
              :value="from.unit"
              @change="setFromUnit($event)"
            >
              <template slot="item" slot-scope="data">
                <span>{{ unitOption(data.item) }}</span>
              </template>
            </v-select>
          </v-flex>

          <v-flex :xs12="$vuetify.breakpoint.xsOnly" justify-center d-flex>
            <v-icon color="secondary">mdi-equal</v-icon>
          </v-flex>

          <v-flex d-flex>
            <v-text-field
              type="number"
              :label="toUnit.name"
              :value="to.value"
              required
              @focus="$event.target.select()"
              @input="setToValue($event)"
            ></v-text-field>

            <v-select
              class="units"
              item-text="symbol"
              item-value="symbol"
              label="Units"
              :items="unitsInCategory(category)"
              :value="to.unit"
              @change="setToUnit($event)"
            >
              <template slot="item" slot-scope="data">
                <span>{{ unitOption(data.item) }}</span>
              </template>
            </v-select>
          </v-flex>
        </v-layout>
        <v-layout row align-center justify-left>
          <v-flex shrink>
            <v-chip small label color="accent">
              Formula
            </v-chip>
          </v-flex>

          <v-flex shrink>
            <span class="body-2 font-weight-light">{{ formula }}</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    title: 'Unit Converter',
    valid: true
  }),
  computed: {
    ...mapState('convert', ['category', 'from', 'to']),
    ...mapGetters('units', [
      'categoriesWithMultipleUnits',
      'unitsInCategory',
      'unitWithSymbol'
    ]),
    fromUnit() {
      return this.unitWithSymbol(this.from.unit) || {}
    },
    toUnit() {
      return this.unitWithSymbol(this.to.unit) || {}
    },
    formula() {
      const fromFactor = this.fromUnit.factor
      const toFactor = this.toUnit.factor
      const typeText = this.category && this.category.toLowerCase()
      return fromFactor >= toFactor
        ? `multiply the ${typeText} value by ${this.round(
            fromFactor / toFactor
          )}`
        : `divide the ${typeText} value by ${this.round(toFactor / fromFactor)}`
    }
  },
  methods: {
    ...mapActions('convert', [
      'setCategory',
      'setFromValue',
      'setFromUnit',
      'setToValue',
      'setToUnit',
      'clearValues'
    ]),
    unitOption(unit) {
      return unit ? `${unit.name} (${unit.symbol})` : ''
    },
    clear() {
      this.clearInputs()
      this.$refs.form.resetValidation()
    },
    round(value) {
      return parseFloat(value.toFixed(5))
    }
  }
}
</script>

<style lang="scss" scoped>
.converter {
  max-width: 40rem;
}

.units {
  width: 65px;
  min-width: 65px;
  max-width: 65px;
}
</style>
