<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
/**
 *  Props
 */
const props = defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
    text: {
        type: String || null,
        default: null,
    },
    placeholder: {
        type: String,
        default: "",
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});
/**
 *  Method
 */
const emit = defineEmits(["onSearch", "onRefresh", "update:text"]);

const search = computed({
    get() {
        return props.text;
    },
    set(value) {
        emit("update:text", value);
    },
});
</script>
<template>
    <div
        class="input flex justify-center items-center bg-secondary bg-opacity-5 rounded-full"
    >
        <input
            v-model="search"
            type="text"
            class="input-search bg-transparent w-full p-2 pl-4 rounded-full"
            :placeholder="`${placeholder || _tl('search_placeholder')}...`"
            :disabled="loading || disabled"
            @keydown.enter="emit('onSearch')"
        />
        <button
            type="button"
            :disabled="loading || disabled"
            class="w-12 h-10 p-2"
            :class="{ 'cursor-not-allowed': loading || disabled }"
            @click="emit('onSearch')"
        >
            <Icon
                v-if="loading"
                name="eos-icons:loading"
                size="15"
                mode="svg"
            />
            <Icon v-else name="ep:search" size="15" mode="svg" />
        </button>
    </div>
</template>

<style scoped>
.input-search {
    outline-color: transparent !important;
}

.input-search:focus,
.input-search:hover {
    outline: 0px solid transparent !important;
}

.input-container {
    border-color: #011c39 !important;
    color: #011c39 !important;
    font-weight: 900 !important;
}

.input-container:focus,
.input-container:hover {
    color: #011c39 !important;
    border: 1px solid #2666f9 !important;
}
</style>
