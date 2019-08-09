<template>
  <tool-card title="Converter">
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
      <v-container grid-list-xs pa-4>
        <v-layout align-start justify-center wrap>
          <v-flex>
            <v-select
              label="Type"
              :items="unitTypes"
              :value="type"
              @change="setType({ type: $event })"
            ></v-select>
          </v-flex>

          <v-flex xs12 sm6 md12 lg12 xl6 d-flex>
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

          <v-flex xs12 sm6 md12 lg12 xl6 d-flex>
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
    ...mapGetters('calcs', ['unitTypes', 'unitsOfType'])
  },
  methods: {
    ...mapActions('convert', [
      'setType',
      'setFromValue',
      'setFromUnit',
      'setToValue',
      'setToUnit'
    ]),
    numberRules: (label) => [(x) => !!x || `${label} is required`],
    clear() {
      this.clearInputs()
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style lang="scss" scoped>
.units {
  width: 60px;
  min-width: 60px;
  max-width: 60px;
}
</style>
