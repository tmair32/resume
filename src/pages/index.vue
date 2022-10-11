<script setup lang="ts">
const shinyRef = ref<HTMLButtonElement | null>(null);
const shinyY = ref(0);
const shinyX = ref(0);

const handleMouseMove = (e: MouseEvent) => {
  if (shinyRef.value) {
    const { x, y } = shinyRef.value.getBoundingClientRect();
    requestAnimationFrame(() => {
      shinyX.value = e.clientX - x;
      shinyY.value = e.clientY - y;
    });
  }
};

const cssVariables = computed(() => {
  return {
    "--shiny-x": `${shinyX.value}`,
    "--shiny-y": `${shinyY.value}`,
  };
});

onMounted(() => {
  if (shinyRef.value) {
    shinyRef.value.addEventListener("mousemove", handleMouseMove);
  }
});

onUnmounted(() => {
  if (shinyRef.value) {
    shinyRef.value.removeEventListener("mousemove", handleMouseMove);
  }
});
</script>
<template>
  <div ref="shinyRef" class="resume" :style="cssVariables"></div>
</template>

<style lang="scss" scoped>
.resume {
  @apply w-screen h-screen;
  @apply relative overflow-hidden;
  @apply text-white font-bold;
  @apply py-[10px] px-[15px];
  @apply border-0 rounded-[10px];
  @apply bg-[#ebeaf0];

  &::after {
    content: "";
    @apply absolute;
    @apply opacity-0;
    transition: opacity 0.2s;
    background: radial-gradient(#fde68a, #ebeaf0 50%);
    @apply rounded-full;
    @apply w-[500px] h-[500px];
    top: calc(var(--shiny-y, 0) * 1px - 250px);
    left: calc(var(--shiny-x, 0) * 1px - 250px);
  }

  &:hover::after {
    @apply opacity-40;
  }
}
</style>
