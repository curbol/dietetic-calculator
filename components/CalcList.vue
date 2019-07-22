<template>
  <tool-card title="Calculators">
    <template #toolbar>
      <v-btn flat icon color="secondary">
        <v-icon>check_box</v-icon>
      </v-btn>
      <v-btn flat icon color="secondary">
        <v-icon>check_box_outline_blank</v-icon>
      </v-btn>
    </template>
    <v-list expand>
      <v-list-group
        v-for="calcGroup in calcGroups"
        :key="calcGroup.type"
        v-model="calcGroup.active"
        :prepend-icon="calcGroup.icon"
      >
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{ calcGroup.type }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>

        <v-list-tile
          v-for="calc in calcGroup.calcs"
          :key="calc.id"
          @click="() => {}"
        >
          <v-list-tile-action>
            <v-checkbox v-model="calc.active"></v-checkbox>
          </v-list-tile-action>

          <v-list-tile-content @click="calc.active = !calc.active">
            <v-list-tile-title>{{ calc.title }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ calc.subtitle }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </tool-card>
</template>

<script>
import { mapState } from 'vuex'
import ToolCard from '@/components/ToolCard.vue'

export default {
  components: {
    ToolCard
  },
  computed: {
    ...mapState('calcs', ['calcGroups'])
  }
}
</script>

<style lang="scss" scoped></style>
