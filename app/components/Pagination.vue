<!-- components/Pagination.vue -->
<template>
    <div class="flex items-center justify-center gap-2 px-4">
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
            <template v-for="(item, index) in pageNumbers" :key="index">
                <button
                    v-if="item !== '...'"
                    @click="onPageChange(item)"
                    :class="[
                        'rounded-lg px-4 py-2 font-medium transition-colors',
                        currentPage === item
                            ? 'bg-gray-900 text-white'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
                    ]"
                >
                    {{ item }}
                </button>
                <span v-else class="flex items-center px-2 text-gray-500">
                    ...
                </span>
            </template>
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
import { computed } from "vue";

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

const pageNumbers = computed(() => {
    const pages = [];
    const total = props.totalPages;
    const current = props.currentPage;

    // If total pages is 5 or less, show all pages
    if (total <= 5) {
        for (let i = 1; i <= total; i++) {
            pages.push(i);
        }
        return pages;
    }

    // Always show first page
    pages.push(1);

    // Calculate start and end of middle range
    if (current <= 3) {
        // Near the beginning
        pages.push(2, 3, 4, "...", total);
    } else if (current >= total - 2) {
        // Near the end
        pages.push("...", total - 3, total - 2, total - 1, total);
    } else {
        // In the middle
        pages.push("...", current - 1, current, current + 1, "...", total);
    }

    return pages;
});

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
