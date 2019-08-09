<template>
  <tool-card title="Results">
    <template #toolbar></template>

    <v-container grid-list-sm pa-4>
      <transition-group
        tag="div"
        class="layout align-start justify-center wrap"
      >
        <v-flex
          v-for="calc in activeCalculators"
          :key="calc.id"
          xs12
          sm6
          md12
          lg12
          xl6
          d-flex
        >
          <v-text-field
            readonly
            :label="calc.title"
            :value="calc.result"
            @focus="$event.target.select()"
          ></v-text-field>
          <v-select
            v-if="unitsOfType(symbolType(calc.defaultUnit)).length > 1"
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
        </v-flex>
      </transition-group>
      <!-- <transition-group
        name="input"
        tag="div"
        class="layout align-start justify-center wrap"
      >
        <v-flex v-for="calc in activeCalculators" :key="calc.id" xs6>
          <v-layout>
            <v-text-field
              readonly
              :label="calc.title"
              :value="calc.result"
              @focus="$event.target.select()"
            ></v-text-field>

            <v-select
              v-if="unitsOfType(symbolType(calc.defaultUnit)).length > 1"
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
      </transition-group> -->
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
    ...mapGetters('calcs', ['activeCalculators', 'unitsOfType', 'symbolType'])
  },
  methods: {
    ...mapActions('calcs', ['setResultSelectedUnit'])
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
