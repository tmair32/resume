<script setup lang="ts"></script>
<template>
  <div class="career">
    <div class="career__body">
      <div class="career__title">
        <span><heroicons-solid-office-building /></span>
        <h1>Wizdome</h1>
      </div>
      <div class="career__period">
        <h2>2020.08 ~ 2021.08</h2>
      </div>
      <div class="career__position">
        <h2>Frontend Developer</h2>
      </div>
    </div>
    <div class="career__body">
      <div class="career__title">
        <span><heroicons-solid-office-building /></span>
        <h1>Genome Opinion</h1>
      </div>
      <div class="career__period">
        <h2>2022.02 ~ now</h2>
      </div>
      <div class="career__position">
        <h2>Frontend Developer</h2>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.career {
  @apply w-full h-full;
  @apply py-10 px-3;
  @apply grid grid-rows-2 grid-cols-1;
  @apply gap-y-5;
  @apply items-center;
  @apply text-white;

  &__body {
    @apply w-full h-full;
    @apply grid grid-rows-3 grid-cols-1;
    @apply gap-y-2;
    @apply items-center;
  }

  &__title {
    @apply flex gap-x-1;
    @apply font-extrabold text-lg;
    @apply hover:(underline decoration-2 cursor-pointer);
  }

  &__period,
  &__position {
    @apply font-medium text-sm;
    @apply ml-6;
  }
}
</style>
