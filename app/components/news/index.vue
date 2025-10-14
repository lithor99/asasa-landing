<script setup lang="ts">
interface Author {
    name: string;
    avatar: string;
}

interface Article {
    id: number | string;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    date: string;
    readTime: number;
    author: Author;
    views: string | number;
}

interface Props {
    articles: Article[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
    readArticle: [article: Article];
}>();

const readArticle = (article: Article) => {
    emit("readArticle", article);
};
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <article
            v-for="article in articles"
            :key="article.id"
            class="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
            @click="readArticle(article)"
        >
            <!-- Article Image -->
            <div class="relative h-56 overflow-hidden">
                <img
                    :src="article.image"
                    :alt="article.title"
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
                        {{ article.date }}
                    </span>
                    <span>•</span>
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
                    </span>
                </div>

                <h3
                    class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 transition-colors"
                >
                    {{ article.title }}
                </h3>

                <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                    {{ article.excerpt }}
                </p>

                <!-- Author & Stats -->
                <div
                    class="flex items-center justify-between pt-4 border-t border-gray-100"
                >
                    <div class="flex items-center gap-2">
                        <img
                            :src="article.author.avatar"
                            :alt="article.author.name"
                            class="w-8 h-8 rounded-full"
                        />
                        <span class="text-sm font-medium text-gray-700">
                            {{ article.author.name }}
                        </span>
                    </div>
                    <div class="flex items-center gap-3 text-sm text-gray-500">
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
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                            </svg>
                            {{ article.views }}
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
