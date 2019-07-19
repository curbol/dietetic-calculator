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
    <v-list
      v-for="(calcGroup, name, index) in calcGroups"
      :key="index"
      subheader
      two-line
    >
      <v-divider v-if="index > 0"></v-divider>
      <v-subheader>{{ name }}</v-subheader>

      <v-list-tile v-for="calc in calcGroup" :key="calc.id">
        <v-list-tile-action>
          <v-checkbox></v-checkbox>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ calc.title }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ calc.subtitle }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </tool-card>
</template>

<script>
import _ from 'lodash'
import ToolCard from '@/components/ToolCard.vue'

export default {
  components: {
    ToolCard
  },
  data() {
    return {
      calculators: [
        {
          id: 'bmi',
          type: 'Anthropometric',
          title: 'Body Mass Index (BMI)',
          subtitle: 'A measure of body fat in adults',
          inputs: ['height', 'weight'],
          selections: [],
          outputUnit: 'kg/m²'
        },
        {
          id: 'ibw',
          type: 'Anthropometric',
          title: 'Ideal Body Weight (IBW)',
          subtitle: 'Estimated ideal weight for adults',
          inputs: ['height'],
          selections: ['gender'],
          outputUnit: 'kg'
        },
        {
          id: 'abw',
          type: 'Anthropometric',
          title: 'Adjusted Body Weight (ABW)',
          subtitle: 'Adjusted ideal weight for the obese',
          inputs: ['height', 'weight'],
          selections: ['gender'],
          outputUnit: 'kg'
        },
        {
          id: 'mifflin',
          type: 'Nutritional Needs',
          title: 'Mifflin St. Jeor',
          subtitle: 'Daily calorie needs for adults',
          inputs: ['height', 'weight', 'age'],
          selections: ['gender'],
          outputUnit: 'kcal'
        }
      ]
    }
  },
  computed: {
    calcGroups() {
      return _.groupBy(this.calculators, 'type')
    }
  }
}
</script>

<style lang="scss" scoped></style>
