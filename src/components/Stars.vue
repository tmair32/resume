<script setup lang="ts">
import { StarType } from "~/types/common";

const props = defineProps<{
  clientWidth: number;
  clientHeight: number;
}>();

const emits = defineEmits(["update:stars"]);

const starCount: number = 312;
const stars = ref<StarType[]>([]);

const randomRange = () => Math.floor(Math.random() * 5) + 1;

const random = (range: number, unit: string) => {
  const randNum = Math.floor(Math.random() * range) + 1;
  return `${randNum}${unit}`;
};

const createStar = (size: number) => {
  const widthAndHeight = random(size, "px");
  const star: StarType = {
    range: `blink_${randomRange()}`,
    width: widthAndHeight,
    height: widthAndHeight,
    left: random(props.clientWidth, "px"),
    top: random(props.clientHeight, "px"),
  };
  stars.value.push(star);
};

const paintStars = (stars: number, size: number) => {
  for (let i = 0; i < stars; i++) {
    createStar(size);
  }
};

onMounted(() => {
  nextTick(() => {
    paintStars(starCount, 5);
    emits("update:stars", stars.value);
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
  animation-duration: 4s;
  animation-iteration-count: infinite;
}

.blink {
  &_1 {
    animation-name: blink10;
  }
  &_2 {
    animation-name: blink20;
  }
  &_3 {
    animation-name: blink30;
  }
  &_4 {
    animation-name: blink40;
  }
  &_5 {
    animation-name: blink50;
  }
}

@keyframes blink10 {
  0%,
  100% {
    @apply bg-star-color-A;
  }
  20% {
    @apply bg-star-color-B;
  }
}

@keyframes blink20 {
  0%,
  100% {
    @apply bg-star-color-B;
  }
  40% {
    @apply bg-star-color-A;
  }
}

@keyframes blink50 {
  0%,
  100% {
    @apply bg-star-color-A;
  }
  50% {
    @apply bg-star-color-B;
  }
}

@keyframes blink30 {
  0%,
  100% {
    @apply bg-star-color-A;
  }
  60% {
    @apply bg-star-color-B;
  }
}

@keyframes blink40 {
  0%,
  100% {
    @apply bg-star-color-B;
  }
  80% {
    @apply bg-star-color-A;
  }
}
</style>
