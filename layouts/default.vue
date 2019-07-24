<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" width="180" clipped app>
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" clipped-left app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-divider class="mx-2 hidden-sm-and-down" inset vertical></v-divider>
      <span class="subheading hidden-sm-and-down">{{ subtitle }}</span>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer color="primary" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      title: 'Dietetic Calculator',
      subtitle: 'Tool For Common Dietetic Calculations',
      items: [
        {
          icon: 'apps',
          title: 'Calculate',
          to: '/'
        },
        {
          icon: 'loop',
          title: 'Convert',
          to: '/convert'
        },
        {
          icon: 'info',
          title: 'About',
          to: '/about'
        }
      ]
    }
  }
}
</script>
