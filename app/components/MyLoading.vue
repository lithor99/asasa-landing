<template>
  <div>
    <div
      :style="loaderStyle"
      :class="`${
        nobg ? 'border-transparent' : 'border-white'
      } loader border-4 ${widthHeigth}`"
    ></div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: "",
  },
  nobg: {
    type: Boolean,
    default: true,
  },
  widthHeigth: {
    type: String,
    default: "w-[30px] h-[30px]",
  },
});

const loaderStyle = computed(() => {
  return {
    borderTopColor: props.color || "white",
  };
});
</script>
<style scoped>
.loader {
  border-radius: 50%;
  /* width: 30px;
    height: 30px; */
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
