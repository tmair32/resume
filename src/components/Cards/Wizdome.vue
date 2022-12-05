<script setup lang="ts">
const expandedItems = ref<number[]>([]);

const toggleItem = (id: number) => {
  if (expandedItems.value.includes(id)) {
    expandedItems.value = expandedItems.value.filter((item) => item !== id);
  } else {
    expandedItems.value.push(id);
  }
};
</script>
<template>
  <div class="wizdome">
    <div class="project">
      <details>
        <summary @click="toggleItem(0)">
          <material-symbols-arrow-right-rounded class="text-4xl icon" />
          <!-- 사내 통합 관리자 사이트 개발 -->
        </summary>
        <p>asdadsfa</p>
      </details>
    </div>
    <div class="project">
      <details>
        <summary @click="toggleItem(1)">
          <material-symbols-arrow-right-rounded class="text-4xl icon" />
          <!-- 카카오 통근버스 웹 / 앱 리뉴얼 개발 -->
        </summary>
        <p>asdadsfa</p>
      </details>
    </div>
    <div class="project">
      <details>
        <summary @click="toggleItem(2)">
          <material-symbols-arrow-right-rounded class="text-4xl icon" />
          <!-- 브루스 통근버스 웹뷰 개발 -->
        </summary>
        <p>asdadsfa</p>
      </details>
    </div>
    <div class="project">
      <details>
        <summary @click="toggleItem(2)">
          <material-symbols-arrow-right-rounded class="text-4xl icon" />
          <!-- 브루스 통근버스 웹뷰 개발 -->
        </summary>
        <p>asdadsfa</p>
      </details>
    </div>
  </div>
</template>

<style lang="scss" scoped>
* {
  @apply text-white;
}

.wizdome {
  @apply w-full h-full;
  @apply p-3;
  @apply grid;
  @apply grid-cols-1;
  @apply items-center;
  @apply overflow-y-scroll;
  @apply scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-800;
}

details {
  @apply my-3
  @apply overflow-hidden;

  &[open] > summary > .icon {
    @apply transform;
    @apply rotate-90;
  }

  pre,
  p,
  ul,
  div {
    @apply ml-11;
  }
}

summary {
  @apply flex items-center;
  @apply list-none;
  @apply font-yeonsung;
  @apply text-2xl;
  @apply cursor-pointer;
}

.icon {
  @apply transition-all;
  @apply duration-300;
  @apply ease-in-out;
}
</style>
