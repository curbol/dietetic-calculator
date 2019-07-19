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
import ToolCard from '@/components/ToolCard.vue'

export default {
  components: {
    ToolCard
  },
  data() {
    return {
      calcGroups: [
        {
          type: 'Anthropometric',
          active: true,
          icon: 'accessibility_new',
          calcs: [
            {
              id: 'bmi',
              active: false,
              title: 'Body Mass Index (BMI)',
              subtitle: 'A measure of body fat in adults',
              inputs: ['height', 'weight'],
              selections: [],
              outputUnit: 'kg/m²'
            },
            {
              id: 'ibw',
              active: false,
              title: 'Ideal Body Weight (IBW)',
              subtitle: 'Estimated ideal weight for adults',
              inputs: ['height'],
              selections: ['gender'],
              outputUnit: 'kg'
            },
            {
              id: 'abw',
              active: false,
              title: 'Adjusted Body Weight (ABW)',
              subtitle: 'Adjusted ideal weight for the obese',
              inputs: ['height', 'weight'],
              selections: ['gender'],
              outputUnit: 'kg'
            }
          ]
        },
        {
          type: 'Nutritional Needs',
          active: true,
          icon: 'restaurant',
          calcs: [
            {
              id: 'mifflin',
              active: false,
              title: 'Mifflin St. Jeor',
              subtitle: 'Daily calorie needs for adults',
              inputs: ['height', 'weight', 'age'],
              selections: ['gender'],
              outputUnit: 'kcal'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
