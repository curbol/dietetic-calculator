<template>
  <v-card elevation="3">
    <v-toolbar flat dense color="primary">
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <slot name="toolbar" />
    </v-toolbar>
    <slot />
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
