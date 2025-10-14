<script setup lang="ts">
interface Props {
    message?: string;
}

const props = withDefaults(defineProps<Props>(), {
    message: "No data available",
});

const emit = defineEmits<{
    refresh: [];
}>();

const handleRefresh = () => {
    emit("refresh");
};
</script>

<template>
    <div
        class="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-gray-300 rounded-lg"
    >
        <div class="flex flex-col items-center gap-4">
            <!-- Empty Box Icon -->
            <svg
                class="w-20 h-20 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
            </svg>

            <!-- Message -->
            <p class="text-gray-600 text-lg">{{ message }}</p>

            <!-- Refresh Button -->
            <button
                @click="handleRefresh"
                class="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full"
                aria-label="Refresh"
            >
                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                </svg>
            </button>
        </div>
    </div>
</template>
