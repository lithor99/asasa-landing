<template>
  <div
    :style="{ height: height ? `${height}px` : '60vh' }"
    class="flex flex-col justify-center align-center"
  >
    <img
      src="assets/images/empty.png"
      alt="empty"
      class="h-[110px] w-[110px]"
    />
    <p class="mt-2">{{ _tl("data_not_found") }}</p>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  height: {
    type: Number,
    default: 0,
  },
});
</script>
