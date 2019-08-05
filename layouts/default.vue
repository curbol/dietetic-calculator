<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" width="200" clipped fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="primary" clipped-left fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-divider class="mx-2 hidden-sm-and-down" inset vertical></v-divider>
      <span class="subheading hidden-sm-and-down">{{ subtitle }}</span>
      <v-spacer />
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer color="primary" app>
      <v-layout justify-center>
        <span>&copy; 2019 - Curtis Bollinger</span>
      </v-layout>
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
          icon: 'mdi-calculator-variant',
          title: 'Calculate',
          to: '/'
        },
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
    }
  }
}
</script>
