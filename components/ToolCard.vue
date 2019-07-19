<template>
  <v-card elevation="3">
    <v-toolbar dense card color="primary">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <slot name="toolbar"></slot>
    </v-toolbar>
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
