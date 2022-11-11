<script setup lang="ts"></script>
<template>
  <div class="my-info">
    <div class="my-info__img">
      <img src="https://avatars.githubusercontent.com/u/55185857?v=4" />
    </div>
    <div class="my-info__name">
      <span class="font-bold font-mono text-2xl">JaeChan Lee</span>
      <span class="font-mono font-medium">Jr. Frontend Developer</span>
    </div>
    <div class="my-info__body">
      <span> Want to be a Innovative Developer </span>
      <span> who can make a difference in the world.</span>
    </div>
    <div class="my-info__contact">
      <div class="font-bold text-normal">Contact</div>
      <div class="grid grid-cols-1 gap-y-2">
        <a href="https://github.com/tmair32" target="_blank">
          <img
            src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/jaechan-lee-5b1b3b1b9/"
          target="_blank"
        >
          <img
            src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.my-info {
  @apply w-full h-full;
  @apply py-10 px-3;
  @apply grid grid-rows-4 grid-cols-1;
  @apply gap-y-4;
  @apply justify-items-center items-center;
  @apply text-sm text-center text-white;

  &__img {
    @apply w-18 h-18;
    @apply rounded-full;
    @apply overflow-hidden;
    @apply border-2 border-white border-opacity-50;
    @apply bg-white;

    img {
      @apply w-full h-full;
    }
  }

  &__name {
    @apply w-full;
    @apply grid grid-rows-2 grid-cols-1;
    @apply justify-items-center items-center;
  }

  &__body {
    @apply w-full;
    @apply grid grid-rows-3 grid-cols-1;
    @apply gap-y-2;
    @apply justify-items-center items-center;
    @apply text-xs;
  }

  &__contact {
    @apply w-full;
    @apply grid grid-rows-1 grid-cols-2;
    @apply justify-items-center;
  }
}
</style>
