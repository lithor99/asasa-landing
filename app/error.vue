<template>
  <div>
    <!-- Error ui -->
    <div class="h-screen w-screen flex flex-col justify-center">
      <div class="flex justify-center text-sm lg:text-3xl xl:text-6xl">
        {{ props.error?.message }}
      </div>
      <NuxtLink
        to="/"
        class="mt-5 flex justify-center font-bold text-sm lg:text-3xl xl:text-6xl"
      >
        <div class="border-2 p-3 px-5 hover:bg-primary hover:bg-opacity-10">
          Go to home
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  error: {
    type: Object,
    default: () => {},
  },
});
</script>
