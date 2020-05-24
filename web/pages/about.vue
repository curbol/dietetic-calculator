<template>
  <v-container class="container" my-1 fill-height>
    <v-layout align-start justify-center>
      <v-card color="app darken-3" elevation="3">
        <v-toolbar flat color="primary">
          <v-toolbar-title class="headline" v-text="title" />
        </v-toolbar>

        <v-card-text class="body-1">
          Dietetic Calculator is a tool created for dietitians to make common
          calculations quick and easy. This tool is developed by Curtis
          Bollinger with dietetics knowledge provided by Chelsey Bollinger, RD,
          LD.
        </v-card-text>

        <v-img :alt="alt" src="/curtis-chelsey.jpg" height="500">
          <template v-slot:placeholder>
            <v-layout
              d-flex
              fill-height
              align-center
              justify-center
              ma-0
              class="app darken-2"
            >
              <v-progress-circular indeterminate color="icon" />
            </v-layout>
          </template>
        </v-img>

        <v-layout justify-space-around wrap>
          <v-flex
            v-for="person in [curtis, chelsey]"
            :key="person.name"
            :href="person.link"
            target="_blank"
            tag="a"
            shrink
            d-flex
            align-center
          >
            <v-btn small text icon color="primary">
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
            <span>{{ person.name }}</span>
          </v-flex>
        </v-layout>

        <v-card-text class="body-1">
          <p>
            Dietetic Calculator is a passion project that we work on in our
            spare time. More calculators and other functionality will be added
            over time.
          </p>
          <p>
            Please contact us if you have any suggestions for improvements.
            Thank you for visiting!
          </p>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    title: 'About',
    curtis: {
      name: 'Curtis Bollinger',
      link: 'https://www.linkedin.com/in/curtis-bollinger/',
    },
    chelsey: {
      name: 'Chelsey Bollinger',
      link: 'https://www.linkedin.com/in/chelsey-bollinger-ms-rd-ld-a2879bb7/',
    },
  }),
  computed: {
    alt() {
      return `${this.curtis.name} - ${this.curtis.title}, ${this.chelsey.name} - ${this.chelsey.title}`
    },
  },
  head: () => ({
    title: 'About',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Information about this site',
      },
    ],
  }),
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 700px;
}
</style>
