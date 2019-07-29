<template>
  <v-card elevation="3">
    <v-app-bar flat dense card color="primary">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <slot name="toolbar"></slot>
    </v-app-bar>
    <slot></slot>
  </v-card>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' }
  }
}
</script>

<style lang="scss" scoped></style>
