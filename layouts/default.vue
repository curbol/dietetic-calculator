<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" width="200" clipped fixed app>
      <v-list shaped>
        <v-list-item
          v-for="(link, i) in [home, ...links]"
          :key="i"
          :to="link.to"
          router
        >
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-text="link.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary" clipped-left fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title>
        <router-link :to="home.to" class="toolbar-title">
          {{ title }}
        </router-link>
      </v-toolbar-title>

      <v-divider class="mx-4 hidden-sm-and-down" inset vertical></v-divider>

      <span
        class="subtitle-1 text-no-wrap text-truncate font-weight-light hidden-sm-and-down"
        >{{ subtitle }}</span
      >
      <v-spacer />

      <v-tooltip v-for="(link, i) in links" :key="i" bottom>
        <template v-slot:activator="{ on }">
          <v-btn text icon color="secondary" :to="link.to" router v-on="on">
            <v-icon>{{ link.icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ link.title }}</span>
      </v-tooltip>
    </v-app-bar>

    <v-content>
      <nuxt />
    </v-content>

    <v-footer color="primary py-4" app>
      <v-layout justify-center>
        <span class="font-weight-light">&copy; 2019 - Curtis Bollinger</span>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
// TODO: get rid of scroll bar on right

export default {
  data: () => ({
    drawer: false,
    title: 'Dietetic Calculator',
    subtitle: 'Tool For Common Dietetic Calculations',
    home: {
      icon: 'mdi-calculator-variant',
      title: 'Calculate',
      to: '/'
    },
    links: [
      {
        icon: 'mdi-sync',
        title: 'Convert',
        to: '/convert'
      },
      {
        icon: 'mdi-information-outline',
        title: 'About',
        to: '/about'
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
.toolbar-title {
  color: inherit;
  text-decoration: inherit;
}
</style>
