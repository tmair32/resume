<script setup lang="ts">
import { gsap } from "gsap";
import Draggable from "gsap/dist/Draggable";

const pageRef = ref<HTMLButtonElement | null>(null);

// Mouse Highlight
const shinyY = ref(0);
const shinyX = ref(0);

const handleMouseMove = (e: MouseEvent) => {
  if (pageRef.value) {
    const { x, y } = pageRef.value.getBoundingClientRect();
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
  if (pageRef.value) {
    pageRef.value.addEventListener("mousemove", handleMouseMove);
  }
});

onUnmounted(() => {
  if (pageRef.value) {
    pageRef.value.removeEventListener("mousemove", handleMouseMove);
  }
});

// Mouse Highlight

// Handle Resize Window
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

// Handle Resize Window

// GSAP
gsap.registerPlugin(Draggable);

// Draggable Window
onMounted(() => {
  Draggable.create(".gallery", {
    type: "x,y",
    force3D: false,
    dragResistance: 0.65,
    zIndexBoost: false,
  });
});
</script>
<template>
  <div ref="pageRef" class="page" :style="cssVariables">
    <div id="desktop" class="desktop">
      <div class="gallery">
        <div
          class="absolute top-[800px] left-[2000px] w-20 h-20 bg-rose-400"
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  @apply w-full;
  transition: transform 0.6s cubic-bezier(0.35, 0.755, 0.42, 0.95);

  &::after {
    content: "";
    @apply absolute;
    @apply opacity-0;
    transition: opacity 0.2s;
    background: radial-gradient(#fde68a, #ebeaf0 80%);
    @apply rounded-full;
    @apply w-[500px] h-[500px];
    top: calc(var(--shiny-y, 0) * 1px - 250px);
    left: calc(var(--shiny-x, 0) * 1px - 250px);
    animation: hue-rotate 1.5s ease-in-out infinite;
  }

  &:hover::after {
    @apply opacity-40;
  }
}

.desktop {
  @apply relative;
  @apply h-screen;
  @apply overflow-hidden;
  @apply z-2;
}

.gallery {
  @apply w-[3600px] h-[2200px];
  @apply relative;
  @apply overflow-hidden;
  @apply subpixel-antialiased backface-hidden;
}

@keyframes hue-rotate {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(1turn);
  }
}
</style>
