<script setup lang="ts">
defineProps({
    label: {
        type: String,
        default: "",
    },
    route: {
        type: String,
        default: "",
    },
});
</script>
<template>
    <button
        type="button"
        class="bg-secondary rounded p-2 px-4 flex justify-between items-center text-white"
        @click="navigateTo(route)"
    >
        <Icon name="material-symbols:add" size="20" class="mr-2" mode="svg" />
        {{ label || _tl("add") }}
    </button>
</template>
<style scoped></style>
