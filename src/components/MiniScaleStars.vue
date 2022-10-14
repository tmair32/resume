<script setup lang="ts">
import { StarType } from "~/types/common";

const props = defineProps<{
  minimapToGalleryWidthScale: number;
  minimapToGalleryHeightScale: number;
  starsArray: StarType[];
}>();

const stars = ref<StarType[]>([]);

const paintStars = () => {
  for (let star of stars.value) {
    star.left = parseInt(star.left) * props.minimapToGalleryWidthScale + "px";
    star.top = parseInt(star.top) * props.minimapToGalleryHeightScale + "px";
    star.width = parseInt(star.width) / 5 + "px";
    star.height = parseInt(star.height) / 5 + "px";
  }
};

onMounted(() => {
  nextTick(() => {
    watch(
      () => props.starsArray,
      (newStars) => {
        stars.value = JSON.parse(JSON.stringify(newStars));
        paintStars();
      }
    );
  });
});
</script>
<template>
  <div class="starlight">
    <div
      v-for="(star, idx) in stars"
      :key="`star-${idx}`"
      class="star"
      :class="star.range"
      :style="{
        width: star.width,
        height: star.height,
        top: star.top,
        left: star.left,
      }"
    />
  </div>
</template>

<style lang="scss" scoped>
.star {
  @apply absolute bg-star-color-A rounded-xl;
}
</style>
