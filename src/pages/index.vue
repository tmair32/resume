<script setup lang="ts">
import { CardType } from "~/types/common";

import { gsap } from "gsap";
import Draggable from "gsap/dist/Draggable";
import Observer from "gsap/dist/Observer";

const pageRef = ref<HTMLButtonElement | null>(null);

// Mouse Highlight
const shinyY = ref(0);
const shinyX = ref(0);

const handleMouseMove = (e: MouseEvent) => {
  if (galleryRef.value) {
    const { x, y } = galleryRef.value.getBoundingClientRect();
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
  if (galleryRef.value) {
    galleryRef.value.addEventListener("mousemove", handleMouseMove);
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
  minimapX = computed(() =>
    gsap.quickSetter(minimapMarkerRef.value, "x", "px")
  ),
  minimapY = computed(() =>
    gsap.quickSetter(minimapMarkerRef.value, "y", "px")
  ),
  galleryX = computed(() => gsap.quickSetter(galleryRef.value, "x", "px")),
  galleryY = computed(() => gsap.quickSetter(galleryRef.value, "y", "px")),
  minimapToGalleryWidthScale = ref(0),
  minimapToGalleryHeightScale = ref(0),
  screenToGalleryWidthScale = ref(0),
  screenToGalleryHeightScale = ref(0);

const setupSizing = () => {
  if (!galleryRef.value || !minimapRef.value || !minimapMarkerRef.value) {
    return;
  }
  minimapToGalleryWidthScale.value =
    minimapRef.value.offsetWidth / (galleryRef.value.offsetWidth + 1);
  minimapToGalleryHeightScale.value =
    minimapRef.value.offsetHeight / (galleryRef.value.offsetHeight + 1);
  screenToGalleryWidthScale.value =
    clientWidth.value / galleryRef.value.offsetWidth;
  screenToGalleryHeightScale.value =
    clientHeight.value / galleryRef.value.offsetHeight;
  const aspectRatio = computed(() => clientWidth.value / clientHeight.value);

  gsap.set(minimapMarkerRef.value, {
    width: screenToGalleryWidthScale.value * minimapRef.value.offsetWidth,
    height: screenToGalleryHeightScale.value * minimapRef.value.offsetHeight,
  });
};

onMounted(() => {
  const alignMinimap = () => {
    minimapX.value(-galleryDraggable.x * minimapToGalleryWidthScale.value);
    minimapY.value(-galleryDraggable.y * minimapToGalleryHeightScale.value);
  };

  const alignGallery = () => {
    galleryX.value(-minimapDraggable.x / minimapToGalleryWidthScale.value);
    galleryY.value(-minimapDraggable.y / minimapToGalleryHeightScale.value);
  };

  const galleryDraggable = Draggable.create(".gallery", {
    cursor: "default",
    bounds: ".wrapper",
    onDrag: alignMinimap,
    onThrowUpdate: alignMinimap,
    inertia: true,
  })[0];

  const minimapDraggable = Draggable.create(".minimap__marker", {
    cursor: "default",
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

// Stars
const starsArray = ref([]);

// Click Minimap Card
// 나중에 수정해야함
// const moveCursor = (item: CardType) => {
//   const { left, top } = item;

//   gsap.to(galleryRef.value, {
//     x:
//       (-left * screenToGalleryWidthScale.value) /
//       minimapToGalleryWidthScale.value,
//     y:
//       (-top * screenToGalleryHeightScale.value) /
//       minimapToGalleryHeightScale.value,
//     duration: 1,
//     ease: "power3.out",
//   });

//   gsap.to(minimapMarkerRef.value, {
//     x: left - minimapMarkerRef.value.offsetWidth / 2,
//     y: top - minimapMarkerRef.value.offsetHeight / 2,
//     duration: 1,
//     ease: "power3.out",
//   });
// };
</script>
<template>
  <div ref="pageRef" class="page">
    <div id="wrapper" class="wrapper">
      <div ref="galleryRef" class="gallery" :style="cssVariables">
        <stars
          :client-width="3600"
          :client-height="2200"
          @update:stars="starsArray = $event"
        />
        <gallery />
      </div>
      <div ref="minimapRef" class="minimap">
        <div ref="minimapMarkerRef" class="minimap__marker" />
        <mini-scale-stars
          :minimap-to-gallery-width-scale="minimapToGalleryWidthScale"
          :minimap-to-gallery-height-scale="minimapToGalleryHeightScale"
          :stars-array="starsArray"
        />
        <minimap
          :minimap-to-gallery-width-scale="minimapToGalleryWidthScale"
          :minimap-to-gallery-height-scale="minimapToGalleryHeightScale"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  @apply w-full;
  transition: transform 0.6s cubic-bezier(0.35, 0.755, 0.42, 0.95);
}

.wrapper {
  @apply relative;
  @apply h-screen;
  @apply overflow-hidden;
}

.gallery {
  @apply relative;
  @apply w-[3600px] h-[2200px];
  @apply overflow-hidden;
  @apply subpixel-antialiased backface-hidden;
  @apply bg-gradient-to-t from-[rgb(25,25,112)] via-[rgb(33,20,0)] to-[rgb(0,0,0)];

  &::after {
    content: "";
    @apply absolute;
    @apply opacity-0;
    transition: opacity 0.2s;
    background: radial-gradient(#ffffff, transparent 80%);
    @apply rounded-full;
    @apply w-[200px] h-[200px];
    top: calc(var(--shiny-y, 0) * 1px - 100px);
    left: calc(var(--shiny-x, 0) * 1px - 100px);
    animation: hue-rotate 1.5s ease-in-out infinite;
  }

  &:hover::after {
    @apply opacity-40;
  }
}

.minimap {
  @apply <md: hidden;
  @apply overflow-hidden;
  @apply fixed top-[10px] left-[10px];
  @apply w-80 h-60;
  @apply z-20000;
  @apply rounded-lg;
  @apply shadow-md;
  @apply bg-gradient-to-t from-[rgb(25,25,112)] via-[rgb(33,20,0)] to-[rgb(0,0,0)];

  &__marker {
    @apply absolute;
    @apply border-1 border-white;
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
