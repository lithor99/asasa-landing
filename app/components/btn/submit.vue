<script setup lang="ts">
defineProps({
    btn: {
        type: Boolean,
        default: true,
    },
    label: {
        type: String,
        default: "",
    },
    loading: {
        type: Boolean,
        default: false,
    },
});
const emit = defineEmits(["onclick"]);
</script>
<template>
    <button
        type="submit"
        :disabled="loading"
        class="bg-secondary rounded p-2 px-4 flex items-center text-white w-full text-center"
        aria-label="submit button"
        @click="emit('onclick')"
    >
        <div
            v-if="loading"
            class="flex items-center justify-center font-bold w-full"
        >
            <Icon name="eos-icons:loading" size="20" mode="svg" />
            <div v-if="btn" class="ml-2 animate-pulse">
                {{ _tl("processing") }}
            </div>
        </div>
        <div v-else class="flex justify-center items-center w-full">
            <Icon name="mingcute:save-fill" size="20" class="mr-2" mode="svg" />
            <div class="">{{ label || _tl("submit") }}</div>
        </div>
    </button>
</template>

<style scoped></style>
