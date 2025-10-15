<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Hero Section -->
        <div class="relative h-96 bg-gradient-to-r from-gray-900 to-gray-700">
            <div class="absolute inset-0">
                <img
                    src="https://www.baltana.com/files/wallpapers-27/Laos-Tourism-HD-Background-Wallpaper-86452.jpg"
                    alt="Tourist Places"
                    class="w-full h-full object-cover opacity-30"
                />
            </div>
            <div
                class="relative h-full flex items-center justify-center text-center px-4"
            >
                <div>
                    <h1 class="text-5xl md:text-6xl font-bold text-white mb-4">
                        Discover Amazing Places
                    </h1>
                    <p class="text-xl text-gray-200 max-w-2xl mx-auto">
                        Explore breathtaking destinations across Laos - from
                        ancient temples to stunning natural wonders
                    </p>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12">
            <!-- Region Tabs -->
            <div class="mb-8">
                <div class="border-b border-gray-200">
                    <nav class="flex justify-center gap-8">
                        <button
                            @click="onRegionSelect('')"
                            :class="[
                                'py-2 px-6 text-lg font-medium border-b-2 transition-colors',
                                selectedRegion === ''
                                    ? 'border-gray-800 text-gray-800'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                            ]"
                        >
                            All Places
                        </button>
                        <button
                            @click="onRegionSelect(E_REGION.NORTHERN)"
                            :class="[
                                'py-2 px-6 text-lg font-medium border-b-2 transition-colors',
                                selectedRegion === E_REGION.NORTHERN
                                    ? 'border-gray-800 text-gray-800'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                            ]"
                        >
                            Northern Laos
                        </button>
                        <button
                            @click="onRegionSelect(E_REGION.CENTER)"
                            :class="[
                                'py-2 px-6 text-lg font-medium border-b-2 transition-colors',
                                selectedRegion === E_REGION.CENTER
                                    ? 'border-gray-800 text-gray-800'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                            ]"
                        >
                            Central Laos
                        </button>
                        <button
                            @click="onRegionSelect(E_REGION.SOUTH)"
                            :class="[
                                'py-2 px-6 text-lg font-medium border-b-2 transition-colors',
                                selectedRegion === E_REGION.SOUTH
                                    ? 'border-gray-800 text-gray-800'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                            ]"
                        >
                            Southern Laos
                        </button>
                    </nav>
                </div>
            </div>

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
                    {{ tourPlaceStore?.pagination?.count }} items
                </h2>
            </div>

            <!-- Tour Places -->
            <div>
                <div v-if="tourPlaceLoading">
                    <LoadingCard :item="tourPlaceItemsPerPage" />
                </div>
                <div
                    v-if="
                        !tourPlaceLoading &&
                        tourPlaceStore?.pagination?.count < 1
                    "
                >
                    <EmptyCard @refresh="handleRefresh" />
                </div>
                <div
                    v-if="
                        !tourPlaceLoading &&
                        tourPlaceStore?.pagination?.count > 0
                    "
                >
                    <TourPlace
                        :places="tourPlaceStore?.pagination?.rows"
                        :region="selectedRegion"
                    />
                </div>
            </div>

            <!-- Places Pagination -->

            <Pagination
                class="my-8"
                v-model:currentPage="tourPlaceCurrentPage"
                :totalPages="tourPlaceTotalPages"
                @pageChange="handleTourPlacePageChange"
            />
        </main>
    </div>
</template>

<script setup lang="ts">
const { setQueryServerSide, isQueryServerSide } = useMainStore();
const route = useRoute();

const tourPlaceStore = useTourPlaceStore();

const tourPlaceLoading = ref(false);
const tourPlaceCurrentPage = ref(1);
const tourPlaceItemsPerPage = ref(3);

const selectedRegion = ref("");
const search = ref("");

// Detect screen size and set items per page
const updateItemsPerPage = () => {
    const width = window.innerWidth;

    if (width < 806) {
        tourPlaceItemsPerPage.value = 1;
    } else if (width >= 806 && width < 1024) {
        tourPlaceItemsPerPage.value = 4;
    } else {
        tourPlaceItemsPerPage.value = 6;
    }

    tourPlaceFilters.value.limit = tourPlaceItemsPerPage.value;
};

const tourPlaceFilters: any = ref({
    page: tourPlaceCurrentPage.value,
    limit: tourPlaceItemsPerPage.value,
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

    // Initialize selectedRegion from query params
    selectedRegion.value = (route.query.region as string) || "";

    if (!isQueryServerSide) {
        tourPlaceLoading.value = true;
        const filters = {
            ...tourPlaceFilters.value,
            ...(selectedRegion.value && { region: selectedRegion.value }),
        };
        await tourPlaceStore.setPagination(filters);
        tourPlaceLoading.value = false;
    }
    await setQueryServerSide(false);
});

// Cleanup resize listener
onUnmounted(() => {
    window.removeEventListener("resize", updateItemsPerPage);
});

if (import.meta.server) {
    // Initialize selectedRegion from query params on server
    selectedRegion.value = (route.query.region as string) || "";

    tourPlaceLoading.value = true;
    const filters = {
        ...tourPlaceFilters.value,
        ...(selectedRegion.value && { region: selectedRegion.value }),
    };
    tourPlaceStore.setPagination(filters);
    tourPlaceLoading.value = false;
}

/*
 * Computed properties for pagination
 */
const tourPlaceTotalPages = computed(() => {
    return Math.ceil(
        tourPlaceStore.pagination.count / tourPlaceItemsPerPage.value,
    );
});

/*
 * Pagination handlers
 */
const handleTourPlacePageChange = async (page: number) => {
    tourPlaceLoading.value = true;
    tourPlaceCurrentPage.value = page;
    tourPlaceFilters.value.page = page;
    const filters = {
        ...tourPlaceFilters.value,
        ...(selectedRegion.value && { region: selectedRegion.value }),
    };
    await tourPlaceStore.setPagination(filters);
    tourPlaceLoading.value = false;
};

/*
 * Search handlers
 */

const handleSearch = async () => {
    if (!search.value.trim()) return;

    tourPlaceLoading.value = true;
    tourPlaceCurrentPage.value = 1;
    tourPlaceFilters.value.page = 1;
    tourPlaceFilters.value.search = search.value;

    const filters = {
        ...tourPlaceFilters.value,
        ...(selectedRegion.value && { region: selectedRegion.value }),
        ...(search.value && { search: search.value }),
    };

    await tourPlaceStore.setPagination(filters);
    tourPlaceLoading.value = false;
};

/*
 * Refresh handlers
 */
const handleRefresh = async () => {
    tourPlaceLoading.value = true;
    tourPlaceCurrentPage.value = 1;
    tourPlaceFilters.value.page = 1;
    search.value = "";
    tourPlaceFilters.value.search = "";
    const filters = {
        ...tourPlaceFilters.value,
        ...(selectedRegion.value && { region: selectedRegion.value }),
    };
    await tourPlaceStore.setPagination(filters);
    tourPlaceLoading.value = false;
};

const onRegionSelect = async (region: string) => {
    tourPlaceLoading.value = true;
    selectedRegion.value = region;
    tourPlaceCurrentPage.value = 1;
    tourPlaceFilters.value.page = 1;

    // Update URL query params
    await navigateTo({
        query: {
            ...(region && { region }),
        },
    });

    const filters = {
        ...tourPlaceFilters.value,
        ...(selectedRegion.value && { region: selectedRegion.value }),
    };

    await tourPlaceStore.setPagination(filters);
    tourPlaceLoading.value = false;
};

/*
 * Watch for region changes in query params (after initial mount)
 */
watch(
    () => route.query.region,
    async (newRegion, oldRegion) => {
        // Skip if it's the initial load (handled by onMounted)
        if (oldRegion === undefined) return;

        // Only update if the region actually changed
        if (newRegion !== selectedRegion.value) {
            await onRegionSelect((newRegion as string) || "");
        }
    },
);
</script>
