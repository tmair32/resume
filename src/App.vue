<script setup lang="ts"></script>

<template>
  <pre-loader />
  <router-view :key="$route.fullPath" />
</template>

<style scoped></style>
