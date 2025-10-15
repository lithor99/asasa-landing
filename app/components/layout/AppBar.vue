<template>
    <nav class="border-b border-gray-200 bg-white">
        <div class="mx-auto px-4 sm:px-8 lg:px-12">
            <div class="flex h-16 items-center justify-between">
                <!-- Left side -->
                <div class="flex items-center gap-8">
                    <NuxtLink to="/">
                        <NuxtImg
                            src="/logo.png"
                            alt="ASASA"
                            class="w-auto h-8 object-cover"
                        />
                    </NuxtLink>

                    <div class="hidden md:flex items-center gap-6">
                        <NuxtLink
                            to="/"
                            class="text-sm font-medium text-gray-700 hover:text-gray-900 pb-1 border-b-2 transition-colors"
                            :class="
                                route.path === '/'
                                    ? 'border-gray-900 text-gray-900'
                                    : 'border-transparent'
                            "
                        >
                            Home
                        </NuxtLink>

                        <NuxtLink
                            to="/tour/domestic"
                            class="text-sm font-medium text-gray-700 hover:text-gray-900 pb-1 border-b-2 transition-colors"
                            :class="
                                route.path.startsWith('/tour/domestic')
                                    ? 'border-gray-900 text-gray-900'
                                    : 'border-transparent'
                            "
                        >
                            Domestic Tour
                        </NuxtLink>

                        <NuxtLink
                            to="/tour/international"
                            class="text-sm font-medium text-gray-700 hover:text-gray-900 pb-1 border-b-2 transition-colors"
                            :class="
                                route.path.startsWith('/tour/international')
                                    ? 'border-gray-900 text-gray-900'
                                    : 'border-transparent'
                            "
                        >
                            International Tour
                        </NuxtLink>

                        <NuxtLink
                            to="/hotel"
                            class="text-sm font-medium text-gray-700 hover:text-gray-900 pb-1 border-b-2 transition-colors"
                            :class="
                                route.path.startsWith('/hotel')
                                    ? 'border-gray-900 text-gray-900'
                                    : 'border-transparent'
                            "
                        >
                            Hotel Booking
                        </NuxtLink>

                        <NuxtLink
                            to="/bus"
                            class="text-sm font-medium text-gray-700 hover:text-gray-900 pb-1 border-b-2 transition-colors"
                            :class="
                                route.path.startsWith('/bus')
                                    ? 'border-gray-900 text-gray-900'
                                    : 'border-transparent'
                            "
                        >
                            Bus Booking
                        </NuxtLink>

                        <div class="relative">
                            <button
                                @click="toggleDropdown"
                                class="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 pb-1 border-b-2 transition-colors"
                                :class="
                                    route.path.startsWith('/tour-place')
                                        ? 'border-gray-900 text-gray-900'
                                        : 'border-transparent'
                                "
                            >
                                Tourist Places
                                <svg
                                    class="h-4 w-4 transition-transform"
                                    :class="{ 'rotate-180': isDropdownOpen }"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            <!-- Dropdown Menu -->
                            <div
                                v-if="isDropdownOpen"
                                class="absolute top-full left-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-200 py-2 z-50"
                            >
                                <NuxtLink
                                    :to="{
                                        path: '/tour-place',
                                        query: { region: E_REGION.NORTHERN },
                                    }"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    :class="
                                        route.query.region === E_REGION.NORTHERN
                                            ? 'bg-gray-100 font-semibold'
                                            : ''
                                    "
                                    @click="closeDropdown"
                                >
                                    Northern
                                </NuxtLink>

                                <NuxtLink
                                    :to="{
                                        path: '/tour-place',
                                        query: { region: E_REGION.CENTER },
                                    }"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    :class="
                                        route.query.region === E_REGION.CENTER
                                            ? 'bg-gray-100 font-semibold'
                                            : ''
                                    "
                                    @click="closeDropdown"
                                >
                                    Central
                                </NuxtLink>

                                <NuxtLink
                                    :to="{
                                        path: '/tour-place',
                                        query: { region: E_REGION.SOUTH },
                                    }"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    :class="
                                        route.query.region === E_REGION.SOUTH
                                            ? 'bg-gray-100 font-semibold'
                                            : ''
                                    "
                                    @click="closeDropdown"
                                >
                                    Southern
                                </NuxtLink>
                            </div>
                        </div>

                        <NuxtLink
                            to="/news"
                            class="text-sm font-medium text-gray-700 hover:text-gray-900 pb-1 border-b-2 transition-colors"
                            :class="
                                route.path.startsWith('/news')
                                    ? 'border-gray-900 text-gray-900'
                                    : 'border-transparent'
                            "
                        >
                            News
                        </NuxtLink>
                    </div>
                </div>

                <!-- Search -->
                <div class="hidden md:flex flex-1 max-w-md mx-8">
                    <div class="relative w-full">
                        <input
                            type="text"
                            placeholder="Search"
                            @click="openSearchDialog"
                            readonly
                            class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-sm focus:border-gray-400 focus:outline-none focus:ring-0 cursor-pointer hover:bg-gray-100 transition-colors"
                        />
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
                    </div>
                </div>

                <!-- Language Selector -->
                <div class="relative">
                    <div
                        @click="toggleLanguageDropdown"
                        class="hover:cursor-pointer"
                    >
                        <Icon
                            :name="
                                currentLanguage === 'en'
                                    ? 'emojione:flag-for-united-kingdom'
                                    : 'emojione:flag-for-laos'
                            "
                            class="w-8 h-8"
                        />
                    </div>

                    <!-- Language Dropdown -->
                    <div
                        v-if="isLanguageDropdownOpen"
                        class="absolute top-full right-0 mt-2 w-40 rounded-lg bg-white shadow-lg border border-gray-200 py-2 z-50"
                    >
                        <button
                            @click="changeLanguage('en')"
                            class="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                            :class="{ 'bg-gray-100': currentLanguage === 'en' }"
                        >
                            <Icon
                                name="emojione:flag-for-united-kingdom"
                                class="w-6 h-6"
                            />
                            <span>English</span>
                        </button>

                        <button
                            @click="changeLanguage('lo')"
                            class="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                            :class="{ 'bg-gray-100': currentLanguage === 'lo' }"
                        >
                            <Icon
                                name="emojione:flag-for-laos"
                                class="w-6 h-6"
                            />
                            <span>ລາວ (Lao)</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Search Dialog -->
        <div
            v-if="showSearchDialog"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 pt-20"
            @click.self="closeSearchDialog"
        >
            <div class="bg-white rounded-lg max-w-4xl w-full shadow-2xl">
                <!-- Search Input Section -->
                <div class="p-6 border-b">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="relative flex-1">
                            <input
                                ref="searchInput"
                                v-model="searchQuery"
                                type="text"
                                placeholder="Search..."
                                class="w-full rounded-lg border border-gray-300 px-4 py-3 pl-12 text-lg focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                @input="handleSearch"
                            />
                            <svg
                                class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
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
                        </div>
                        <button
                            @click="closeSearchDialog"
                            class="text-gray-400 hover:text-gray-600 p-2"
                        >
                            <svg
                                class="h-6 w-6"
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
                    </div>

                    <!-- Search Categories -->
                    <div class="flex gap-2 flex-wrap">
                        <button
                            v-for="category in searchCategories"
                            :key="category.value"
                            @click="selectCategory(category.value)"
                            class="px-4 py-2 rounded-full text-sm font-medium transition-all"
                            :class="
                                selectedCategory === category.value
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            "
                        >
                            {{ category.label }}
                        </button>
                    </div>
                </div>

                <!-- Search Results Section -->
                <div class="max-h-[500px] overflow-y-auto">
                    <!-- Loading State -->
                    <div
                        v-if="isSearching"
                        class="p-8 text-center text-gray-500"
                    >
                        <div
                            class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"
                        ></div>
                        <p class="mt-4">Searching...</p>
                    </div>

                    <!-- Empty State -->
                    <div
                        v-else-if="!searchQuery"
                        class="p-12 text-center text-gray-400"
                    >
                        <svg
                            class="h-16 w-16 mx-auto mb-4 opacity-50"
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
                        <p class="text-lg">Start typing to search</p>
                    </div>

                    <!-- No Results -->
                    <div
                        v-else-if="searchResults.length === 0 && !isSearching"
                        class="p-12 text-center text-gray-400"
                    >
                        <svg
                            class="h-16 w-16 mx-auto mb-4 opacity-50"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <p class="text-lg">No results found</p>
                        <p class="text-sm mt-2">
                            Try different keywords or categories
                        </p>
                    </div>

                    <!-- Search Results List -->
                    <div v-else class="divide-y divide-gray-100">
                        <div
                            v-for="result in searchResults"
                            :key="result.id"
                            @click="navigateToResult(result)"
                            class="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                            <div class="flex gap-4">
                                <!-- Thumbnail -->
                                <div
                                    class="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200"
                                >
                                    <img
                                        v-if="result.image"
                                        :src="`${CDN()}${result.image}`"
                                        :alt="result.title"
                                        class="w-full h-full object-cover"
                                    />
                                    <div
                                        v-else
                                        class="w-full h-full flex items-center justify-center text-gray-400"
                                    >
                                        <svg
                                            class="h-8 w-8"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                <!-- Content -->
                                <div class="flex-1 min-w-0">
                                    <div
                                        class="flex items-start justify-between gap-2 mb-1"
                                    >
                                        <h3
                                            class="font-semibold text-gray-900 truncate"
                                        >
                                            {{ result.title }}
                                        </h3>
                                        <span
                                            class="px-2 py-1 rounded-full text-xs font-medium flex-shrink-0"
                                            :class="
                                                getCategoryBadgeClass(
                                                    result.type,
                                                )
                                            "
                                        >
                                            {{ getCategoryLabel(result.type) }}
                                        </span>
                                    </div>
                                    <p
                                        class="text-sm text-gray-600 line-clamp-2"
                                    >
                                        {{ result.description }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue";

// Get current route
const route = useRoute();

// Get stores
const tourPackageStore = useTourPackageStore();
const tourPlaceStore = useTourPlaceStore();
const newsStore = useNewsStore();

// Loading states for stores
const storesLoaded = ref(false);

// Load stores data on mount if not already loaded
onMounted(async () => {
    // Check if stores have data, if not load them
    if (
        !tourPackageStore.pagination?.rows?.length ||
        !tourPlaceStore.pagination?.rows?.length ||
        !newsStore.pagination?.rows?.length
    ) {
        try {
            await Promise.all([
                tourPackageStore.setPagination({
                    page: 1,
                    limit: 50, // Load more items for better search results
                    sortBy: "createdAt",
                    order: "DESC",
                }),
                tourPlaceStore.setPagination({
                    page: 1,
                    limit: 50,
                    sortBy: "createdAt",
                    order: "DESC",
                }),
                newsStore.setPagination({
                    page: 1,
                    limit: 50,
                    sortBy: "createdAt",
                    order: "DESC",
                }),
            ]);
            storesLoaded.value = true;
        } catch (error) {
            console.error("Error loading stores:", error);
        }
    } else {
        storesLoaded.value = true;
    }
});

// Dropdown state
const isDropdownOpen = ref(false);
const isLanguageDropdownOpen = ref(false);
const currentLanguage = ref("lo");

// Search Dialog state
const showSearchDialog = ref(false);
const searchQuery = ref("");
const selectedCategory = ref("all");
const searchResults = ref([]);
const isSearching = ref(false);
const searchInput = ref(null);

// Search categories
const searchCategories = [
    { value: "all", label: "All" },
    { value: "tourPackage", label: "Tour Packages" },
    { value: "tourPlace", label: "Tour Places" },
    { value: "news", label: "News" },
];

// Search functionality
let searchTimeout = null;

const openSearchDialog = async () => {
    showSearchDialog.value = true;
    searchQuery.value = "";
    selectedCategory.value = "all";
    searchResults.value = [];

    // Focus the input after dialog opens
    await nextTick();
    if (searchInput.value) {
        searchInput.value.focus();
    }
};

const closeSearchDialog = () => {
    showSearchDialog.value = false;
    searchQuery.value = "";
    selectedCategory.value = "all";
    searchResults.value = [];
};

const selectCategory = (category) => {
    selectedCategory.value = category;
    if (searchQuery.value) {
        handleSearch();
    }
};

const handleSearch = () => {
    // Clear previous timeout
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }

    // Debounce search
    searchTimeout = setTimeout(async () => {
        if (!searchQuery.value.trim()) {
            searchResults.value = [];
            return;
        }

        isSearching.value = true;

        try {
            await performSearch();
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            isSearching.value = false;
        }
    }, 300);
};

const performSearch = async () => {
    const results = [];
    const query = searchQuery.value.toLowerCase().trim();

    // Search Tour Packages
    if (
        selectedCategory.value === "all" ||
        selectedCategory.value === "tourPackage"
    ) {
        const tourPackages = tourPackageStore?.pagination?.rows || [];
        const filteredTours = tourPackages
            .filter((tour) => {
                const nameMatch =
                    tour.name?.lo?.toLowerCase().includes(query) ||
                    tour.name?.en?.toLowerCase().includes(query);
                const detailMatch =
                    tour.detail?.lo?.toLowerCase().includes(query) ||
                    tour.detail?.en?.toLowerCase().includes(query);
                return nameMatch || detailMatch;
            })
            .slice(0, 5)
            .map((tour) => ({
                id: tour.id,
                title: tour.name?.lo || tour.name?.en || "Untitled Tour",
                description:
                    tour.detail?.lo || tour.detail?.en || "No description",
                image: tour.image,
                type: "tourPackage",
                route: `/tour/domestic/${tour.id}`,
            }));
        results.push(...filteredTours);
    }

    // Search Tour Places
    if (
        selectedCategory.value === "all" ||
        selectedCategory.value === "tourPlace"
    ) {
        const tourPlaces = tourPlaceStore?.pagination?.rows || [];
        const filteredPlaces = tourPlaces
            .filter((place) => {
                const nameMatch =
                    place.name?.lo?.toLowerCase().includes(query) ||
                    place.name?.en?.toLowerCase().includes(query);
                const detailMatch =
                    place.detail?.lo?.toLowerCase().includes(query) ||
                    place.detail?.en?.toLowerCase().includes(query);
                return nameMatch || detailMatch;
            })
            .slice(0, 5)
            .map((place) => ({
                id: place.id,
                title: place.name?.lo || place.name?.en || "Untitled Place",
                description:
                    place.detail?.lo || place.detail?.en || "No description",
                image: place.image,
                type: "tourPlace",
                route: `/tour-place/${place.id}`,
            }));
        results.push(...filteredPlaces);
    }

    // Search News
    if (selectedCategory.value === "all" || selectedCategory.value === "news") {
        const news = newsStore?.pagination?.rows || [];
        const filteredNews = news
            .filter((item) => {
                const titleMatch =
                    item.title?.lo?.toLowerCase().includes(query) ||
                    item.title?.en?.toLowerCase().includes(query);
                const detailMatch =
                    item.detail?.lo?.toLowerCase().includes(query) ||
                    item.detail?.en?.toLowerCase().includes(query);
                return titleMatch || detailMatch;
            })
            .slice(0, 5)
            .map((item) => ({
                id: item.id,
                title: item.title?.lo || item.title?.en || "Untitled News",
                description:
                    item.detail?.lo || item.detail?.en || "No description",
                image: item.image,
                type: "news",
                route: `/news/${item.id}`,
            }));
        results.push(...filteredNews);
    }

    searchResults.value = results;
};

const navigateToResult = (result) => {
    closeSearchDialog();
    navigateTo(result.route);
};

const getCategoryLabel = (type) => {
    const category = searchCategories.find((cat) => cat.value === type);
    return category?.label || type;
};

const getCategoryBadgeClass = (type) => {
    switch (type) {
        case "tourPackage":
            return "bg-blue-100 text-blue-800";
        case "tourPlace":
            return "bg-green-100 text-green-800";
        case "news":
            return "bg-orange-100 text-orange-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

// Toggle dropdown
const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

// Close dropdown
const closeDropdown = () => {
    isDropdownOpen.value = false;
};

// Toggle language dropdown
const toggleLanguageDropdown = () => {
    isLanguageDropdownOpen.value = !isLanguageDropdownOpen.value;
};

// Change language
const changeLanguage = (lang) => {
    currentLanguage.value = lang;
    isLanguageDropdownOpen.value = false;
    console.log("Language changed to:", lang);
};

// Close dropdowns when clicking outside
if (process.client) {
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".relative")) {
            isLanguageDropdownOpen.value = false;
            isDropdownOpen.value = false;
        }
    });
}
</script>
