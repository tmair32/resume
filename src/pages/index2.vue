<script setup lang="ts">
const resumeRef = ref<HTMLButtonElement | null>(null);

// Mouse Highlight
const shinyY = ref(0);
const shinyX = ref(0);

const handleMouseMove = (e: MouseEvent) => {
  if (resumeRef.value) {
    const { x, y } = resumeRef.value.getBoundingClientRect();
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
  if (resumeRef.value) {
    resumeRef.value.addEventListener("mousemove", handleMouseMove);
  }
});

onUnmounted(() => {
  if (resumeRef.value) {
    resumeRef.value.removeEventListener("mousemove", handleMouseMove);
  }
});

// Mouse Highlight

const clientWidth = ref(0);
const clientHeight = ref(0);

const handleResize = () => {
  clientWidth.value = window.innerWidth;
  clientHeight.value = window.innerHeight;
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});
</script>
<template>
  <div ref="resumeRef" class="resume" :style="cssVariables">
    <div class="desktop">
      <div class="desktop__gallery">
        <card :width="500" :height="300" />
      </div>
    </div>
    <div class="webgl">
      <canvas :width="clientWidth" :height="clientHeight" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.resume {
  @apply relative;
  @apply text-white font-bold;
  @apply py-[10px] px-[15px];
  @apply border-0 rounded-[10px];

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

.desktop {
  @apply relative h-screen;
  @apply z-2 overflow-hidden;

  &__gallery {
    @apply w-[2400px] h-[1200px];
  }
}

.webgl {
  @apply fixed w-full h-full;
  @apply overflow-hidden;
  @apply top-0 left-0 z-1;
}
</style>
