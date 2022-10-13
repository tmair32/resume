<script setup lang="ts"></script>

<template>
  <!-- <pre-loader /> -->
  <router-view :key="$route.fullPath" />
</template>

<style lang="scss">
#app {
  @apply bg-[#ebeaf0];
  @apply scroll-smooth overscroll-y-contain overscroll-x-none;
  @apply box-border;
  @apply cursor-default;
  @apply overflow-hidden;
}
</style>
