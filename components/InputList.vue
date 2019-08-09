<template>
  <tool-card title="Inputs">
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
      <v-container grid-list-sm pa-4>
        <transition-group
          name="input"
          tag="div"
          class="layout align-start justify-center wrap"
        >
          <v-flex
            v-for="selection in activeSelections"
            :key="selection.id"
            xs12
            sm6
            md12
            lg12
            xl6
            d-flex
          >
            <v-select
              :label="selection.name"
              :items="selection.options"
              :value="selection.value"
              :rules="selectRules(selection.name)"
              required
              @change="setSelectionValue({ id: selection.id, value: $event })"
            >
              <v-icon slot="prepend">{{ selection.icon }}</v-icon>
            </v-select>
          </v-flex>

          <v-flex
            v-for="input in activeInputs"
            :key="input.id"
            xs12
            sm6
            md12
            lg12
            xl6
            d-flex
          >
            <v-text-field
              type="number"
              :label="input.name"
              :value="input.value"
              :rules="numberRules(input.name)"
              required
              @focus="$event.target.select()"
              @input="setInputValue({ id: input.id, value: $event })"
            >
              <v-icon slot="prepend">{{ input.icon }}</v-icon>
            </v-text-field>

            <v-select
              class="units"
              item-text="symbol"
              item-value="symbol"
              label="Units"
              :items="unitsOfType(input.type)"
              :value="input.selectedUnit"
              @change="
                setInputSelectedUnit({ id: input.id, selectedUnit: $event })
              "
            >
              <template slot="item" slot-scope="data">
                <span>{{ data.item.name }} ({{ data.item.symbol }})</span>
              </template>
            </v-select>
          </v-flex>
        </transition-group>
      </v-container>
    </v-form>
  </tool-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ToolCard from '@/components/ToolCard.vue'

export default {
  components: {
    ToolCard
  },
  data: () => ({
    valid: true
  }),
  computed: {
    ...mapGetters('calcs', ['activeSelections', 'activeInputs', 'unitsOfType'])
  },
  methods: {
    ...mapActions('calcs', [
      'setSelectionValue',
      'setInputValue',
      'setInputSelectedUnit',
      'clearInputs'
    ]),
    selectRules: (label) => [(x) => !!x || `${label} is required`],
    numberRules: (label) => [
      (x) => !!x || `${label} is required`,
      (x) => x > 0 || `${label} must be greater than zero`
    ],
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

.input-enter-active,
.input-leave-active {
  transition: all 0.3s ease;
}
.input-enter,
.input-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
