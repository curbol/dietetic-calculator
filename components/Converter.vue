<template>
  <tool-card title="Unit Converter" class="converter">
    <template #toolbar>
      <v-tooltip bottom open-delay="1000">
        <template v-slot:activator="{ on }">
          <v-btn text icon color="secondary" v-on="on" @click="clearValues()">
            <v-icon>mdi-delete-sweep</v-icon>
          </v-btn>
        </template>
        <span>Clear All</span>
      </v-tooltip>
    </template>

    <v-form ref="form">
      <v-container grid-list-lg pa-4>
        <v-layout align-start justify-center wrap>
          <v-flex>
            <v-select
              label="Type"
              required
              :items="typesWithMultipleUnits"
              :value="type"
              @change="setType({ type: $event })"
            ></v-select>
          </v-flex>
        </v-layout>

        <v-layout :column="isXS" align-center justify-center>
          <v-flex d-flex>
            <v-text-field
              type="number"
              :label="fromLabel"
              :value="from.value"
              required
              @focus="$event.target.select()"
              @input="setFromValue({ value: $event })"
            ></v-text-field>

            <v-select
              class="units"
              item-text="symbol"
              item-value="symbol"
              label="Units"
              :items="unitsOfType(type)"
              :value="from.unit"
              @change="setFromUnit({ unit: $event })"
            >
              <template slot="item" slot-scope="data">
                <span>{{ data.item.name }} ({{ data.item.symbol }})</span>
              </template>
            </v-select>
          </v-flex>

          <v-flex justify-center d-flex>
            <v-icon>mdi-equal</v-icon>
          </v-flex>

          <v-flex d-flex>
            <v-text-field
              type="number"
              :label="toLabel"
              :value="to.value"
              required
              @focus="$event.target.select()"
              @input="setToValue({ value: $event })"
            ></v-text-field>

            <v-select
              class="units"
              item-text="symbol"
              item-value="symbol"
              label="Units"
              :items="unitsOfType(type)"
              :value="to.unit"
              @change="setToUnit({ unit: $event })"
            >
              <template slot="item" slot-scope="data">
                <span>{{ data.item.name }} ({{ data.item.symbol }})</span>
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
  </tool-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ToolCard from '@/components/ToolCard.vue'

export default {
  components: {
    ToolCard
  },
  data: () => ({
    valid: true
  }),
  computed: {
    ...mapState('convert', ['type', 'from', 'to']),
    ...mapGetters('units', [
      'typesWithMultipleUnits',
      'unitsOfType',
      'unitWithSymbol'
    ]),
    fromUnit() {
      return this.unitWithSymbol(this.from.unit)
    },
    toUnit() {
      return this.unitWithSymbol(this.to.unit)
    },
    fromLabel() {
      return `${this.fromUnit.name} Value`
    },
    toLabel() {
      return `${this.toUnit.name} Value`
    },
    formula() {
      const fromFactor = this.fromUnit.factor
      const toFactor = this.toUnit.factor
      return fromFactor >= toFactor
        ? `multiply the ${this.type.toLowerCase()} value by ${this.round(
            fromFactor / toFactor
          )}`
        : `divide the ${this.type.toLowerCase()} value by ${this.round(
            toFactor / fromFactor
          )}`
    },
    isXS() {
      return this.$vuetify.breakpoint.xs
    }
  },
  methods: {
    ...mapActions('convert', [
      'setType',
      'setFromValue',
      'setFromUnit',
      'setToValue',
      'setToUnit',
      'clearValues'
    ]),
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
