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
        type="button"
        :disabled="loading"
        class="outlined text-success rounded p-2 px-4 flex justify-between items-center"
        aria-label="submit button"
        @click="emit('onclick')"
    >
        <div v-if="loading" class="flex items-center justify-center font-bold">
            <Icon name="eos-icons:loading" size="20" mode="svg" />
            <span v-if="!btn" class="ml-2 animate-pulse">{{
                _tl("processing")
            }}</span>
        </div>
        <div v-else class="flex justify-center items-center">
            <Icon
                name="file-icons:microsoft-excel"
                size="20"
                class="mr-2"
                mode="svg"
            />
            <span>{{ label || _tl("export_excel") }}</span>
        </div>
    </button>
</template>

<style scoped>
.outlined {
    background-color: #2ecc7111;
    border: #2ecc71 solid 1px;
}

.outlined:hover {
    background-color: #2ecc7133;
}

.outlined:active {
    background-color: #2ecc7155;
    opacity: 0.5;
}
</style>
