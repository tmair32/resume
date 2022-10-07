<script setup lang="ts">
const steps = ref("Initiating...");

onMounted(() => {
  setTimeout(() => {
    steps.value = "Loading...";
  }, 1000);
  setTimeout(() => {
    steps.value = "Done!";
  }, 2000);
});
</script>
<template>
  <div class="Preloader">
    <div class="Preloader__inner">
      <div class="Preloader__inner__circle">
        <div class="Preloader__inner__circle__inner" />
      </div>
      <transition name="fade">
        <div class="Preloader__inner__steps">
          {{ steps }}
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Preloader {
  @apply fixed;
  @apply w-screen h-screen;
  @apply bg-white;
  @apply z-50;
  @apply transition-opacity duration-350 ease-in-out;
  @apply flex justify-center items-center;

  &__inner {
    @apply grid grid-rows-2;

    &__circle {
      @apply w-35 h-35;
      @apply rounded-full;
      @apply flex justify-center items-center;
      @apply relative;

      &__inner {
        @apply w-25 h-25;
        @apply rounded-full;

        background: linear-gradient(
          45deg,
          transparent,
          transparent 40%,
          #e5f403
        );
        animation: spin 1.5s linear infinite;

        &::before {
          content: "";
          @apply absolute inset-[6px];
          @apply rounded-full;
          @apply bg-white;
          @apply z-1000;
        }

        &::after {
          content: "";
          background: linear-gradient(
            45deg,
            transparent,
            transparent 40%,
            #e5f403
          );
          @apply absolute inset-0;
          @apply rounded-full;
          @apply filter blur-[30px];
        }
      }
    }

    &__steps {
      @apply mt-10;
      @apply text-center;
      @apply font-semibold;
      @apply font-poppins;
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
    filter: hue-rotate(0deg);
  }
  100% {
    transform: rotate(1turn);
    filter: hue-rotate(1turn);
  }
}
</style>
