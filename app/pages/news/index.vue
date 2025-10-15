<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Hero Section -->
        <div class="relative h-80 bg-gradient-to-r from-gray-900 to-gray-700">
            <div class="absolute inset-0">
                <img
                    src="https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg"
                    alt="News & Updates"
                    class="w-full h-full object-cover opacity-30"
                />
            </div>
            <div
                class="relative h-full flex items-center justify-center text-center px-4"
            >
                <div>
                    <h1 class="text-5xl md:text-6xl font-bold text-white mb-4">
                        Travel News & Updates
                    </h1>
                    <p class="text-xl text-gray-200 max-w-2xl mx-auto">
                        Stay informed with the latest tourism news, travel tips,
                        and destination updates
                    </p>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
            <!-- Filter Section -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                <div class="md:col-span-2">
                    <div class="relative">
                        <input
                            v-model="search"
                            @keyup.enter="handleSearch"
                            type="text"
                            placeholder="Search places..."
                            class="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 pr-24 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                        />

                        <!-- Search Icon (Left) -->
                        <svg
                            class="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>

                        <!-- Right Side Buttons -->
                        <div
                            class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1"
                        >
                            <!-- Clear Button -->
                            <Transition
                                enter-active-class="transition-opacity duration-200"
                                leave-active-class="transition-opacity duration-200"
                                enter-from-class="opacity-0"
                                leave-to-class="opacity-0"
                            >
                                <button
                                    v-if="search"
                                    @click="handleRefresh"
                                    type="button"
                                    class="p-1 mr-1 hover:bg-gray-200 rounded-full transition-colors"
                                    title="Clear"
                                >
                                    <svg
                                        class="h-4 w-4 text-gray-400 hover:text-gray-600"
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
                            </Transition>

                            <!-- Search Button -->
                            <button
                                @click="handleSearch"
                                type="button"
                                class="px-3 py-1 bg-gray-700 hover:bg-gray-800 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                :disabled="!search.trim()"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Results Count -->
            <div class="mb-6">
                <h2 class="text-2xl font-bold text-gray-900">
                    {{ newsStore?.pagination?.count }} items
                </h2>
            </div>

            <!-- News Grid -->

            <div>
                <div v-if="newsLoading">
                    <LoadingCard :item="newsItemsPerPage" />
                </div>
                <div v-if="!newsLoading && newsStore?.pagination?.count < 1">
                    <EmptyCard @refresh="handleRefresh" />
                </div>
                <div v-if="!newsLoading && newsStore?.pagination?.count > 0">
                    <News :news="newsStore?.pagination?.rows" />
                </div>
            </div>

            <!-- Pagination -->
            <Pagination
                class="my-8"
                v-model:currentPage="newsCurrentPage"
                :totalPages="newsTotalPages"
                @pageChange="handleNewsPageChange"
            />
        </main>
    </div>
</template>

<script setup lang="ts">
const { setQueryServerSide, isQueryServerSide } = useMainStore();
const newsStore = useNewsStore();

const newsLoading = ref(false);
const newsCurrentPage = ref(1);
const newsItemsPerPage = ref(3);

const search = ref("");

// Detect screen size and set items per page
const updateItemsPerPage = () => {
    const width = window.innerWidth;

    if (width < 806) {
        // sm - Mobile (Tailwind sm breakpoint)
        newsItemsPerPage.value = 1;
    } else if (width >= 806 && width < 1024) {
        // md - Tablet (Tailwind md breakpoint)
        newsItemsPerPage.value = 4;
    } else {
        // lg and above - Desktop
        newsItemsPerPage.value = 6;
    }

    // Update filters with new items per page
    newsFilters.value.limit = newsItemsPerPage.value;
};

const newsFilters: any = ref({
    page: newsCurrentPage.value,
    limit: newsItemsPerPage.value,
    sortBy: "createdAt",
    order: "DESC",
});

/**
 *  onMounted
 */
onMounted(async () => {
    // Set items per page based on screen size
    updateItemsPerPage();

    // Add resize listener
    window.addEventListener("resize", updateItemsPerPage);

    if (!isQueryServerSide) {
        newsLoading.value = true;
        await newsStore.setPagination(newsFilters.value);
        newsLoading.value = false;
    }
    await setQueryServerSide(false);
});

// Cleanup resize listener
onUnmounted(() => {
    window.removeEventListener("resize", updateItemsPerPage);
});

if (import.meta.server) {
    newsLoading.value = true;
    newsStore.setPagination(newsFilters.value);
    newsLoading.value = false;
}

/*
 * Computed properties for pagination
 */

const newsTotalPages = computed(() => {
    return Math.ceil(newsStore.pagination.count / newsItemsPerPage.value);
});

/*
 * Pagination handlers
 */
const handleNewsPageChange = async (page: number) => {
    newsLoading.value = true;
    newsCurrentPage.value = page;
    newsFilters.value.page = page;
    await newsStore.setPagination(newsFilters.value);
    newsLoading.value = false;
};

/*
 * Search handlers
 */
const handleSearch = async () => {
    if (!search.value.trim()) return;
    newsLoading.value = true;
    newsCurrentPage.value = 1;
    newsFilters.value.page = 1;
    newsFilters.value.search = search.value.trim();
    await newsStore.setPagination(newsFilters.value);
    newsLoading.value = false;
};

/*
 * Refresh handlers
 */
const handleRefresh = async () => {
    newsLoading.value = true;
    newsCurrentPage.value = 1;
    newsFilters.value.page = 1;
    search.value = "";
    newsFilters.value.search = "";
    await newsStore.setPagination(newsFilters.value);
    newsLoading.value = false;
};
</script>
