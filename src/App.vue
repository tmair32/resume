<script setup lang="ts"></script>

<template>
  <!-- <pre-loader /> -->
  <router-view :key="$route.fullPath" />
</template>

<style lang="scss">
#app {
  @apply bg-[#ebeaf0];
  @apply scroll-smooth overscroll-y-contain overflow-x-hidden;
  @apply box-border;
}
</style>
