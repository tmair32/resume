<script setup lang="ts">
const props = defineProps<{
  title?: string;
  image?: string;
  link?: string;
  width: number;
  height: number;
}>();

const cardWidth = computed(() => {
  return `w-[${props.width}px]`;
});

const cardHeight = computed(() => {
  return `h-[${props.height}px]`;
});

const cardShadow = computed(() => {
  const width = props.width;
  const height = props.height;
  return {
    "--card-width": `${width}px`,
    "--card-height": `${height}px`,
  };
});
</script>
<template>
  <div class="card" :class="[cardWidth, cardHeight]" :style="cardShadow">
    <div v-if="title" class="card__title">
      <slot name="title" :title="title" />
    </div>
    <div class="card__content">
      <slot name="content" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  @apply z-999;
  @apply rounded-[33px];
  @apply bg-[#ebeaf0];
  box-shadow: calc(var(--card-width) * 0.05) calc(var(--card-height) * 0.05)
      calc(var(--card-width) * 0.1) #dbdadf,
    calc(var(--card-width) * -0.05) calc(var(--card-height) * -0.05)
      calc(var(--card-width) * 0.1) #fbfaff;
}
</style>
