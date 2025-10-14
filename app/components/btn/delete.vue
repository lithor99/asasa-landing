<script setup lang="ts">
defineProps({
    btn: {
        type: Boolean,
        default: true,
    },
    loading: {
        type: Boolean,
        default: false,
    },
});
const emit = defineEmits(["onClick"]);

function onConfirm() {
    emit("onClick");
}
</script>
<template>
    <button
        type="button"
        :disabled="loading"
        :class="`${
            btn
                ? 'tonal'
                : 'btn rounded p-2 px-4 flex justify-between align-center'
        }`"
        @click="onConfirm"
    >
        <div
            v-if="loading"
            class="flex align-center justify-center items-center font-bold"
        >
            <Icon name="eos-icons:loading" size="20" mode="svg" />
            <span v-if="!btn" class="ml-2 animate-pulse">{{
                _tl("processing")
            }}</span>
        </div>
        <div v-else class="flex justify-center align-center items-center">
            <Icon name="fluent:delete-32-filled" size="20" mode="svg" />
            <span v-if="!btn" class="ml-2">{{ _tl("delete") }}</span>
        </div>
    </button>
</template>
<style scoped>
.tonal {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    color: #dc2626;
}

.tonal:hover {
    background-color: #dc262611;
}

.tonal:active {
    background-color: #dc262655;
    opacity: 0.5;
}

.btn {
    background-color: #dc262611;
    color: #dc2626;
}

.btn:hover {
    background-color: #dc262633;
}

.btn:active {
    background-color: #dc262655;
    opacity: 0.5;
}
</style>
