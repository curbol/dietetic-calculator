<template>
  <tool-card title="Results">
    <template #toolbar></template>

    <v-container>
      <v-layout column align-center>
        <v-slide-y-transition group appear>
          <v-flex v-for="calc in selectedCalculators" :key="calc.id">
            <v-layout>
              <v-text-field
                readonly
                :label="calc.title"
                :value="calc.result"
                @input="setInputValue({ id: calc.id, value: $event })"
              ></v-text-field>

              <v-select
                v-if="unitsOfType(symbolType(calc.defaultUnit)).length > 1"
                outlined
                class="units"
                item-text="symbol"
                item-value="symbol"
                label="Units"
                :items="unitsOfType(symbolType(calc.defaultUnit))"
                :value="calc.selectedUnit"
                @input="
                  setResultSelectedUnit({ id: calc.id, selectedUnit: $event })
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
                :value="calc.selectedUnit"
              ></v-text-field>
            </v-layout>
          </v-flex>
        </v-slide-y-transition>
      </v-layout>
    </v-container>
  </tool-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ToolCard from '@/components/ToolCard.vue'

export default {
  components: {
    ToolCard
  },
  computed: {
    ...mapGetters('calcs', ['selectedCalculators', 'unitsOfType', 'symbolType'])
  },
  methods: {
    ...mapActions('calcs', ['setResultSelectedUnit'])
  }
}
</script>

<style lang="scss" scoped>
.units {
  width: 60px;
  max-width: 60px;
}
</style>
