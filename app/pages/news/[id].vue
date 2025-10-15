<template>
    <div class="min-h-screen bg-gray-50 pt-4 pb-12">
        <!-- Breadcrumb -->
        <Breadcrumb :items="breadcrumbItems" />
        <!-- Hero Section with Image -->
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="relative group">
                <img
                    :src="`${CDN()}${newsStore?.news?.image}`"
                    :alt="newsStore?.news?.name?.lo"
                    class="w-full object-cover rounded-lg shadow-md"
                    :style="{ height: '70vh' }"
                />

                <!-- Overlay - no container classes -->
                <div
                    class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-lg"
                >
                    <!-- Content with container classes if needed -->
                    <!-- <div class="h-full flex items-end mx-6 py-4">
                        <h1 class="text-white text-4xl font-bold">
                            {{ newsStore?.news?.name?.lo }}
                        </h1>
                    </div> -->
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div class="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
                <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {{ newsStore?.news?.name?.lo }}
                </h1>
                <div class="flex items-center gap-4 text-md text-gray-500 mb-6">
                    <div class="flex items-center gap-2 mx-2">
                        <Icon name="mdi:calendar" class="w-5 h-5" />
                        <span>{{
                            formatDate(newsStore?.news?.createdAt)
                        }}</span>
                    </div>
                    <div class="flex items-center gap-2 mx-2">
                        <span class="flex items-center gap-1">
                            <svg
                                class="h-5 w-5"
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
                            {{ countDays(newsStore?.news?.createdAt) }}
                        </span>
                    </div>
                    <div class="flex items-center gap-2 mx-2">
                        <Icon name="mdi:account-circle" class="w-5 h-5" />
                        <span>By Admin</span>
                    </div>
                    <div class="flex items-center gap-2 mx-2">
                        <Icon name="pajamas:eye" class="w-5 h-5" />
                        <span
                            >{{ newsStore?.news?.views }}
                            <span v-if="newsStore?.news?.views > 1">
                                views</span
                            >
                            <span v-else> view</span>
                        </span>
                    </div>
                </div>

                <p class="text-gray-700 text-lg leading-relaxed">
                    {{ newsStore?.news?.detail?.lo }}
                </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Left Column -->
                <div class="lg:col-span-2 space-y-8">
                    <!-- Image Gallery -->
                    <div
                        v-if="
                            newsStore?.news?.images &&
                            newsStore?.news?.images.length > 0
                        "
                        class="bg-white rounded-xl shadow-md p-6 md:p-8"
                    >
                        <h2
                            class="text-2xl md:text-3xl font-bold text-gray-900 mb-6"
                        >
                            Photo Gallery
                        </h2>

                        <!-- Masonry Grid Layout -->
                        <div
                            class="grid grid-cols-12 gap-2 transition-all duration-300"
                            :class="
                                showAllImages
                                    ? 'h-auto'
                                    : 'max-h-[500px] overflow-hidden'
                            "
                        >
                            <div
                                v-for="(image, index) in newsStore?.news
                                    ?.images"
                                :key="index"
                                v-show="showAllImages || index < 6"
                                :class="getImageClass(index)"
                                class="rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                                @click="openGallery(index)"
                            >
                                <img
                                    :src="`${CDN()}${image}`"
                                    :alt="`Photo ${index + 1}`"
                                    class="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <!-- Show More Button -->
                        <div
                            v-if="newsStore?.news?.images.length > 6"
                            class="mt-6 flex justify-center"
                        >
                            <div
                                @click="showAllImages = !showAllImages"
                                class="w-auto px-6 py-3 underline hover:text-gray-800 hover:cursor-pointer hover:scale-110 text-gray-600 font-medium rounded-lg transition-colors"
                            >
                                {{ showAllImages ? "Show Less" : `Show All` }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Sidebar -->
                <div class="lg:col-span-1">
                    <div class="sticky top-6 space-y-6">
                        <!-- Related News -->
                        <div class="bg-white rounded-xl shadow-md p-6">
                            <h3
                                class="text-xl font-bold text-gray-900 mb-4 pb-4 border-b"
                            >
                                Related News
                            </h3>
                            <div class="space-y-4">
                                <a
                                    v-for="(news, index) in relatedNews"
                                    :key="index"
                                    href="#"
                                    class="block group"
                                >
                                    <div
                                        @click.prevent="readRelateNews(news.id)"
                                        class="flex gap-3"
                                    >
                                        <img
                                            :src="`${CDN()}${news?.image}`"
                                            :alt="news?.name?.lo"
                                            class="w-20 h-20 object-cover rounded-lg"
                                        />
                                        <div class="flex-1">
                                            <h4
                                                class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm"
                                            >
                                                {{ news?.name?.lo }}
                                            </h4>
                                            <div
                                                class="flex items-center text-xs text-gray-500 mt-1"
                                            >
                                                <Icon
                                                    name="mdi:calendar"
                                                    class="w-3 h-3 text-gray-400 mr-1"
                                                />
                                                {{
                                                    formatDate(news?.createdAt)
                                                }}
                                            </div>
                                            <div
                                                class="flex items-center text-xs text-gray-500 mt-1"
                                            >
                                                <Icon
                                                    name="pajamas:eye"
                                                    class="w-3 h-3 text-gray-400 mr-1"
                                                />
                                                <span class="mr-1">
                                                    {{
                                                        formatNumber(
                                                            news?.views,
                                                        )
                                                    }}</span
                                                >
                                                <span v-if="news?.views > 1">
                                                    views</span
                                                >
                                                <span v-else> view</span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Image Gallery Dialog/Lightbox -->
        <Teleport to="body">
            <Transition
                enter-active-class="transition-opacity duration-300"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-300"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div
                    v-if="isGalleryOpen"
                    class="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
                    @click="closeGallery"
                >
                    <!-- Close Button -->
                    <button
                        @click.stop="closeGallery"
                        class="absolute top-4 right-4 z-50 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Close gallery"
                    >
                        <svg
                            class="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <!-- Image Counter -->
                    <div
                        class="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-black/50 text-white rounded-full text-sm"
                    >
                        {{ currentImageIndex + 1 }} /
                        {{ newsStore?.news?.images?.length || 0 }}
                    </div>

                    <!-- Main Image Container -->
                    <div
                        class="relative w-full h-full flex items-center justify-center p-4 md:p-8"
                        @click.stop
                    >
                        <!-- Previous Button -->
                        <button
                            v-if="
                                newsStore?.news?.images &&
                                newsStore?.news?.images.length > 1
                            "
                            @click.stop="previousImage"
                            class="absolute left-4 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                            aria-label="Previous image"
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
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>

                        <!-- Image -->
                        <img
                            :src="`${CDN()}${
                                newsStore?.news?.images[currentImageIndex]
                            }`"
                            :alt="`Photo ${currentImageIndex + 1}`"
                            class="max-w-full max-h-full object-contain"
                        />

                        <!-- Next Button -->
                        <button
                            v-if="
                                newsStore?.news?.images &&
                                newsStore?.news?.images.length > 1
                            "
                            @click.stop="nextImage"
                            class="absolute right-4 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                            aria-label="Next image"
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
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>

                    <!-- Thumbnail Strip (Optional) -->
                    <div
                        class="absolute bottom-4 left-0 right-0 z-50 px-4"
                        @click.stop
                    >
                        <div
                            class="flex gap-2 overflow-x-auto pb-2 justify-center scrollbar-hide"
                        >
                            <button
                                v-for="(image, index) in newsStore?.news
                                    ?.images"
                                :key="index"
                                @click.stop="currentImageIndex = index"
                                class="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all"
                                :class="
                                    currentImageIndex === index
                                        ? 'border-white scale-110'
                                        : 'border-transparent opacity-50 hover:opacity-100'
                                "
                            >
                                <img
                                    :src="`${CDN()}${image}`"
                                    :alt="`Thumbnail ${index + 1}`"
                                    class="w-full h-full object-cover"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "detail",
});
const { setQueryServerSide, isQueryServerSide } = useMainStore();
const newsStore = useNewsStore();
const route = useRoute();
// const { id } = route.params;

const newsLoading = ref(false);
const showAllImages = ref(false);

// Gallery state
const isGalleryOpen = ref(false);
const currentImageIndex = ref(0);

/**
 *  onMounted
 */
onMounted(async () => {
    if (!isQueryServerSide) {
        const { id } = route.params;
        newsLoading.value = true;
        await newsStore.setOne(id as string);

        await newsStore.setPagination({
            page: "1",
            limit: "3",
            sortBy: "createdAt",
            order: "DESC",
        });
        newsLoading.value = false;
    }
    await setQueryServerSide(false);
});

if (import.meta.server) {
    newsLoading.value = true;
    const { id } = route.params;
    await newsStore.setOne(id as string);
    await newsStore.setPagination({
        page: "1",
        limit: "3",
        sortBy: "createdAt",
        order: "DESC",
    });
    newsLoading.value = false;
}

// Breadcrumb items
const breadcrumbItems = computed(() => {
    const items = [
        { label: "Home", to: "/" },
        { label: "News", to: "/news" },
        { label: "News Detail", to: `/news` },
    ];

    return items;
});

// Filter related news to exclude current news
const relatedNews = computed(() => {
    const currentId = route.params.id;
    const allNews = newsStore?.pagination?.rows || [];

    // Filter out the current news item
    return allNews.filter((news: any) => String(news.id) !== currentId);
});

// Watch for route changes to reload data
watch(
    () => route.params.id,
    async (newId, oldId) => {
        // Only reload if ID actually changed and it's not the initial load
        if (newId && oldId && newId !== oldId) {
            // Close gallery if open
            if (isGalleryOpen.value) {
                closeGallery();
            }

            // Scroll to top
            window.scrollTo({ top: 0, behavior: "smooth" });

            // Load new news data
            await loadNewsData(newId as string);
        }
    },
);

// Function to load news data
const loadNewsData = async (newsId: string) => {
    newsLoading.value = true;
    await newsStore.setOne(newsId);
    await newsStore.setPagination({
        page: "1",
        limit: "3",
        sortBy: "createdAt",
        order: "DESC",
    });
    newsLoading.value = false;
};

const readRelateNews = async (id: string) => {
    window.location.href = `/news/${id}`;
};

// Gallery functions
const openGallery = (index: number) => {
    currentImageIndex.value = index;
    isGalleryOpen.value = true;
    // Prevent body scroll when gallery is open
    document.body.style.overflow = "hidden";
};

const closeGallery = () => {
    isGalleryOpen.value = false;
    // Restore body scroll
    document.body.style.overflow = "";
};

const nextImage = () => {
    const images = newsStore?.news?.images || [];
    if (images.length > 0) {
        currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
    }
};

const previousImage = () => {
    const images = newsStore?.news?.images || [];
    if (images.length > 0) {
        currentImageIndex.value =
            currentImageIndex.value === 0
                ? images.length - 1
                : currentImageIndex.value - 1;
    }
};

// Keyboard navigation
const handleKeyPress = (e: KeyboardEvent) => {
    if (!isGalleryOpen.value) return;

    if (e.key === "Escape") closeGallery();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") previousImage();
};

// Add keyboard event listener
onMounted(() => {
    window.addEventListener("keydown", handleKeyPress);
});

onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyPress);
    // Cleanup body overflow in case component unmounts while gallery is open
    document.body.style.overflow = "";
});

// Get dynamic image classes
const getImageClass = (index: number): string => {
    const pattern = index % 8;

    switch (pattern) {
        case 0:
            return "col-span-12 md:col-span-6 h-40 md:h-48";
        case 1:
            return "col-span-12 md:col-span-6 h-40 md:h-48";
        case 2:
            return "col-span-6 md:col-span-3 h-32 md:h-40";
        case 3:
            return "col-span-6 md:col-span-3 h-32 md:h-40";
        case 4:
            return "col-span-6 md:col-span-3 h-32 md:h-40";
        case 5:
            return "col-span-6 md:col-span-3 h-32 md:h-40";
        case 6:
            return "col-span-12 md:col-span-8 h-40 md:h-48";
        case 7:
            return "col-span-12 md:col-span-4 h-40 md:h-48";
        default:
            return "col-span-6 md:col-span-4 h-32 md:h-40";
    }
};

// You can fetch data from API like this:
// const route = useRoute();
// const { data: news } = await useFetch(`/api/news/${route.params.id}`);
</script>

<style scoped>
/* Prose styling for content */
:deep(.prose) {
    color: #374151;
    line-height: 1.8;
}

:deep(.prose h3) {
    color: #1f2937;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 1rem;
}

:deep(.prose p) {
    margin-bottom: 1rem;
}
</style>
