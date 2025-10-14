<!-- components/Pagination.vue -->
<template>
    <div class="flex items-center justify-center gap-2">
        <button
            @click="onPrevious"
            :disabled="currentPage === 1"
            :class="[
                'rounded-lg px-2 py-2 font-medium transition-colors',
                currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
            ]"
        >
            <svg
                :class="[
                    'w-6 h-6',
                    currentPage === 1 ? 'text-gray-400' : 'text-gray-600',
                ]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                />
            </svg>
        </button>

        <div class="flex gap-2">
            <button
                v-for="page in totalPages"
                :key="page"
                @click="onPageChange(page)"
                :class="[
                    'rounded-lg px-4 py-2 font-medium transition-colors',
                    currentPage === page
                        ? 'bg-gray-900 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
                ]"
            >
                {{ page }}
            </button>
        </div>

        <button
            @click="onNext"
            :disabled="currentPage === totalPages"
            :class="[
                'rounded-lg px-2 py-2 font-medium transition-colors',
                currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
            ]"
        >
            <svg
                :class="[
                    'w-6 h-6',
                    currentPage === totalPages
                        ? 'text-gray-400'
                        : 'text-gray-600',
                ]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                />
            </svg>
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    currentPage: {
        type: Number,
        required: true,
        default: 1,
    },
    totalPages: {
        type: Number,
        required: true,
        default: 1,
    },
});

const emit = defineEmits(["update:currentPage", "pageChange"]);

const onPrevious = () => {
    if (props.currentPage > 1) {
        const newPage = props.currentPage - 1;
        emit("update:currentPage", newPage);
        emit("pageChange", newPage);
    }
};

const onNext = () => {
    if (props.currentPage < props.totalPages) {
        const newPage = props.currentPage + 1;
        emit("update:currentPage", newPage);
        emit("pageChange", newPage);
    }
};

const onPageChange = (page) => {
    emit("update:currentPage", page);
    emit("pageChange", page);
};
</script>
