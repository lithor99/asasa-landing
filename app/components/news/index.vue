<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <article
            v-for="article in news"
            :key="article.id"
            class="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
            @click="readArticle(article)"
        >
            <!-- Article Image -->
            <div class="relative h-56 overflow-hidden">
                <img
                    :src="`${CDN()}${article?.image}`"
                    :alt="article?.name?.lo"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            <!-- Article Content -->
            <div class="p-6">
                <div class="flex items-center gap-3 mb-3 text-sm text-gray-500">
                    <span class="flex items-center gap-1">
                        <svg
                            class="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        {{ formatDate(article?.createdAt) }}
                    </span>
                    <!-- <span>•</span>
                    <span class="flex items-center gap-1">
                        <svg
                            class="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        {{ article.readTime }} min
                    </span> -->
                </div>

                <h3
                    class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 transition-colors"
                >
                    {{ article?.name?.lo }}
                </h3>

                <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                    {{ article?.detail?.lo }}
                </p>

                <!-- Author & Stats -->
                <div
                    class="flex items-center justify-between pt-4 border-t border-gray-100"
                >
                    <div class="flex items-center gap-2">
                        <Icon
                            name="mingcute:user-4-line"
                            class="w-6 h-6 text-gray-500"
                        />
                        <span class="text-sm font-medium text-gray-700">
                            By Admin
                        </span>
                    </div>
                    <div class="flex items-center gap-3 text-sm text-gray-500">
                        <span class="flex items-center gap-1">
                            <Icon name="pajamas:eye" class="w-4 h-4" />
                            <span v-if="article?.views > 1"
                                >{{ formatNumber(article?.views) }} views</span
                            >
                            <span v-else-if="article?.views <= 1"
                                >{{ formatNumber(article?.views) }} view</span
                            >
                        </span>
                    </div>
                </div>
            </div>

            <!-- Overlay -->
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"
                aria-hidden="true"
            ></div>
        </article>
    </div>
</template>

<script setup lang="ts">
import type { NewsModel } from "~/models/news";

interface Props {
    news: NewsModel[];
}

const props = defineProps<Props>();

const readArticle = (article: NewsModel) => {
    navigateTo(`/news/${article.id}`);
};
</script>
