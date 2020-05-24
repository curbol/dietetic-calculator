<template>
  <v-card color="app darken-3" elevation="3">
    <v-toolbar flat dense color="primary">
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-tooltip color="app darken-2" bottom open-delay="800">
        <template v-slot:activator="{ on }">
          <v-btn text icon color="icon" v-on="on" @click="clear()">
            <v-icon>mdi-delete-sweep</v-icon>
          </v-btn>
        </template>

        <span>Clear All</span>
      </v-tooltip>
    </v-toolbar>

    <v-form ref="form">
      <v-container grid-list-lg pa-4>
        <transition-group
          name="slide"
          tag="div"
          class="layout align-start justify-left wrap"
        >
          <v-flex
            v-for="select in activeSelects"
            :key="select.name"
            xs12
            sm6
            md12
            lg12
            xl6
          >
            <v-select
              :label="select.name"
              :items="select.options"
              item-text="text"
              item-value="text"
              :value="select.value"
              :rules="selectRules(select.name)"
              required
              @change="setSelectValue({ id: select.id, value: $event })"
            >
              <v-icon slot="prepend" color="icon">{{ select.icon }}</v-icon>
            </v-select>
          </v-flex>

          <v-flex
            v-for="input in activeInputs"
            :key="input.name"
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
              <v-icon slot="prepend" color="icon">{{ input.icon }}</v-icon>
            </v-text-field>

            <v-select
              class="units"
              item-text="symbol"
              item-value="symbol"
              label="Units"
              :items="input.unitCategory.units"
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
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'InputList',
  data: () => ({
    title: 'Inputs',
    valid: true,
  }),
  computed: {
    ...mapGetters('calculators', ['activeInputs', 'activeSelects']),
    ...mapGetters('entities', ['query']),
  },
  methods: {
    ...mapActions('calculators', [
      'setSelectValue',
      'setInputValue',
      'setInputSelectedUnit',
      'clearInputs',
    ]),
    selectRules: (label) => [(x) => !!x || `${label} is required`],
    numberRules: (label) => [
      (x) => !!x || `${label} is required`,
      (x) => x > 0 || `${label} must be greater than zero`,
    ],
    clear() {
      this.clearInputs()
      this.$refs.form.resetValidation()
    },
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
