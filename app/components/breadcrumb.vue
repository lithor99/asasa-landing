<template>
    <nav class="mb-4">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol class="flex items-center space-x-2 text-sm">
                <li
                    v-for="(item, index) in breadcrumbs"
                    :key="index"
                    class="flex items-center"
                >
                    <!-- Separator -->
                    <svg
                        v-if="index > 0"
                        class="w-4 h-4 text-gray-400 mx-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>

                    <!-- Link or Text -->
                    <NuxtLink
                        v-if="item.to && index !== breadcrumbs.length - 1"
                        :to="item.to"
                        class="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                    >
                        {{ item.label }}
                    </NuxtLink>
                    <span
                        v-else
                        class="text-gray-900 font-semibold"
                        :class="{
                            'line-clamp-1': index === breadcrumbs.length - 1,
                        }"
                    >
                        {{ item.label }}
                    </span>
                </li>
            </ol>
        </div>
    </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
    label: string;
    to?: string;
}

interface Props {
    items: BreadcrumbItem[];
}

const props = defineProps<Props>();

const breadcrumbs = computed(() => props.items);
</script>
