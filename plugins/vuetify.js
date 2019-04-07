import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.cyan.base,
    accent: colors.orange.base,
    secondary: colors.cyan.darken3,
    info: colors.cyan.lighten2,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3
  }
})
