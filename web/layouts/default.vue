<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      width="200"
      color="app darken-2"
      clipped
      app
    >
      <v-list shaped>
        <v-list-item v-for="link in links" :key="link.title" nuxt :to="link.to">
          <v-list-item-action>
            <v-icon color="icon">{{ link.icon }}</v-icon>
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
        <n-link nuxt to="/" class="toolbar-title">
          {{ title }}
        </n-link>
      </v-toolbar-title>

      <v-divider class="mx-4 hidden-sm-and-down" inset vertical></v-divider>

      <span
        class="subtitle-1 text-truncate font-weight-light hidden-sm-and-down"
      >
        {{ subtitle }} {{ url }}
      </span>

      <v-spacer />

      <span v-show="$vuetify.breakpoint.smAndUp">
        <v-tooltip
          v-for="link in links"
          :key="link.title"
          color="app darken-2"
          bottom
        >
          <template v-slot:activator="{ on }">
            <v-btn icon color="icon" nuxt :to="link.to" v-on="on">
              <v-icon>{{ link.icon }}</v-icon>
            </v-btn>
          </template>

          <span>{{ link.title }}</span>
        </v-tooltip>
      </span>
    </v-app-bar>

    <v-content>
      <nuxt />
    </v-content>

    <v-footer color="primary" class="py-4" width="auto" inset absolute app>
      <v-layout justify-center>
        <span class="font-weight-light"
          >&copy; {{ year }} - Curtis Bollinger</span
        >
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      url: process.env.CALC_API_URL,
      drawer: false,
      title: 'Dietetic Calculator',
      subtitle: 'Tool For Common Dietitian Calculations',
      links: [
        {
          icon: 'mdi-calculator-variant',
          title: 'Calculate',
          to: '/',
        },
        {
          icon: 'mdi-sync',
          title: 'Convert',
          to: '/convert',
        },
        {
          icon: 'mdi-information-outline',
          title: 'About',
          to: '/about',
        },
      ],
      year: new Date().getFullYear(),
    }
  },
  head: () => ({
    titleTemplate: '%s - Dietetic Calculator',
  }),
}
</script>

<style lang="scss" scoped>
.toolbar-title {
  color: inherit;
  text-decoration: inherit;
}
</style>
