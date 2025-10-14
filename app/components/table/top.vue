<script setup lang="ts">
defineProps({
    title: {
        type: String,
        default: "",
    },
    route: {
        type: String,
        default: "",
    },
    label: {
        type: String,
        default: "",
    },
});
</script>

<template>
    <div class="flex justify-between align-center">
        <strong class="text-primary text-xl">{{ title }}</strong>
        <BtnAdd v-if="route" :route="route" :label="label" />
    </div>
</template>
