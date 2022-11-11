<script setup lang="ts">
import { galleryItems } from "~/common/Items";
</script>
<template>
  <card
    v-for="gallery in galleryItems"
    :key="gallery.title"
    :title="gallery.title"
    :width="gallery.width"
    :height="gallery.height"
    :left="gallery.left"
    :top="gallery.top"
  />
</template>

<style scoped></style>
