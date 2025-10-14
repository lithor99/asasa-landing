<template>
    <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <!-- Tour Card -->
        <div
            v-for="i in props.item"
            :key="i"
            class="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
            role="button"
            tabindex="0"
        >
            <!-- Image Skeleton -->
            <div class="relative h-64 bg-gray-200 overflow-hidden">
                <div class="absolute inset-0 shimmer"></div>

                <!-- Price Badge Skeleton -->
                <!-- <div class="absolute top-4 right-4">
                    <div
                        class="bg-gray-300 rounded-full h-10 w-32 overflow-hidden relative"
                    >
                        <div class="absolute inset-0 shimmer"></div>
                    </div>
                </div> -->
            </div>

            <!-- Content Skeleton -->
            <div class="p-6">
                <!-- Meta Info Skeleton -->
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-2">
                        <div
                            class="bg-gray-200 rounded-full h-4 w-4 overflow-hidden relative"
                        >
                            <div class="absolute inset-0 shimmer"></div>
                        </div>
                        <div
                            class="bg-gray-200 rounded h-4 w-16 overflow-hidden relative"
                        >
                            <div class="absolute inset-0 shimmer"></div>
                        </div>
                    </div>
                    <!-- <div
                        class="bg-gray-200 rounded-full h-6 w-24 overflow-hidden relative"
                    >
                        <div class="absolute inset-0 shimmer"></div>
                    </div> -->
                </div>

                <!-- Title Skeleton -->
                <div class="mb-2">
                    <div
                        class="bg-gray-200 rounded h-7 w-3/4 overflow-hidden relative"
                    >
                        <div class="absolute inset-0 shimmer"></div>
                    </div>
                </div>

                <!-- Description Skeleton -->
                <div class="mb-4 space-y-2">
                    <div
                        class="bg-gray-200 rounded h-4 w-full overflow-hidden relative"
                    >
                        <div class="absolute inset-0 shimmer"></div>
                    </div>
                    <div
                        class="bg-gray-200 rounded h-4 w-2/3 overflow-hidden relative"
                    >
                        <div class="absolute inset-0 shimmer"></div>
                    </div>
                </div>

                <!-- Button Skeleton -->
                <!-- <div class="flex justify-end">
                    <div
                        class="bg-gray-300 rounded-full h-12 w-28 overflow-hidden relative"
                    >
                        <div class="absolute inset-0 shimmer"></div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    item: number;
}

const props = defineProps<Props>();
</script>

<style scoped>
@keyframes shimmer {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100%);
    }
}

.shimmer {
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.6) 50%,
        transparent 100%
    );
    animation: shimmer 1.5s infinite;
}

/* Alternative shimmer effect (uncomment to use) */
/*
@keyframes shimmer-alt {
    0% {
        background-position: -1000px 0;
    }
    100% {
        background-position: 1000px 0;
    }
}

.shimmer {
    background: linear-gradient(
        to right,
        #f3f4f6 0%,
        #e5e7eb 20%,
        #f3f4f6 40%,
        #f3f4f6 100%
    );
    background-size: 1000px 100%;
    animation: shimmer-alt 2s infinite linear;
}
*/
</style>
