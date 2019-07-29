<template>
  <tool-card title="Inputs">
    <template #toolbar>
      <v-btn flat icon color="secondary" @click="clearInputs()">
        <v-icon>delete_sweep</v-icon>
      </v-btn>
    </template>

    <v-container>
      <v-layout column align-center>
        <v-slide-y-transition group appear>
          <v-flex v-for="selection in activeSelections" :key="selection.id">
            <v-layout>
              <v-select
                :label="selection.name"
                :items="selection.options"
                :value="selection.value"
                @input="setSelectionValue({ id: selection.id, value: $event })"
              ></v-select>
            </v-layout>
          </v-flex>
          <v-flex v-for="input in activeInputs" :key="input.id">
            <v-layout>
              <v-text-field
                type="number"
                :label="input.name"
                :value="input.value"
                @input="setInputValue({ id: input.id, value: $event })"
              ></v-text-field>

              <v-select
                outlined
                class="units"
                item-text="symbol"
                item-value="symbol"
                label="Units"
                :items="unitsOfType(input.type)"
                :value="input.selectedUnit"
                @input="
                  setInputSelectedUnit({ id: input.id, selectedUnit: $event })
                "
              >
                <template slot="item" slot-scope="data">
                  <span>{{ data.item.name }} ({{ data.item.symbol }})</span>
                </template>
              </v-select>
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
    ...mapGetters('calcs', ['activeSelections', 'activeInputs', 'unitsOfType'])
  },
  methods: {
    ...mapActions('calcs', [
      'setSelectionValue',
      'setInputValue',
      'setInputSelectedUnit',
      'clearInputs'
    ])
  }
}
</script>

<style lang="scss" scoped>
.units {
  width: 60px;
}
</style>
