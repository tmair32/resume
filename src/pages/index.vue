<script setup lang="ts">
import { gsap } from "gsap";
import Draggable from "gsap/dist/Draggable";
import Observer from "gsap/dist/Observer";

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
  setupSizing();
  window.addEventListener("resize", setupSizing);
});
// Handle Resize Window

// Draw Screen
gsap.registerPlugin(Draggable, Observer);

let galleryRef = ref<HTMLDivElement | null>(null),
  minimapRef = ref<HTMLDivElement | null>(null),
  minimapMarkerRef = ref<HTMLDivElement | null>(null),
  minimapX = gsap.quickSetter(minimapMarkerRef.value, "x", "px"),
  minimapY = gsap.quickSetter(minimapMarkerRef.value, "y", "px"),
  galleryX = gsap.quickSetter(galleryRef.value, "x", "px"),
  galleryY = gsap.quickSetter(galleryRef.value, "y", "px"),
  galleryScale = ref(0);

const setupSizing = () => {
  if (!galleryRef.value || !minimapRef.value || !minimapMarkerRef.value) {
    return;
  }
  galleryScale.value =
    minimapRef.value.offsetWidth / galleryRef.value.offsetWidth;
  const screenToGalleryRatio = clientWidth.value / galleryRef.value.offsetWidth;
  const aspectRatio = clientWidth.value / clientHeight.value;

  gsap.set(minimapMarkerRef.value, {
    width: screenToGalleryRatio * minimapRef.value.offsetWidth,
    height: (screenToGalleryRatio * minimapRef.value.offsetWidth) / aspectRatio,
  });
};

onMounted(() => {
  const alignMinimap = () => {
    minimapX(-galleryDraggable.x * galleryScale.value);
    minimapY(-galleryDraggable.y * galleryScale.value);
  };

  const alignGallery = () => {
    galleryX(-minimapDraggable.x / galleryScale.value);
    galleryY(-minimapDraggable.y / galleryScale.value);
  };

  const galleryDraggable = Draggable.create(".gallery", {
    bounds: window,
    onDrag: alignMinimap,
    onThrowUpdate: alignMinimap,
    inertia: true,
  })[0];

  const minimapDraggable = Draggable.create(".minimap__marker", {
    bounds: ".minimap",
    onDrag: alignGallery,
    onThrowUpdate: alignGallery,
    inertia: true,
  })[0];

  gsap.set(galleryRef.value, {
    x: (galleryDraggable.minX * galleryDraggable.maxX) / 2,
    y: (galleryDraggable.minY * galleryDraggable.maxY) / 2,
  });
  galleryDraggable.update();
  alignMinimap();
});
// Draw Screen
</script>
<template>
  <div ref="pageRef" class="page" :style="cssVariables">
    <div id="wrapper" class="wrapper">
      <div ref="galleryRef" class="gallery">
        <div class="w-40 h-40 bg-rose-400 absolute top-[1000px] left-[400px]" />
      </div>
      <div ref="minimapRef" class="minimap">
        <div ref="minimapMarkerRef" class="minimap__marker" />
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

.wrapper {
  @apply relative;
  @apply h-screen;
  @apply overflow-hidden;
  @apply z-2;
}

.gallery {
  @apply relative;
  @apply w-[3600px] h-[2200px];
  @apply overflow-hidden;
  @apply subpixel-antialiased backface-hidden;
}

.minimap {
  @apply <md: hidden;
  @apply fixed top-[10px] left-[10px];
  @apply w-80 h-60;
  @apply z-20000;
  @apply rounded-lg;
  @apply shadow-md;
  @apply bg-[#f5f5f5];

  &__marker {
    @apply absolute;
    @apply bg-[#D0D0D0];
  }
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
