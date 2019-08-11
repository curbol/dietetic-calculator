<template>
  <tool-card title="Converter" class="converter">
    <template #toolbar>
      <v-tooltip bottom open-delay="1000">
        <template v-slot:activator="{ on }">
          <v-btn text icon color="secondary" v-on="on" @click="clear()">
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
              :rules="selectRules('Type')"
              @change="setType({ type: $event })"
            ></v-select>
          </v-flex>
        </v-layout>

        <v-layout :column="isXS" align-center justify-center>
          <v-flex d-flex>
            <v-text-field
              type="number"
              label="from"
              :value="from.value"
              :rules="numberRules('from')"
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
              label="to"
              :value="to.value"
              :rules="numberRules('to')"
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
    ...mapGetters('units', ['typesWithMultipleUnits', 'unitsOfType']),
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
      'setToUnit'
    ]),
    selectRules: (label) => [(x) => !!x || `${label} is required`],
    numberRules: (label) => [(x) => !!x || `${label} is required`],
    clear() {
      this.clearInputs()
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style lang="scss" scoped>
.converter {
  max-width: 40rem;
}

.units {
  width: 60px;
  min-width: 60px;
  max-width: 60px;
}
</style>
