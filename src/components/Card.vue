<script setup lang="ts">
const props = defineProps<{
  title?: string;
  width: string;
  height: string;
  left: string;
  top: string;
  minimap?: boolean;
  name?: string;
}>();

const cardStyles = computed(() => {
  return {
    "--card-width": props.width,
    "--card-height": props.height,
    "--card-left": props.left,
    "--card-top": props.top,
  };
});
</script>
<template>
  <div class="card" :class="{ minimap }" :style="cardStyles">
    <div v-if="title" class="card__title">{{ title }}</div>
    <div class="card__content" :class="{ 'no-title': !title }">
      <slot :name="name" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  @apply absolute;
  @apply z-999;
  @apply rounded-[10px];
  @apply w-[var(--card-width)] h-[var(--card-height)];
  @apply left-[var(--card-left)] top-[var(--card-top)];
  @apply transform duration-300 ease-in-out;
  @apply bg-current overflow-hidden;
  @apply border-1 border-solid border-opacity-50;

  &.minimap {
    @apply rounded-[5px];
    @apply bg-white opacity-40;
  }

  &__title {
    @apply w-full;
    @apply text-sm text-center text-white;
    @apply border-b-white border-1;
    @apply rounded-t-[10px];
    @apply min-h-6;
  }

  &__content {
    @apply w-full h-[calc(var(--card-height)-1.5rem)];
    @apply rounded-b-[10px];

    &.no-title {
      @apply h-full;
    }
  }

  &:hover {
    @apply scale-105;
  }
}
</style>
