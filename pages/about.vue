<template>
  <v-container class="container" my-1 fill-height>
    <v-layout align-start justify-center>
      <v-card elevation="3">
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
              class="secondary darken-4"
            >
              <v-progress-circular indeterminate color="secondary" />
            </v-layout>
          </template>

          <v-layout
            pa-1
            fill-height
            wrap
            align-content-end
            justify-space-around
            class="lightbox"
          >
            <v-flex
              v-for="(person, key) in [curtis, chelsey]"
              :key="key"
              shrink
            >
              <a :href="person.link" target="_blank" class="white--text">
                <v-layout shrink column>
                  <span class="subheading">{{ person.name }}</span>
                  <span class="body-1">{{ person.email }}</span>
                </v-layout>
              </a>
            </v-flex>
          </v-layout>
        </v-img>

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
  head: () => ({
    title: 'About',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Information about this site'
      }
    ]
  }),
  data: () => ({
    title: 'About',
    curtis: {
      name: 'Curtis Bollinger',
      title: 'Software Engineer',
      email: 'curtis.bollinger@gmail.com',
      link: 'https://www.linkedin.com/in/curtis-bollinger/'
    },
    chelsey: {
      name: 'Chelsey Bollinger',
      title: 'Registered Dietitian',
      email: 'chelseymbollinger@gmail.com',
      link: 'https://www.linkedin.com/in/chelsey-bollinger-ms-rd-ld-a2879bb7/'
    }
  }),
  computed: {
    alt() {
      return `${this.curtis.name} - ${this.curtis.title}, ${this.chelsey.name} - ${this.chelsey.title}`
    }
  }
}
</script>

<style lang="scss" scoped>
$a-tags: 'a, a:active, a:hover, a:visited';
$a-tags-hover: 'a:active, a:hover';

.container {
  max-width: 700px;
}
.lightbox {
  box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4) 0%,
    transparent 75px
  );
}

.v-image {
  #{$a-tags} {
    text-shadow: 0 1px 4px #000000;
    text-decoration: none;
  }
  #{$a-tags-hover} {
    text-decoration: underline;
  }
}
</style>
