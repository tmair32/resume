<script setup lang="ts">
import { galleryItems } from "~/common/Items";

const props = defineProps<{
  minimapToGalleryWidthScale: number;
  minimapToGalleryHeightScale: number;
}>();

const minimapItems = computed(() => {
  return galleryItems.map((item) => {
    const { width, height, left, top } = item;
    // delete 'px'
    const widthNumber = Number(width.slice(0, -2));
    const heightNumber = Number(height.slice(0, -2));
    const leftNumber = Number(left.slice(0, -2));
    const topNumber = Number(top.slice(0, -2));
    return {
      ...item,
      width: `${widthNumber * props.minimapToGalleryWidthScale}px`,
      height: `${heightNumber * props.minimapToGalleryHeightScale}px`,
      left: `${leftNumber * props.minimapToGalleryWidthScale}px`,
      top: `${topNumber * props.minimapToGalleryHeightScale}px`,
    };
  });
});
</script>
<template>
  <card
    v-for="gallery in minimapItems"
    :key="gallery.title"
    :width="gallery.width"
    :height="gallery.height"
    :left="gallery.left"
    :top="gallery.top"
    :minimap="true"
  />
</template>

<style scoped></style>
