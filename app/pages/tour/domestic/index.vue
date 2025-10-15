<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Hero Section -->
        <div class="relative h-96 bg-gradient-to-r from-gray-900 to-gray-700">
            <div class="absolute inset-0">
                <img
                    src="https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg"
                    alt="Domestic Tours"
                    class="w-full h-full object-cover opacity-40"
                />
            </div>
            <div
                class="relative h-full flex items-center justify-center text-center px-4"
            >
                <div>
                    <h1 class="text-5xl md:text-6xl font-bold text-white mb-4">
                        Domestic Tours
                    </h1>
                    <p class="text-xl text-gray-200 max-w-2xl mx-auto">
                        Explore the beauty and culture of Laos with our
                        carefully curated domestic tour packages
                    </p>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
            <!-- Filter & Search Section -->
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
                                    @click="handRefresh"
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

            <!-- Tours Grid -->
            <div class="mb-6">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">
                        Available Tours ({{
                            tourPackageStore?.pagination?.count || 0
                        }})
                    </h2>
                </div>
            </div>

            <div>
                <div v-if="tourPackageLoading">
                    <LoadingCard :item="tourPackageItemsPerPage" />
                </div>
                <div
                    v-if="
                        !tourPackageLoading &&
                        tourPackageStore?.pagination?.count < 1
                    "
                >
                    <EmptyCard @refresh="handRefresh" />
                </div>
                <div
                    v-if="
                        !tourPackageLoading &&
                        tourPackageStore?.pagination?.count > 0
                    "
                >
                    <TourPackage :tours="tourPackageStore?.pagination?.rows" />
                </div>
            </div>
            <!-- Tour Pagination -->

            <Pagination
                class="my-8"
                v-model:currentPage="tourPackageCurrentPage"
                :totalPages="tourPackageTotalPages"
                @pageChange="handleTourPageChange"
            />

            <!-- Why Choose Our Domestic Tours -->
            <div class="mt-16 bg-white rounded-lg shadow-md p-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">
                    Why Choose Our Domestic Tours?
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="text-center">
                        <div
                            class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4"
                        >
                            <svg
                                class="h-8 w-8 text-gray-900"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 class="text-md font-semibold text-gray-900 mb-2">
                            Expert Local Guides
                        </h3>
                        <p class="text-gray-600 text-sm">
                            Our experienced guides know every corner of Laos and
                            share authentic local insights
                        </p>
                    </div>
                    <div class="text-center">
                        <div
                            class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4"
                        >
                            <svg
                                class="h-8 w-8 text-gray-900"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 class="text-md font-semibold text-gray-900 mb-2">
                            Best Price Guarantee
                        </h3>
                        <p class="text-gray-600 text-sm">
                            We offer competitive prices and ensure you get the
                            best value for your money
                        </p>
                    </div>
                    <div class="text-center">
                        <div
                            class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4"
                        >
                            <svg
                                class="h-8 w-8 text-gray-900"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                        </div>
                        <h3 class="text-md font-semibold text-gray-900 mb-2">
                            Flexible Booking
                        </h3>
                        <p class="text-gray-600 text-sm">
                            Easy booking process with flexible cancellation
                            policies for your peace of mind
                        </p>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
const { setQueryServerSide, isQueryServerSide } = useMainStore();
const tourPackageStore = useTourPackageStore();

const showDialog = ref(false);
const previewUrl = ref(null);

const tourPackageLoading = ref(false);
const tourPackageCurrentPage = ref(1);
const tourPackageItemsPerPage = ref(3);

const search = ref("");

const tourPackageFilters: any = ref({
    page: tourPackageCurrentPage.value,
    limit: tourPackageItemsPerPage.value,
    sortBy: "createdAt",
    order: "DESC",
});

// Detect screen size and set items per page
const updateItemsPerPage = () => {
    const width = window.innerWidth;

    if (width < 806) {
        // sm - Mobile (Tailwind sm breakpoint)
        tourPackageItemsPerPage.value = 2;
    } else if (width >= 806 && width < 1024) {
        // md - Tablet (Tailwind md breakpoint)
        tourPackageItemsPerPage.value = 4;
    } else {
        // lg and above - Desktop
        tourPackageItemsPerPage.value = 6;
    }

    // Update filters with new items per page
    tourPackageFilters.value.limit = tourPackageItemsPerPage.value;
};

/**
 *  onMounted
 */
onMounted(async () => {
    // Set items per page based on screen size
    updateItemsPerPage();

    // Add resize listener
    window.addEventListener("resize", updateItemsPerPage);

    if (!isQueryServerSide) {
        tourPackageLoading.value = true;
        await tourPackageStore.setPagination(tourPackageFilters.value);
        tourPackageLoading.value = false;
    }
    await setQueryServerSide(false);
});

// Cleanup resize listener
onUnmounted(() => {
    window.removeEventListener("resize", updateItemsPerPage);
});

if (import.meta.server) {
    tourPackageLoading.value = true;

    tourPackageStore.setPagination(tourPackageFilters.value);

    tourPackageLoading.value = false;
}

/*
 * Computed properties for pagination
 */

const tourPackageTotalPages = computed(() => {
    return Math.ceil(
        tourPackageStore.pagination.count / tourPackageItemsPerPage.value,
    );
});

/*
 * Pagination handlers
 */

const handleTourPageChange = async (page: number) => {
    tourPackageLoading.value = true;
    tourPackageCurrentPage.value = page;
    tourPackageFilters.value.page = page;
    setTimeout(async () => {
        await tourPackageStore.setPagination(tourPackageFilters.value);
        tourPackageLoading.value = false;
    }, 5000);
};

/*
 * Search handlers
 */
const handleSearch = async () => {
    if (!search.value.trim()) return;

    tourPackageLoading.value = true;
    tourPackageCurrentPage.value = 1;
    tourPackageFilters.value.page = 1;
    tourPackageFilters.value.search = search.value.trim();
    await tourPackageStore.setPagination(tourPackageFilters.value);
    tourPackageLoading.value = false;
};

/*
 * Refresh handlers
 */

// Tour package refresh handler
const handRefresh = async () => {
    tourPackageLoading.value = true;
    tourPackageCurrentPage.value = 1;
    tourPackageFilters.value.page = 1;
    search.value = "";
    tourPackageFilters.value.search = "";
    await tourPackageStore.setPagination(tourPackageFilters.value);
    tourPackageLoading.value = false;
};
</script>
